const { SecretsManagerClient, GetSecretValueCommand, PutSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

// a client can be shared by different commands.
const client = new SecretsManagerClient({ region: process.env['REGION'] });

module.exports.getSecretValue = async (params) => {
    const command = new GetSecretValueCommand(params);

    // for async it only works with Promise and resolve/reject
    return new Promise((resolve, reject) => {
        client.send(command, function(err, data) {
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

module.exports.putSecretValue = async (params) => {
    const command = new PutSecretValueCommand(params);

    // for async it only works with Promise and resolve/reject
    return new Promise((resolve, reject) => {
        client.send(command, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                // Decrypts secret using the associated KMS CMK.
                // Depending on whether the secret is a string or binary, one of these fields will be populated.
                resolve(data);
            }
        });
    });
};