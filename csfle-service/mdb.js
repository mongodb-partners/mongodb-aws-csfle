const { MongoClient } = require("mongodb");
//uncomment this line when running from AWS with KMS
const secret = require("./secret");

let atlas_connection_uri;

module.exports.getClient = async (secure, encryptionOption) => {
    //Getting Secret Response for Key
    const key = process.env['ENVIRONMENT'] ? process.env['ENVIRONMENT'].toUpperCase() + '_' + 'MONGODB_ATLAS_CLUSTER_URI' : 'MONGODB_ATLAS_CLUSTER_URI';
    let response = JSON.parse(await secret(key));
    atlas_connection_uri = response[key];
    //console.log('the Atlas connection string is ' + atlas_connection_uri);

    let client;
    if(secure) {
         client = new MongoClient(atlas_connection_uri,  {
             monitorCommands: true,
             autoEncryption: encryptionOption
         });
    } else {
        client = new MongoClient(atlas_connection_uri, {
            monitorCommands: true
        });
    }

    return client;
};

module.exports.findDocument = async (client, database, collection, query) => {
    return await client.db(database).collection(collection).findOne(query);
};

module.exports.findDocuments = async (client, database, collection, query, sort) => {
    return await sort ? client.db(database).collection(collection).find(query).sort(sort).toArray() : client.db(database).collection(collection).find(query).toArray();
};

module.exports.findDistintValues = async (client, database, collection, field, query) => {
    return await client.db(database).collection(collection). distinct(field, query);
};

module.exports.findSequence = async (client, database, collection, query) => {
    const update = { "$inc": { "sequence": 1 } };
    const options = { "returnNewDocument": true };
    return await client.db(database).collection(collection).findOneAndUpdate(query, update, options);
};

module.exports.findAndUpdateDocument = async (client, database, collection, query, update, options) => {
    return await client.db(database).collection(collection).findOneAndUpdate(query, update, options);
}

module.exports.insertDocument = async (client, database, collection, document) => {
    return await client.db(database).collection(collection).insertOne(document);
};

module.exports.insertDocuments = async (client, database, collection, documents) => {
    return await client.db(database).collection(collection).insertMany(documents);
};

module.exports.updateOrInsertDocument = async (client, database, collection, query, update, options) => {
    return await client.db(database).collection(collection).updateOne(query, update, options);
};

module.exports.updateDocument = async (client, database, collection, query, update) => {
    return await client.db(database).collection(collection).updateOne(query, update);
};

module.exports.updateDocuments = async (client, database, collection, query, update) => {
    return await client.db(database).collection(collection).updateMany(query, update);
};

module.exports.deleteDocument = async (client, database, collection, query) => {
    return await client.db(database).collection(collection).deleteOne(query);
}

module.exports.deleteDocuments = async (client, database, collection, query) => {
    return await client.db(database).collection(collection).deleteMany(query);
}

module.exports.findCollectionExists = async (client, database, collection) => {
    let exists = false;
    const databases = (await client.db().admin().listDatabases()).databases;
    console.log("Databases", databases);
    for(let i in databases) {
        if (databases[i].name === database) {
            const collections = await client.db(database).listCollections().toArray();
            console.log("Collections", collections);
            for(let j in collections) {
                if (collections[j].name === collection) {
                    exists = true;
                    break;
                }
            }
            break;
        }
    }

    return exists;
}

module.exports.createIndex = async (client, database, collection, indexSpecs, options) => {
    return await client.db(database).collection(collection).createIndex(indexSpecs, options);
}