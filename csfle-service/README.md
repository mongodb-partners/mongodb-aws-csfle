Step 6: Set up Development Environment
As for this solution we want to enable Client Side Field Level Encryption completely automated and for that there is a dependency on Automated Encryption Shared Library of MongoDB. This library is distributed specific to Operating System requirement for client – in this scenario we are going to use AWS Lambda for our client so we’d need to set up our development environment in Linux-x86_x64 (which is the supported runtime for AWS Lambda)

We have few choices like using AWS Cloud 9 or another Linux based IDE. In this blog we’ll learn how to set up your AWS Cloud 9 environment for AWS Lambda.

Individual User Setup
Sign in to your AWS account and create an administrative user by following this guide.

Create an EC2 Environment

Open AWS Cloud 9 console by going to https://eu-west-1.console.aws.amazon.com/cloud9.

Choose AWS region from top right navigation bar. For this tutorial I am using eu-west-1.




Follow the steps as described in https://docs.aws.amazon.com/cloud9/latest/user-guide/create-environment-main.html to create an EC2 environment. (Enter environment name and keep everything default like environment type, instance type, platform, timeout etc)
 





Warning
Creating an Amazon EC2 instance for your environment might result in possible charges to your AWS account for Amazon EC2. There's no additional cost to use Systems Manager to manage connections to your existing EC2 instance.

Working with the IDE
Once the environment creation is successful open Cloud9 IDE from the list of environments








Make sure you have NodeJS, NPM and Git SCM client are installed by running following commands and validating the output

admin:~/environment $ node --version                                                                                                                                                                                                   
v18.17.1
admin:~/environment $ npm --version                                                                                                                                                                                                    
10.2.5
admin:~/environment $ git --version                                                                                                                                                                                                    
git version 2.40.1




