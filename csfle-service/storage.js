let AWS = require('aws-sdk');

AWS.config.update({region: process.env['REGION']});

module.exports.listBucket = async (params) => {
    // Create a new service object
    let s3 = new AWS.S3({
        apiVersion: '2006-03-01'
    });

    // for async it only works with Promise and resolve/reject
    return new Promise((resolve, reject) => {
        s3.listObjectsV2(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                console.log(data);
                let objects = data.CommonPrefixes.map((commonPrefix) => {
                    return commonPrefix.Prefix.substring(params.Prefix.length).replace('/', '');
                });
                console.log(objects);
                resolve(objects);
            }
        });
    });
}

module.exports.listFolder = async (params) => {
    // Create a new service object
    var s3 = new AWS.S3({
        apiVersion: '2006-03-01'
    });

    // for async it only works with Promise and resolve/reject
    return new Promise((resolve, reject) => {
        s3.listObjectsV2(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                console.log(data);
                let objects = data.Contents.map((object) => {
                    return object.Key.substring(params.Prefix.length);
                });
                console.log(objects);
                resolve(objects);
            }
        });
    });
}

module.exports.getObject = async (params) => {
    // Create a new service object
    let s3 = new AWS.S3({
        apiVersion: '2006-03-01'
    });

    // for async it only works with Promise and resolve/reject
    return new Promise((resolve, reject) => {
        s3.getObject(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
