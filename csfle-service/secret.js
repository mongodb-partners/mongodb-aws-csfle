// Load the AWS SDK
let AWS = require('aws-sdk');
let region = process.env['REGION'];

module.exports = async (key) => {
    // Create a Secrets Manager client
    let client = new AWS.SecretsManager({
        region: region
    });

    // for async it only works with Promise and resolve/reject
    return new Promise((resolve, reject) => {
        client.getSecretValue({SecretId: key}, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                // Decrypts secret using the associated KMS CMK.
                // Depending on whether the secret is a string or binary, one of these fields will be populated.
                if ('SecretString' in data) {
                    resolve(data.SecretString);
                } else {
                    let buff = new Buffer(data.SecretBinary, 'base64');
                    resolve(buff.toString('ascii'));
                }
            }
        });
    });
};