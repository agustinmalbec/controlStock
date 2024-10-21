import dotenv from 'dotenv';

const environment = '.env';
dotenv.config({
    path: environment
});

export default {
    DB_LINK: process.env.DB_LINK,
    SECRET_KEY: process.env.SECRET_KEY,
    KEY: process.env.KEY,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
};