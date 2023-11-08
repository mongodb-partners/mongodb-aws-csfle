'use strict';
const storage = require('./storage');
const encrypt = require('./encrypt');
const email = require('./email');
const database = require('./db');
const db = process.env['DB_NAME']
//const table = process.env['TABLE_NAME'];
const collection = process.env['COLLECTION_NAME'];
const mdb = require('./mdb');
const { Binary } = require("mongodb");

module.exports.saveCustomer = async (event) => {
/*    const data = JSON.parse(event.body);
    console.log(data);

    let sql = ' INSERT INTO ' + db + '.' + table + ' ';
    sql +='(`FIRST_NAME`, `LAST_NAME`, `DATE_OF_BIRTH`, `GENDER`, `IDENTITY_ID`, `EMAIL`, `ADDRESS1`, `ADDRESS2`, `CITY`, `POST CODE`, ' +
        '`COUNTRY`, `PHONE`, `ID_NAME`, `ID_LOCATION`, `PHOTO_NAME`, `PHOTO_LOCATION`, `CREATED_AT`, `UPDATED_AT`, `MAILING_FLAG`) ';
    sql += 'VALUES(';
    sql += JSON.stringify(data.firstName ? data.firstName : '') + ', ';
    sql += JSON.stringify(data.lastName ? data.lastName : '') + ', ';
    sql += 'NOW()' + ', ';
    sql += JSON.stringify(data.gender ? data.gender : '') + ', ';
    sql += JSON.stringify(data.identityId) + ',';
    sql += JSON.stringify(data.email) + ',';
    sql += JSON.stringify(data.address1 ? data.address1 : '') + ', ';
    sql += JSON.stringify(data.address2 ? data.address2 : '') + ', ';
    sql += JSON.stringify(data.city ? data.city : '') + ',';
    sql += JSON.stringify(data.postCode ? data.postCode : '') + ', ';
    sql += JSON.stringify(data.countryCode ? data.countryCode : '') + ', ';
    sql += JSON.stringify(data.phone ? data.phone : '') + ', ';
    sql += JSON.stringify(data.idName) + ', ';
    sql += JSON.stringify(data.idLocation) + ', ';
    sql += JSON.stringify(data.photoName) + ', ';
    sql += JSON.stringify(data.photoLocation) + ', ';
    sql += 'NOW()' + ', ';
    sql += 'NOW()' + ', ';
    sql += data.mailingFlag ? data.mailingFlag : true
    sql +=')';

    console.log(sql);

    const connection = await database.connect();
    console.log(connection);

    const response = await database.rdsQuery(connection, sql);*/

    const data = JSON.parse(event.body);
    const userId = event.requestContext.identity.cognitoIdentityId;

    const dataEncryptionKey = await encrypt.getDataEncryptionKey();
    const schema = getCustomerSchema(dataEncryptionKey);
    const encryptionOption = await encrypt.getEncryptionOption(schema);

    const client = await mdb.get(true, encryptionOption);

    //console.log('keys', keys);
    const database = process.env['DB_NAME'];
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

const getCustomerSchema = (dataKey) => {
    const db = process.env['DB_NAME'];
    const coll = collection;
    const namespace = `${db}.${coll}`;
    const schema = {
        bsonType: "object",
        encryptMetadata: {
            keyId: [new Binary(Buffer.from(dataKey, "base64"), 4)],
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
