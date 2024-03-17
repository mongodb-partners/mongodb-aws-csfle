## Setup & Run CSFLE Web UI Application

In this section we'll learn how to set up & run CSFLE Web UI Application to test CSFLE Service

## Setup Authentication

As we have deployed the APIs of csfle-service accessible only for authorised users we are going to set up Amazon Cognito Authentication. 

### Configure Amazon Cognito

From AWS Console Open Amazon Cognito and choose to ‘Create User Pool’. Make sure your AWS region is selected same as where you deployed your service (in this case ‘eu-west-1’). In next screen keep everything default and check ‘Email’ as sign-in option. Click Next

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/8c84fbcb-e350-492a-95d6-cf104f24e5e6)

Keep everything default for Password Policy

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/290e03ce-6ad9-40ea-ae9d-e7ec72d72cf4)


Select ‘No MFA’ for Multi-factor Authentication. Keep the rest of the fields selected as default values. Click Next

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/cbb97d3d-bf0e-47e2-8e6f-84402ff58503)


Keep everything as default in Step 3 for Self-service sign-up, attribute verification and required attributes. Click Next

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/abe2069e-fbb8-45c4-8df7-cfb26dd72f30)


In Message Delivery Configuration choose ‘Send email with Cognito’. Click Next

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/f2ad06b5-cdec-4f22-8d42-2ce3199047e1)

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/d39dc7fd-57c5-4211-8828-ab86874c5b90)


Provide a name for the pool 'casfle-user-pool-test'

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/7dd67b95-6021-405f-abce-abd48bb997bb)


Create a public application client as below and click Next.

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/6d9ceef0-9ed6-49cc-934c-bce9a1cf6cbe)


Review everything and hit ‘Crease user pool’

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/21b0451b-81fa-4221-a27d-6bb3953e593a)


Note down the user pool ID from list

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/c4602074-9cde-4ac9-bac6-ad196194ea40)


Go to App Integration tab and under Domain select Action -> ‘Create Cognito Domain’

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/efbf4688-b314-4020-a51c-73b41a08f8fc)


Create a new Cognito Domain 'csfle-test'

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/e73106d9-ce26-42d9-9a92-6ee6e9fc3653)


Also go inside the user pool and click on ‘App Integration’ tab to find out the application client ID and click on the App Client

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/a07a76a7-cddf-4077-86df-98cfbd215ebd)


Scroll down to ‘Hosted UI’ section and click on Edit

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/6fedfe2c-66ab-4c47-a5c9-abbced60da25)

 
Add Callback url, Sign-out url, Identity provider, OAuth 2.0 grant type, OpenID connect scopes as below and Click ‘Save Changes’

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/77e9c0fe-7db9-47e7-b019-70b9d6f446f6)

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/f54bba23-f050-48ef-a9ab-6fdcd4f96996)


From left navigation click on ‘Identity Pools’ and hit ‘Create identity pool’ button from top. Select both ‘Authenticated’ and ‘Guest Access’ for the Identity pool and choose Authenticated entity source as ‘Amazon Cognito user pool’. Click Next

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/809092fe-1b90-40cd-a861-c80046fc3b0a)


Create 2 new IAM roles for Authenticated role and Guest role. Hit Next

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/1c6a0d9e-931c-4633-ae07-b7a086ab541d)


In Connect Identity Providers screen select Cognito user pool ID and App client ID. Click Next

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/5791b5a9-f979-47ec-bab6-0e2cbb9f62cd)

 
Provide a name for the Identity pool 'csfle identity pool test' and click Next.

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/a53f8343-ab80-4ec8-802b-74946072aa9b)

 
Review and click on ‘Create identity pool’

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/c9c619d1-6c94-446f-84a5-2cd7daf15327)

 
Please note the Identity pool ID from the list

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/768dc3a9-6391-4a50-b3ed-77e8d7d7f6ec)


### Modify Cognito Authentication Role

From AWS Console go to AWS IAM and click on Role from left.

Search for ‘Cognito_csfleidentitypooltestAuth_Role’ and click on the result.

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/f2bf55a2-3332-4024-8f3e-36d829904c99)

 
Under Permission Policies expand the policy and click on Edit

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/9e92f9b1-45b5-4604-a52f-5e1714976025)

 
Add the following policy statement to allow the role to invoke 3 APIs we have created through serverless deployment in csfle-service. Click Next

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/7d60eaa9-1977-408a-9daf-5d5f35be406d)

 
Click ‘Save Changes’
 
![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/4f40581a-d305-4706-8a82-6dc2028b6292)


## Run CSFLE Web UI Application

### Clone github CSFLE Test UI App
If you have already cloned the github repository the Single Page CSFLE React App should be available at the following folder ~/workspace/mongodb-aws-csfle/csfle-web-ui

### Populate the environment variables for React Web App
Open the web project in your IDE  ~/workspace/mongodb-aws-csfle/csfle-web-ui and create 2 environment configuration files named ‘.env.local’ and ‘.env.development.local’ in the root folder.

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/9887ece1-028a-4c76-829c-6ac5b6ece92d)


.env.local file should look like below

````
REACT_APP_GEOLOCATION_URL=https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572/
REACT_APP_AWS_REGION=eu-west-1
REACT_APP_AWS_API_GATEWAY_REGION=eu-west-1
REACT_APP_AWS_COGNITO_REGION=eu-west-1
REACT_APP_AWS_COOKIE_SECURED_FLAG=true
````

.env.development.local file should look like below, Please populate API Gateway, Cognito User and Identity pool details which you can get from Step 6 of the <a href="#">blog</a>.

````
REACT_APP_AWS_API_GATEWAY_URL=YOUR_API_GATEWAY_URL
REACT_APP_AWS_COGNITO_USER_POOL_ID=YOUR_COGNITO_USER_POOL_ID
REACT_APP_AWS_COGNITO_APP_CLIENT_ID=YOUR_COGNITO_USER_POLL_APP_CLIENT_ID
REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID=YOUR_IDENITITY_POOL_ID
REACT_APP_AWS_OATH_DOMAIN=YOUR_COGNITO_AUTH_DOMAIN
REACT_APP_AWS_OATH_REDIRECT_SIGN_IN=http://localhost:3000/sign-in
REACT_APP_AWS_OATH_REDIRECT_SIGN_OUT=http://localhost:3000/sign-in
````

### Start the React Web App
From command line go to ~/workspace/mongodb-aws-csfle/csfle-web-ui and type ‘npm run start’ to start the web application

````
cd workspace/mongodb-aws-csfle/csfle-web-ui

npm run start
````

