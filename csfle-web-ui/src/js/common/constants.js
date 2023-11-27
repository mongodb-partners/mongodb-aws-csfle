export const GEOLOCATION_URL = process.env.REACT_APP_GEOLOCATION_URL;
export const GTAG_TRACKING_ID = process.env.REACT_APP_GTAG_TRACKING_ID;
export const MEDIA_HOST = process.env.REACT_APP_MEDIA_HOST;
export const GOOGLE_MAP_API_URL = process.env.REACT_APP_GOOGLE_MAP_API_URL;
export const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY
export const FACEBOOK_APP_URL= process.env.REACT_APP_FACEBOOK_APP_URL;
export const AWS_CONFIG = {
    region: process.env.REACT_APP_AWS_REGION,
    s3: {
        REGION: process.env.REACT_APP_AWS_S3_REGION,
        BUCKET: process.env.REACT_APP_AWS_S3_BUCKET,
        BLOG_BUCKET: process.env.REACT_APP_AWS_S3_BLOG_BUCKET,
        DOCUMENT_BUCKET: process.env.REACT_APP_AWS_S3_DOCUMENT_BUCKET,
        MEDIA_BUCKET: process.env.REACT_APP_AWS_S3_MEDIA_BUCKET,
        MESSAGE_BUCKET: process.env.REACT_APP_AWS_S3_MESSAGE_BUCKET
    },
    apiGateway: {
        REGION: process.env.REACT_APP_AWS_API_GATEWAY_REGION,
        URL: process.env.REACT_APP_AWS_API_GATEWAY_URL,
        CORE:process.env.REACT_APP_AWS_API_GATEWAY_URL_CORE,
        AUTH:process.env.REACT_APP_AWS_API_GATEWAY_URL_AUTH,
        IMAGE:process.env.REACT_APP_AWS_API_GATEWAY_URL_IMAGE,
    },
    cognito: {
        REGION: process.env.REACT_APP_AWS_COGNITO_REGION,
        USER_POOL_ID: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
        APP_CLIENT_ID: process.env.REACT_APP_AWS_COGNITO_APP_CLIENT_ID,
        IDENTITY_POOL_ID: process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID
    },
    social: {
        FB: process.env.REACT_APP_FACEBOOK_APP_ID
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
export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];