Install Serverless
Run the following command to install serverless framework to deploy AWS serverless stack (https://www.serverless.com/framework/docs) and validate the installation

admin:~/ environment $ npm install -g serverless
npm WARN deprecated querystring@0.2.0: The querystring API is considered Legacy. new code should use the URLSearchParams API instead.
npm WARN deprecated querystring@0.2.1: The querystring API is considered Legacy. new code should use the URLSearchParams API instead.
npm WARN deprecated querystring@0.2.0: The querystring API is considered Legacy. new code should use the URLSearchParams API instead.
npm WARN deprecated superagent@7.1.6: Please downgrade to v7.1.5 if you need IE/ActiveXObject support OR upgrade to v8.0.0 as we no longer support IE and published an incorrect patch version (see https://github.com/visionmedia/superagent/issues/1731)

added 511 packages in 33s

73 packages are looking for funding
  run `npm fund` for details

admin:~/environment $ serverless --version
Framework Core: 3.38.0
Plugin: 7.2.0
SDK: 4.5.1



Clone Github Repository

Create a directory named ‘workspace’ and change your location inside the new directory

admin:~/ environment $ mkdir workspace
admin:~/ environment $ cd workspace
admin:~/ environment/workspace $


From the IDE click on the Source Control icon from left navigation and click on ‘Clone Repository.


Type the url https://github.com/mongodb-partners/mongodb-aws-csfle in repository text box and click Clone from URL


Choose the folder created in last step, ‘workspace’ to clone the repository


After github repository clone is complete you’ll see the following folder structure in Project explorer navigation on the left






Download and Extract Automated Shared Encryption Library

From bash shell create a folder for Encryption Library
admin:~/environment/workspace $ cd mongodb-aws-csfle/csfle-service/
admin:~/environment/workspace/mongodb-aws-csfle/csfle-service (main) $ mkdir mongo_crypt_shared
admin:~/environment/workspace/mongodb-aws-csfle/csfle-service (main) $ cd mongo_crypt_shared/

 
Download MongoDB Automated Shared Encryption Library for Amazon Linux 2 x64 version

admin:~/environment/workspace/mongodb-aws-csfle/csfle-service/mongo_crypt_shared (main) $ curl  https://downloads.mongodb.com/linux/mongo_crypt_shared_v1-linux-x86_64-enterprise-amazon2-7.0.4.tgz?_ga=2.226686749.1017429497.1702377509-572716933.1675964579 -o mongo_crypt_shared_v1-linux-x86_64-enterprise-amazon2-7.0.4.tgz
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 28.8M  100 28.8M    0     0  21.2M      0  0:00:01  0:00:01 --:--:-- 21.2M

 
Extract the Encryption Library archive

admin:~/environment/workspace/mongodb-aws-csfle/csfle-service/mongo_crypt_shared (main) $ tar xvf mongo_crypt_shared_v1-linux-x86_64-enterprise-amazon2-7.0.4.tgz
LICENSE-Enterprise.txt
MPL-2
README
THIRD-PARTY-NOTICES
include/mongo_crypt/v1/mongo_crypt/mongo_crypt.h
lib/mongo_crypt_v1.so


Clean up the downloaded file
admin:~/environment/workspace/mongodb-aws-csfle/csfle-service/mongo_crypt_shared (main) $ rm -f mongo_crypt_shared_v1-linux-x86_64-enterprise-amazon2-7.0.4.tgz



Step 7: Understand Code for CSFLE Service
The NodeJS code for Lambda Functions and API configurations are inside ~/environment/workspace/mongodb-aws-csfle/csfle-service folder. Let’s take a look at 4 key javascript files

secret.js
Contains module function to call AWS SeceretManager to fetch the secrets we stored in Step 5 of this blog.


mdb.js
This file holds the template for all MongoDB NodeJS driver client functions including creating a MongoClient instance and subsequent CRUD operations like insert, update and find document(s).

encrypt.js
This file holds all the key functions for Client Side Field Level Encryption. 

getKeyManagementProviderDetails - fetches the KMSProvider and KMS master key details.
getDataEncryptionKey - generates or fetches data encryption key in/from the keyVault collection based on existence of data encryption key.
createUniqueIndex - creates a unique index on keyAltNames attribute.
createDataEncryptionKey - generates the data encryption key in keyVault collection.
getEncryptionOption = collates all additional encryption options including MongoDB shared encryption library for MongoClient to execute CSFLE operations.

handler.js
This file holds the main Lambda functions for Client Side Field Level Encryption for MongoDB. There are 3 functions which will be delivered through API Gateway.

saveCustomerCSFLE - Encrypted customer information like name, address, account details, date of birth, email id etc before saving or updating in MongoDB using an encryption key

getCustomerWithKey - Retrieve customer information with a valid encryption key

Both the above functions need to initialise a MongoDB Client instance with an encryption option parameter.

getCustomerNoKey - Retrieve customer information without a valid encryption key

getCustomerSchema = define a schema for customers on what type of encryption will be applied for which specific fields for a customer. In my example I have encrypted ‘date of birth’, ‘email’, ‘phone number’ and ‘account details’. Also please note if you try to read a customer document on an attribute which is encrypted in your find method, use the ‘Deterministic’ algorithm not ‘Random’.

Step 8: Build & Deploy CSFLE Service
Build node modules
admin:~/environment $ cd workspace/
admin:~/environment/workspace $ cd mongodb-aws-csfle/
admin:~/environment/workspace/mongodb-aws-csfle (main) $ cd csfle-service/
admin:~/environment/workspace/mongodb-aws-csfle/csfle-service (main) $ npm install
npm WARN deprecated querystring@0.2.1: The querystring API is considered Legacy. new code should use the URLSearchParams API instead.
npm WARN deprecated @aws-sdk/node-config-provider@3.374.0: This package has moved to @smithy/node-config-provider
npm WARN deprecated @aws-sdk/config-resolver@3.374.0: This package has moved to @smithy/config-resolver
npm WARN deprecated @aws-sdk/util-retry@3.374.0: This package has moved to @smithy/util-retry
npm WARN deprecated @aws-sdk/smithy-client@3.374.0: This package has moved to @smithy/smithy-client
npm WARN deprecated querystring@0.2.0: The querystring API is considered Legacy. new code should use the URLSearchParams API instead.
npm WARN deprecated superagent@7.1.6: Please downgrade to v7.1.5 if you need IE/ActiveXObject support OR upgrade to v8.0.0 as we no longer support IE and published an incorrect patch version (see https://github.com/visionmedia/superagent/issues/1731)
added 733 packages, and audited 734 packages in 25s
132 packages are looking for funding
  run `npm fund` for details
2 moderate severity vulnerabilities
To address all issues, run:
  npm audit fix
Run `npm audit` for details.

Configure Environment Variables
Create a .env file inside csfle-service forlder and define following environment
RUNTIME=nodejs16.x
PROFILE=default
SERVICE_NAME=csfle
DB_NAME=CSFLE
COLLECTION_NAME=customer
CRYPT_SHARED_LIB_PATH=/var/task/mongo_crypt_shared/lib/mongo_crypt_v1.so
API_DOMAIN=YOUR_DOMAIN
BASE_PATH=csfle
CERTIFICATE_NAME=YOUR_CERTIFICATE_NAME
HOSTED_ZONE_ID=ROUTE53_HOSTED_ZONE
ENDPOINT_TYPE=regional
SECURITY_POLICY=tls_1_2
API_TYPE=rest

The environment variables in RED are meant for a custom domain configuration for API Gateway. If you don’t have a Route 53 hosted domain, please ignore them. Along with that you need to remove the following lines from serverless.yml file too.
- serverless-domain-manager
stage: ${opt:stage, self:provider.stage}
domains:
 prod: ${env:API_DOMAIN}
 dev: ${self:custom.stage}-${env:API_DOMAIN}
customDomain:
 domainName: ${self:custom.domains.${self:custom.stage}}
 basePath: ${env:BASE_PATH}
 stage: ${self:custom.stage}
 certificateName: ${env:CERTIFICATE_NAME}
 hostedZoneId: ${env:HOSTED_ZONE_ID}
 createRoute53Record: true
 endpointType: ${env:ENDPOINT_TYPE}
 securityPolicy: ${env:SECURITY_POLICY}
 apiType: ${env:API_TYPE}

Configuring Security
All the APIs we are going to be deployed will be secured via AWS IAM authentication. Which means only users who has authenticated will receive a token to exchange with IAM Credentials and in turn will get access to the Amazon APIs below.
Open serverless.yml and validate the authorizer as ‘aws_iam’
functions:
 saveCustomerCSFLE:
   handler: handler.saveCustomerCSFLE
   events:
     - http:
         path: saveCustomerCSFLE
         method: post
         cors: true
         authorizer: aws_iam
   environment:
     COLLECTION_NAME: "customer"
 getCustomerWithKey:
   handler: handler.getCustomerWithKey
   events:
     - http:
         path: getCustomerWithKey
         method: post
         cors: true
         authorizer: aws_iam
   environment:
     COLLECTION_NAME: "customer"
 getCustomerNoKey:
   handler: handler.getCustomerNoKey
   events:
     - http:
         path: getCustomerNoKey
         method: post
         cors: true
         authorizer: aws_iam
   environment:
     COLLECTION_NAME: "customer"


Deploy API using Serverless
Use serverless deploy using stage (dev) and AWS region for deployment (eu-west-1 in this case)
admin:~/environment/workspace/mongodb-aws-csfle/csfle-service (main) $ serverless deploy --stage dev --region eu-west-1
Running "serverless" from node_modules
DOTENV: Loading environment variables from .env:
         - SERVICE_NAME
         - DB_NAME
         - CRYPT_SHARED_LIB_PATH
Deploying csfle to stage dev (eu-west-1)
✔ Service deployed to stack csfle-dev (97s)
endpoints:
  POST - https://hohxiarl3m.execute-api.eu-west-1.amazonaws.com/dev/saveCustomerCSFLE
  POST - https://hohxiarl3m.execute-api.eu-west-1.amazonaws.com/dev/getCustomerWithKey
  POST - https://hohxiarl3m.execute-api.eu-west-1.amazonaws.com/dev/getCustomerNoKey
functions:
  saveCustomerCSFLE: csfle-dev-saveCustomerCSFLE (42 MB)
  getCustomerWithKey: csfle-dev-getCustomerWithKey (42 MB)
  getCustomerNoKey: csfle-dev-getCustomerNoKey (42 MB)
1 deprecation found: run 'serverless doctor' for more details
Need a faster logging experience than CloudWatch? Try our Dev Mode in Console: run "serverless dev"

