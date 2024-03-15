## Set up Development Environment
As for this solution we want to enable Client Side Field Level Encryption completely automated and for that there is a dependency on Automated Encryption Shared Library of MongoDB. This library is distributed specific to Operating System requirement for client – in this scenario we are going to use AWS Lambda for our client so we’d need to set up our development environment in Linux-x86_x64 (which is the supported runtime for AWS Lambda)

We have few choices like using AWS Cloud 9 or another Linux based IDE. In this blog we’ll learn how to set up your AWS Cloud 9 environment for AWS Lambda.

### Individual User Setup
Sign in to your AWS account and create an administrative user by following this <a href="https://docs.aws.amazon.com/cloud9/latest/user-guide/setup-express.html">guide</a>.

### Create an EC2 Environment

Open AWS Cloud 9 console by going to https://eu-west-1.console.aws.amazon.com/cloud9.

Choose AWS region from top right navigation bar. For this tutorial I am using eu-west-1.




Follow the steps as described in https://docs.aws.amazon.com/cloud9/latest/user-guide/create-environment-main.html to create an EC2 environment. (Enter environment name and keep everything default like environment type, instance type, platform, timeout etc)
 





Warning
Creating an Amazon EC2 instance for your environment might result in possible charges to your AWS account for Amazon EC2. There's no additional cost to use Systems Manager to manage connections to your existing EC2 instance.

### Working with the IDE
Once the environment creation is successful open Cloud9 IDE from the list of environments








Make sure you have NodeJS, NPM and Git SCM client are installed by running following commands and validating the output
````
admin:~/environment $ node --version                                                                                                                                                                                                   
v18.17.1
admin:~/environment $ npm --version                                                                                                                                                                                                    
10.2.5
admin:~/environment $ git --version                                                                                                                                                                                                    
git version 2.40.1
````

### Install Serverless Framework
Run the following command to install serverless framework to deploy AWS serverless stack (https://www.serverless.com/framework/docs) and validate the installation
````
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
````


### Clone Github Repository

Create a directory named ‘workspace’ and change your location inside the new directory
````
admin:~/ environment $ mkdir workspace
admin:~/ environment $ cd workspace
admin:~/ environment/workspace $
````

From the IDE click on the Source Control icon from left navigation and click on ‘Clone Repository.


Type the url https://github.com/mongodb-partners/mongodb-aws-csfle in repository text box and click Clone from URL


Choose the folder created in last step, ‘workspace’ to clone the repository


After github repository clone is complete you’ll see the following folder structure in Project explorer navigation on the left






#### Download and Extract Automated Shared Encryption Library

From bash shell create a folder for Encryption Library
````
admin:~/environment/workspace $ cd mongodb-aws-csfle/csfle-service/
admin:~/environment/workspace/mongodb-aws-csfle/csfle-service (main) $ mkdir mongo_crypt_shared
admin:~/environment/workspace/mongodb-aws-csfle/csfle-service (main) $ cd mongo_crypt_shared/
````
 
Download MongoDB Automated Shared Encryption Library for Amazon Linux 2 x64 version
````
admin:~/environment/workspace/mongodb-aws-csfle/csfle-service/mongo_crypt_shared (main) $ curl  https://downloads.mongodb.com/linux/mongo_crypt_shared_v1-linux-x86_64-enterprise-amazon2-7.0.4.tgz?_ga=2.226686749.1017429497.1702377509-572716933.1675964579 -o mongo_crypt_shared_v1-linux-x86_64-enterprise-amazon2-7.0.4.tgz
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 28.8M  100 28.8M    0     0  21.2M      0  0:00:01  0:00:01 --:--:-- 21.2M
````
 
Extract the Encryption Library archive
````
admin:~/environment/workspace/mongodb-aws-csfle/csfle-service/mongo_crypt_shared (main) $ tar xvf mongo_crypt_shared_v1-linux-x86_64-enterprise-amazon2-7.0.4.tgz
LICENSE-Enterprise.txt
MPL-2
README
THIRD-PARTY-NOTICES
include/mongo_crypt/v1/mongo_crypt/mongo_crypt.h
lib/mongo_crypt_v1.so
````

Clean up the downloaded file
````
admin:~/environment/workspace/mongodb-aws-csfle/csfle-service/mongo_crypt_shared (main) $ rm -f mongo_crypt_shared_v1-linux-x86_64-enterprise-amazon2-7.0.4.tgz
````