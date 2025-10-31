import { configDotenv } from "dotenv";

configDotenv()


export const config = {
    // Server
    server: {
        PORT: parseInt(process.env.PORT) || 3000,
        NODE_ENV: process.env.NODE_ENV || 'development',
    },

     // Database
    db: {
        MONGO_URI: process.env.MONGO_URI,
        DB_NAME: process.env.DB_NAME,
    },

    // // Security/Auth
    auth: {
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'WHITEBOARD1234',
        ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || '4h',
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'WHITEBOARD1234',
        REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || '4d',
    },
};