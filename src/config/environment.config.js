import dotenv from 'dotenv';

const environment = '.env';
dotenv.config({
    path: environment
});

export default {
    DB_LINK: process.env.DB_LINK
};