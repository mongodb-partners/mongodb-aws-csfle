// Load the AWS SDK
var AWS = require('aws-sdk');
var mysql = require('mysql');
const secret = require('secret');

AWS.config.update({
    region: "eu-west-1"
});

module.exports.connect = async() => {
    const key = process.env['ENVIRONMENT'] ? process.env['ENVIRONMENT'].toUpperCase() + '_' + 'RDS_MYSQL_SECRET' : 'RDS_MYSQL_SECRET';
    const response = JSON.parse(await secret(key));
    const db_password = response['password'];

    const pool = mysql.createPool({
        host: process.env['DB_HOST'],
        port: process.env['DB_PORT'],
        user: process.env['DB_USER'],
        password: db_password,
        database: process.env['DB_NAME']
    });
    return new Promise((resolve, reject) => {
        pool.getConnection(function(error, connection) {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {
                console.log('Connection successful', connection);
                resolve(connection);
            }
        });
    });
}

module.exports.rdsQuery = async (connection, query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, function (error, results, fields) {
            if (error) {
                connection.destroy();
                reject(error);
            } else {
                console.log(results);
                resolve(results);
                connection.end(function (err) {
                    if(err) {
                        console.error(err);
                    } else {
                        console.log('Connection closed');
                    }
                });
            }
        });
    })
}
module.exports.put = async (params) => {
    // Create the DynamoDB Document Client
    var documentClient = new AWS.DynamoDB.DocumentClient();

    // for async it only works with Promise and resolve/reject
    return new Promise((resolve, reject) => {
        documentClient.put(params, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

module.exports.get = async (params) => {
    // Create the DynamoDB Document Client
    var documentClient = new AWS.DynamoDB.DocumentClient();

    // for async it only works with Promise and resolve/reject
    return new Promise((resolve, reject) => {
        documentClient.get(params, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data.Item);
            }
        });
    });
}

module.exports.update = async (params) => {
    // Create the DynamoDB Document Client
    var documentClient = new AWS.DynamoDB.DocumentClient();

    // for async it only works with Promise and resolve/reject
    return new Promise((resolve, reject) => {
        documentClient.update(params, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data.Attributes);
            }
        });
    });
}

module.exports.delete = async (params) => {
    // Create the DynamoDB Document Client
    var documentClient = new AWS.DynamoDB.DocumentClient();

    // for async it only works with Promise and resolve/reject
    return new Promise((resolve, reject) => {
        documentClient.delete(params, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

module.exports.batchWrite = async (params) => {
    // Create the DynamoDB Document Client
    var documentClient = new AWS.DynamoDB.DocumentClient();

    // for async it only works with Promise and resolve/reject
    return new Promise((resolve, reject) => {
        documentClient.batchWrite(params, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

module.exports.batchGet = async (params, table) => {
    // Create the DynamoDB Document Client
    var documentClient = new AWS.DynamoDB.DocumentClient();

    // for async it only works with Promise and resolve/reject
    return new Promise((resolve, reject) => {
        documentClient.batchGet(params, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                var response = data.Responses[table].map((item) => {
                    return item;
                })
                resolve(response);
            }
        });
    });
}

module.exports.query = async (params) => {
    // Create the DynamoDB Document Client
    var documentClient = new AWS.DynamoDB.DocumentClient();

    // for async it only works with Promise and resolve/reject
    return new Promise((resolve, reject) => {
        documentClient.query(params, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                var response = data.Items.map((item) => {
                    return item;
                })
                resolve(response);
            }
        });
    });
}

module.exports.scan = async (params) => {
    // Create the DynamoDB Document Client
    var documentClient = new AWS.DynamoDB.DocumentClient();

    // for async it only works with Promise and resolve/reject
    return new Promise((resolve, reject) => {
        documentClient.scan(params, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                var response = data.Items.map((item) => {
                    return item;
                })
                resolve(response);
            }
        });
    });
}