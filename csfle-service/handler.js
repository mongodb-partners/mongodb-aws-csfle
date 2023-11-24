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

    //console.log('keys', keys);
    let sequenceDoc = await mdb.findSequence(client, database, "sequence", {"key": "customer_seq"});

    const customer = {
        number: sequenceDoc.sequence,
        identityId: data.identityId,
        firstName: data.firstName ? data.firstName : '',
        lastName: data.lastName ? data.lastName : '',
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : new Date(),
        email: data.email ? data.email : '',
        address1: data.address1 ? data.address1 : '',
        address2: data.address2 ? data.address2 : '',
        city: data.city ? data.city : '',
        postCode: data.postCode ? data.postCode : '',
        countryCode: data.countryCode ? data.countryCode : '',
        phone: data.phone ? data.phone : '',
        about: data.about ? data.about : '',
        mailingFlag: data.mailingFlag ? JSON.stringify(data.mailingFlag).toUpperCase() === 'TRUE' : true,
        idName: data.idName,
        idLocation: data.idLocation,
        photoName: data.photoName,
        photoLocation: data.photoLocation,
        updatedAt: new Date(),
        lastLogin: new Date()
    }

    const response = (!userId || userId === undefined) ? {} : await mdb.insertDocument(client, database, collection,  customer);

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
    const data = JSON.parse(event.body);
    const userId = event.requestContext.identity.cognitoIdentityId;
    const email = data.email ? data.email : '';

    const dataEncryptionKey = await encrypt.getDataEncryptionKey("customer");
    const schema = getCustomerSchema(dataEncryptionKey);
    const encryptionOption = await encrypt.getEncryptionOption(schema);

    const client = await mdb.getClient(true, encryptionOption);

    const response = (!userId || userId === undefined) ? {} : await mdb.findDocument(client, database, collection, { "identityId": userId, "email": email });

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
    const data = JSON.parse(event.body);
    const userId = event.requestContext.identity.cognitoIdentityId;
    const email = data.email ? data.email : '';

    const client = await mdb.getClient(false);

    const response = (!userId || userId === undefined) ? {} : await mdb.findDocument(client, database, collection, { "identityId": userId, "email": email });

    return {
        statusCode: 200,
        body: JSON.stringify(response),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        }
    };
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
                            bsonType: "int",
                            algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
                        },
                    },
                    accountNumber: {
                        encrypt: {
                            bsonType: "int",
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
                    algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
                },
            },
            phone: {
                encrypt: {
                    bsonType: "string",
                    algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
                },
            },
        },
    };
    let customerSchema = {};
    customerSchema[namespace] = schema;

    return customerSchema;
}
