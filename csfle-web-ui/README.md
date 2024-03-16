## Build & Running the Test Application

### Clone github CSFLE Test UI App
If you have already cloned the github repository the Single Page CSFLE React App should be available at the following folder ~/workspace/mongodb-aws-csfle/csfle-web-ui

### Configure Cognito Authentication

As we have deployed the APIs of csfle-service for authorised users we are going to set up Amazon Cognito Authentication. 

From AWS Console Open Amazon Cognito and choose to ‘Create User Pool’. Make sure your AWS region is selected same as where you deployed your service (in this case ‘eu-west-1’). In next screen keep everything default and check ‘Email’ as sign-in option. Click Next

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/8c84fbcb-e350-492a-95d6-cf104f24e5e6)

Keep everything default for Password Policy

![image](https://github.com/mongodb-partners/mongodb-aws-csfle/assets/89611148/290e03ce-6ad9-40ea-ae9d-e7ec72d72cf4)


Select ‘No MFA’ for Multi-factor Authentication. Keep the rest of the fields selected as default values. Click Next
 
Keep everything as default in Step 3 for Self-service sign-up, attribute verification and required attributes. Click Next
 
In Message Delivery Configuration choose ‘Send email with Cognito’. Click Next
 
 
Provide a meaningful name for the pool 
 
Create a public application client as below and click Next.
 
Review everything and hit ‘Crease user pool’
 
Note down the user pool ID from list
 

Go to App Integration tab and under Domain select Action -> ‘Create Cognito Domain’
 
Create a new Cognito Domain
 

Also go inside the user pool and click on ‘App Integration’ tab to find out the application client ID and click on the App Client
 
Scroll down to ‘Hosted UI’ section and click on Edit
 
Add Callback url, Sign-out url, Identity provider, OAuth 2.0 grant type, OpenID connect scopes as below and Click ‘Save Changes’
 
 
From left navigation click on ‘Identity Pools’ and hit ‘Create identity pool’ button from top. Select both ‘Authenticated’ and ‘Guest Access’ for the Identity pool and choose Authenticated entity source as ‘Amazon Cognito user pool’. Click Next
 
Create 2 new IAM roles for Authenticated role and Guest role. Hit Next
 

In Connect Identity Providers screen select Cognito user pool ID and App client ID. Click Next
 

Provide a name for the Identity pool and click Next.
 

Review and click on ‘Create identity pool’
 
Please note the Identity pool ID from the list
 

Modify Cognito Authentication Role
From AWS Console go to AWS IAM and click on Role from left. 
Search for ‘Cognito_csfleidentitypooltestAuth_Role’ and click on the result.
 
Under Permission Policies expand the policy and click on Edit
 
Add the following policy statement to allow the role to invoke 3 APIs we have created through serverless deployment in Step 8. Click Next
 
Click ‘Save Changes’
 



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

Start the React Web App
From command line go to ~/workspace/mongodb-aws-csfle/csfle-web-ui and type ‘npm run start’ to start the web application

````
cd workspace/mongodb-aws-csfle/csfle-web-ui

npm run start
````

