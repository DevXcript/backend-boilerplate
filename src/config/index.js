import dotenv from "dotenv";

dotenv.config();

export const env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 5000,

    // Database
    MONGO_URI: process.env.MONGO_URI,

    // JWT Secrets
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || process.env.ACCESS_TOKEN_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || process.env.REFRESH_TOKEN_SECRET,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES || process.env.ACCESS_TOKEN_EXPIRY || "15m",
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || process.env.REFRESH_TOKEN_EXPIRY || "7d",

    // Cookie
    COOKIE_SECRET: process.env.COOKIE_SECRET,

    // CORS
    CORS_ORIGINS: process.env.CORS_ORIGINS,
    CLIENT_URL: process.env.CLIENT_URL,
    ADMIN_URL: process.env.ADMIN_URL,

    // Rate Limiting
    RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
    RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS,

    // Trust Proxy
    TRUST_PROXY: process.env.TRUST_PROXY,
};
