'use strict';
const encrypt = require('./encrypt');
const database = process.env['DB_NAME']
const collection = process.env['COLLECTION_NAME'];
const mdb = require('./mdb');

module.exports.saveCustomerCSFLE = async (event) => {
    const data = JSON.parse(event.body);
    const userId = event.requestContext.identity.cognitoIdentityId;

    const dataEncryptionKey = await encrypt.getDataEncryptionKey("customer");
    const schema = getCustomerSchema(dataEncryptionKey);
    const encryptionOption = await encrypt.getEncryptionOption(schema);

    const client = await mdb.getClient(true, encryptionOption);

    const customer = {
        identityId: data.identityId,
        firstName: data.firstName ? data.firstName : '',
        lastName: data.lastName ? data.lastName : '',
        account: data.account ? data.account : { sortCode: '', accountNumber: ''},
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : new Date(),
        email: data.email ? data.email : '',
        address1: data.address1 ? data.address1 : '',
        address2: data.address2 ? data.address2 : '',
        city: data.city ? data.city : '',
        postCode: data.postCode ? data.postCode : '',
        countryCode: data.countryCode ? data.countryCode : '',
        phone: data.phone ? data.phone : '',
        about: data.about ? data.about : '',
        mailingFlag: data.mailingFlag ? (JSON.stringify(data.mailingFlag).toUpperCase() === 'TRUE' ? true : false) : false,
        updatedAt: new Date()
    }

    const existingCustomer = await getCustomer(client, userId);

    const response = (!userId || userId === undefined) ? {} : await mdb.updateOrInsertDocument(client, database, collection,  { "identityId": userId }, { "$set": customer }, { "upsert": true });

    return {
        statusCode: 200,
        body: JSON.stringify(response),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        }
    };
}

module.exports.getCustomerWithKey = async (event) => {
    const userId = event.requestContext.identity.cognitoIdentityId;

    const dataEncryptionKey = await encrypt.getDataEncryptionKey("customer");
    const schema = getCustomerSchema(dataEncryptionKey);
    const encryptionOption = await encrypt.getEncryptionOption(schema);

    const client = await mdb.getClient(true, encryptionOption);

    const response = await getCustomer(client, userId);

    return {
        statusCode: 200,
        body: JSON.stringify(response),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        }
    };
}

module.exports.getCustomerNoKey = async (event) => {
    const userId = event.requestContext.identity.cognitoIdentityId;

    const client = await mdb.getClient(false);

    const response = await getCustomer(client, userId);

    return {
        statusCode: 200,
        body: JSON.stringify(response),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        }
    };
}

const getCustomer = async (client, userId) => {
    return (!userId || userId === undefined) ? {} : await mdb.findDocument(client, database, collection, { "identityId": userId });
}

const getCustomerSchema = (dataKey) => {
    const db = process.env['DB_NAME'];
    const coll = collection;
    const namespace = `${db}.${coll}`;
    const schema = {
        bsonType: "object",
        encryptMetadata: {
            keyId: [encrypt.getKeyId(dataKey)],
        },
        properties: {
            account: {
                bsonType: "object",
                properties: {
                    sortCode: {
                        encrypt: {
                            bsonType: "string",
                            algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
                        },
                    },
                    accountNumber: {
                        encrypt: {
                            bsonType: "string",
                            algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
                        },
                    },
                },
            },
            dateOfBirth: {
                encrypt: {
                    bsonType: "date",
                    algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
                },
            },
            email: {
                encrypt: {
                    bsonType: "string",
                    algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
                },
            },
            phone: {
                encrypt: {
                    bsonType: "string",
                    algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
                },
            },
        },
    };
    let customerSchema = {};
    customerSchema[namespace] = schema;

    return customerSchema;
}
