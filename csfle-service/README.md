## Set up Development Environment
Before we clone the repository to build and deploy Client Side Feild Level Encryption (CSFLE) microservice using Amazon API Gateway and AWS Lambda it's important to complete the development environment setup.

### Individual User Setup
Sign in to your AWS account and create an administrative user by following this <a href="https://docs.aws.amazon.com/cloud9/latest/user-guide/setup-express.html">guide</a>.

### Create an EC2 Environment for AWS Cloud 9 (IDE)

Open AWS Cloud 9 console by going to <a href="https://eu-west-1.console.aws.amazon.com/cloud9">https://eu-west-1.console.aws.amazon.com/cloud9</a>.

Choose AWS region from top right navigation bar. For this tutorial I am using eu-west-1.

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/f178fcdf-e9c5-439a-8efa-84c3f4ab8180)


Follow the steps as described in https://docs.aws.amazon.com/cloud9/latest/user-guide/create-environment-main.html to create an EC2 environment. (Enter environment name, select Platform as 'Amazon Linux 2' and keep everything default like environment type, instance type, platform, timeout etc)
 
![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/27368e26-4687-43e2-bae4-074b0d797b2a)
![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/7f528772-f210-44be-9f5e-43949f8da217)


#### Warning
> 
> Creating an Amazon EC2 instance for your environment might result in possible charges to your AWS account for Amazon EC2. There's no additional cost to use Systems Manager to manage connections to your existing EC2 instance.


### Working with the IDE
Once the environment creation is successful open Cloud9 IDE from the list of environments

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/97be78b3-46b4-48b5-b897-ca03574b4ea7)
![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/bfd2dda9-401c-4727-9cd2-660850b4f533)


Make sure you have NodeJS, NPM and Git SCM client are installed by running following commands and validating the output
````
node --version

npm --version

git --version
````

### Install Serverless Framework
Run the following command to install serverless framework to deploy AWS serverless stack (<a href="https://www.serverless.com/framework/docs">https://www.serverless.com/framework/docs</a>) and validate the installation
````
npm install -g serverless
````


### Clone Github Repository

Create a directory named ‘workspace’ and change your location inside the new directory
````
mkdir workspace
````

Go to AWS Cloud 9 IDE window and click on the Source Control icon from left navigation and click on ‘Clone Repository.

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/d5e355c3-a3a2-4a17-9d55-1eeb5a1d3b7e)


Type the url <a href="https://github.com/mongodb-partners/mongodb-aws-csfle">https://github.com/mongodb-partners/mongodb-aws-csfle</a> in repository text box and click Clone from URL

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/a2a1dfa7-815b-415e-94be-be94bad02910)


Choose the folder created in last step, ‘workspace’ to clone the repository

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/ff7cfdc6-0074-441a-b81a-436a82b33349)


After github repository clone is complete you’ll see the following folder structure in Project explorer navigation on the left

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/f13d6efd-ba7b-47ea-8f61-e7752c16f7be)


#### Download and Extract Automated Shared Encryption Library

From bash shell create a folder 'mongo_crypt_shared' for Mongo Encryption Library
````
cd mongodb-aws-csfle/csfle-service/

mkdir mongo_crypt_shared

cd mongo_crypt_shared/
````
 
Download MongoDB Automated Shared Encryption Library for Amazon Linux 2 x64 version
````
curl  https://downloads.mongodb.com/linux/mongo_crypt_shared_v1-linux-x86_64-enterprise-amazon2-7.0.4.tgz?_ga=2.226686749.1017429497.1702377509-572716933.1675964579 -o mongo_crypt_shared_v1-linux-x86_64-enterprise-amazon2-7.0.4.tgz
````
 
Extract the Encryption Library archive
````
tar xvf mongo_crypt_shared_v1-linux-x86_64-enterprise-amazon2-7.0.4.tgz
````

Clean up the downloaded file
````
rm -f mongo_crypt_shared_v1-linux-x86_64-enterprise-amazon2-7.0.4.tgz
````

## Store MongoDB & AWS KMS Parameters

Open <a href="https://eu-west-1.console.aws.amazon.com/secretsmanager/home?region=eu-west-1">AWS Secrets Manager</a> and create following 2 Secrets in your chosen region (e.g., eu-west-1)

Click on ‘Store a new secret’, choose Secret type as ‘Other type of secret’ and add a key value pair. Name the key as  ‘DEV_MONGODB_ATLAS_CLUSTER_URI’ and add the MongoDB connection string as value.

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/501de127-6156-4be5-9715-fc78362d1545)

Repeat the same to store KMS Provider and IAM user credentials in a new secret. 
Add the following key/value pairs 
Key - KMS_PROVIDER_ACCESS_KEY, Value - IAM user access key.
Key - KMS_PROVIDER_SECRET_ACCESS_KEY, Value - IAM user secret access key.
Key - KMS_PROVIDER_MASTER_KEY_ARN, Value – AWS KMS master key ARN
Name the secret as ‘DEV_KMS_PROVIDER_SECRETS’ and store.
 
![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/f4c82857-0d02-4edb-a704-92043935790b)


## Build & Deploy CSFLE Service

### Build node modules

````
cd workspace/

cd mongodb-aws-csfle/

cd csfle-service/

npm install
````

### Configure Environment Variables

Create a .env file inside csfle-service forlder and define following environment variables

````
RUNTIME=nodejs16.x
PROFILE=default
SERVICE_NAME=csfle
DB_NAME=CSFLE
COLLECTION_NAME=customer
CRYPT_SHARED_LIB_PATH=/var/task/mongo_crypt_shared/lib/mongo_crypt_v1.so
````

The following environment variables are meant for a custom domain configuration for API Gateway. If you don’t have a Route 53 hosted domain, please ignore them. 

> API_DOMAIN=YOUR_DOMAIN
> 
> BASE_PATH=csfle
> 
> CERTIFICATE_NAME=YOUR_CERTIFICATE_NAME
> 
> HOSTED_ZONE_ID=ROUTE53_HOSTED_ZONE
> 
> ENDPOINT_TYPE=regional
> 
> SECURITY_POLICY=tls_1_2
> 
> API_TYPE=rest

Along with that you need to remove the following lines from serverless.yml file too.

````
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
````

### Configuring Security

All the APIs we are going to deploy will be secured via AWS IAM authentication. Which means only users who has authenticated will receive a token to exchange with IAM Credentials and in turn will get access to the Amazon APIs below.

Open serverless.yml and validate the authorizer as ‘aws_iam’

````
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
````

### Deploy API using Serverless

Use serverless deploy using stage (dev) and AWS region for deployment (eu-west-1 in this case)

````
serverless deploy --stage dev --region eu-west-1
````
