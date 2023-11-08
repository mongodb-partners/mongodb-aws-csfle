let AWS = require('aws-sdk');
const mdb = require("./mdb");
const secret = require("./secret");
const { Binary, ClientEncryption } = require('mongodb');

const provider = "aws";
let kmsProviders = {};
let masterKey = {};
const keyVaultDatabase = "encryption";
const keyVaultCollection = "__keyVault";
const keyVaultNamespace = `${keyVaultDatabase}.${keyVaultCollection}`;

const getKeyManagementProviderDetails = async () => {
    const key = process.env['ENVIRONMENT'] ? process.env['ENVIRONMENT'].toUpperCase() + '_' + 'KMS_PROVIDER_SECRETS' : 'KMS_PROVIDER_SECRETS';
    let response = JSON.parse(await secret(key));
    kmsProviders = {
        aws: {
            accessKeyId: response['KMS_PROVIDER_ACCESS_KEY'],
            secretAccessKey: response['KMS_PROVIDER_SECRET_ACCESS_KEY'],
        }
    }
    masterKey = {
        key: response['KMS_PROVIDER_MASTER_KEY_ARN'],
        region: process.env['REGION']
    }
    console.log(kmsProviders);
    console.log(masterKey);
    return;
}

module.exports.getDataEncryptionKey = async (schema) => {
    let dataKey = "";
    const keyVaultCollectionExist = await findKeyVaultCollectionExists();
    if(keyVaultCollectionExist) {
        const keyVaultClient = await mdb.get(false);
        const keyExists = await mdb.findDocument(keyVaultClient, keyVaultDatabase, "dataKey", {"schema": schema});
        if(keyExists) {
            dataKey = keyExists.key;
        } else {
            dataKey = await createDataEncryptionKey(schema);
        }
    } else {
        await createUniqueIndex();
        dataKey = await createDataEncryptionKey(schema);
    }

    return dataKey;
}

const createUniqueIndex = async () => {
    const keyVaultClient = mdb.get(false);
    //await keyVaultClient.connect();
    //const keyVaultDB = keyVaultClient.db(keyVaultDatabase);
    // Drop the Key Vault Collection in case you created this collection
    // in a previous run of this application.
    //await keyVaultClient.db(keyVaultDatabase).dropDatabase();
    // Drop the database storing your encrypted fields as all
    // the DEKs encrypting those fields were deleted in the preceding line.
    //await keyVaultClient.db("medicalRecords").dropDatabase();
    //const keyVaultColl = keyVaultDB.collection(keyVaultCollection);

    await mdb.createIndex(keyVaultClient, keyVaultDatabase, keyVaultCollection,
        { keyAltNames: 1 },
        {
                    unique: true,
                    partialFilterExpression: {
                        keyAltNames: {$exists: true}
                    }
                }
        );
    //await keyVaultClient.close();
    return;
}

const createDataEncryptionKey = async (schema) => {
    await getKeyManagementProviderDetails();
    const client = await mdb.get(false);

    const encryption = new ClientEncryption(client, {
        keyVaultNamespace,
        kmsProviders,
    });
    const key = await encryption.createDataKey(provider, {
        masterKey: masterKey,
    });
    const dataEncryptionKey = key.toString("base64");
    await mdb.insertDocument(client, keyVaultDatabase, "dataKey", { "schema": schema, "key": dataEncryptionKey });
    console.log("DataKeyId [base64]: ", dataEncryptionKey);

    return dataEncryptionKey;
}

module.exports.getEncryptionOptions = async (schema) => {
    let encryptionOptions = {}
    const extraOptions = {
        cryptSharedLibPath: process.env['CRYPT_SHARED_LIB_PATH'],
        cryptSharedLibRequired: true
    }

    await getKeyManagementProviderDetails();
    encryptionOptions = {
        keyVaultNamespace,
        kmsProviders,
        schemaMap: schema,
        extraOptions: extraOptions
    }

    return encryptionOptions;
}

const findKeyVaultCollectionExists = async () => {
    const keyVaultClient = await mdb.get(false);
    const exists = await mdb.findCollectionExists(keyVaultClient, keyVaultDatabase, keyVaultCollection);
    console.log("Exists", exists);
    return exists;
}

