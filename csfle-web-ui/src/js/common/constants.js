export const GEOLOCATION_URL = process.env.REACT_APP_GEOLOCATION_URL;
export const AWS_CONFIG = {
    region: process.env.REACT_APP_AWS_REGION,
    apiGateway: {
        REGION: process.env.REACT_APP_AWS_API_GATEWAY_REGION,
        URL: process.env.REACT_APP_AWS_API_GATEWAY_URL
    },
    cognito: {
        REGION: process.env.REACT_APP_AWS_COGNITO_REGION,
        USER_POOL_ID: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
        APP_CLIENT_ID: process.env.REACT_APP_AWS_COGNITO_APP_CLIENT_ID,
        IDENTITY_POOL_ID: process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID
    },
    cookie: {
        DOMAIN: process.env.REACT_APP_AWS_COOKIE_DOMAIN,
        SECURED: process.env.REACT_APP_AWS_COOKIE_SECURED_FLAG.toUpperCase() === 'TRUE'
    },
    oath: {
        DOMAIN: process.env.REACT_APP_AWS_OATH_DOMAIN,
        REDIRECT_SIGN_IN: process.env.REACT_APP_AWS_OATH_REDIRECT_SIGN_IN,
        REDIRECT_SIGN_OUT: process.env.REACT_APP_AWS_OATH_REDIRECT_SIGN_OUT
    }
};