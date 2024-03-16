## Build & Running the Test Application

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

Start the React Web App
From command line go to ~/workspace/mongodb-aws-csfle/csfle-web-ui and type ‘npm run start’ to start the web application

````
cd workspace/mongodb-aws-csfle/csfle-web-ui

npm run start
````

