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
    let response = JSON.parse(await secret.getSecretValue(key));
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
    await getKeyManagementProviderDetails();
    const keyVaultClient = await mdb.getClient(false);
    const keyVaultCollectionExist = await findKeyVaultCollectionExists(keyVaultClient);
    if(keyVaultCollectionExist) {
        const keyExists = await mdb.findDocument(keyVaultClient, keyVaultDatabase, keyVaultCollection, {"masterKey.provider": provider, "masterKey.region": masterKey.region, "masterKey.key": masterKey.key});
        if(keyExists) {
            let schemaExists = false;
            for (let i in keyExists.keyAltNames) {
                if (keyExists.keyAltNames[i] === schema) {
                    schemaExists = true;
                    break;
                }
            }
            if(!schemaExists) {
                await mdb.updateDocument(keyVaultClient, keyVaultDatabase, keyVaultCollection, {"masterKey.provider": provider, "masterKey.region": masterKey.region, "masterKey.key": masterKey.key}, { "$push": { "keyAltNames": schema } })
            }
            dataKey = keyExists._id.toString("base64");
        } else {
            dataKey = await createDataEncryptionKey(keyVaultClient, schema);
        }
    } else {
        await createUniqueIndex(keyVaultClient);
        dataKey = await createDataEncryptionKey(keyVaultClient, schema);
    }

    return dataKey;
}

const createUniqueIndex = async (keyVaultClient) => {
    await mdb.createIndex(keyVaultClient, keyVaultDatabase, keyVaultCollection,
        { keyAltNames: 1 },
        {
                    unique: true,
                    partialFilterExpression: {
                        keyAltNames: {$exists: true}
                    }
                }
        );
    return;
}

const createDataEncryptionKey = async (keyVaultClient, schema) => {
    const encryption = new ClientEncryption(keyVaultClient, {
        keyVaultNamespace,
        kmsProviders,
    });
    const key = await encryption.createDataKey(provider, {
        masterKey: masterKey,
        keyAltNames: [schema]
    });

    const dataEncryptionKey = key.toString("base64");
    //console.log("Key, DataKeyId [base64], Binary: ", key, dataEncryptionKey, new Binary(Buffer.from(dataEncryptionKey, "base64"), 4));

    return dataEncryptionKey;
}

module.exports.getEncryptionOption = async (schema) => {
    let encryptionOption = {}
    const extraOptions = {
        cryptSharedLibPath: process.env['CRYPT_SHARED_LIB_PATH'],
        cryptSharedLibRequired: true
    }

    await getKeyManagementProviderDetails();
    encryptionOption = {
        keyVaultNamespace,
        kmsProviders,
        schemaMap: schema,
        extraOptions: extraOptions
    }

    return encryptionOption;
}

const findKeyVaultCollectionExists = async (keyVaultClient) => {
    const exists = await mdb.findCollectionExists(keyVaultClient, keyVaultDatabase, keyVaultCollection);
    console.log("Exists", exists);
    return exists;
}

module.exports.getKeyId = (key) => {
    return new Binary(Buffer.from(key, "base64"), 4);
}
