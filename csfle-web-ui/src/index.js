import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Amplify, Storage } from 'aws-amplify';
import { AWS_CONFIG } from './js/common/constants';
import App from './js/app';
import reportwebvitals from './js/common/reportwebvitals';

Amplify.configure({
    Auth: {
        region: AWS_CONFIG.cognito.REGION,
        userPoolId: AWS_CONFIG.cognito.USER_POOL_ID,
        identityPoolId: AWS_CONFIG.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: AWS_CONFIG.cognito.APP_CLIENT_ID,
        oauth: {
            domain: AWS_CONFIG.oath.DOMAIN,
            scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            redirectSignIn: AWS_CONFIG.oath.REDIRECT_SIGN_IN,
            redirectSignOut: AWS_CONFIG.oath.REDIRECT_SIGN_OUT,
            responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
    },
    /*Storage: {
        region: AWS_CONFIG.s3.REGION,
        bucket: AWS_CONFIG.s3.BUCKET
    },*/
    API: {
        endpoints: [
            {
                name: 'saveCustomerCSFLE',
                endpoint: AWS_CONFIG.apiGateway.URL + '/csfle',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'getCustomerWithKey',
                endpoint: AWS_CONFIG.apiGateway.URL + '/csfle',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'getCustomerNoKey',
                endpoint: AWS_CONFIG.apiGateway.URL + '/csfle',
                region: AWS_CONFIG.apiGateway.REGION
            }
        ]
    }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportwebvitals();
