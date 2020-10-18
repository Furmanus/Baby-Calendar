const config = {
    development: {
        httpPort: 3000,
        httpsPort: 3001,
        mongoDbUrl: process.env.DB_URL,
        cryptoSecret: process.env.DB_SECRET,
        sessionConfig: {
            secret: process.env.SESSION_SECRET,
        },
        cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryApiSecret: process.env.CLOUDINARY_SECRET,
    },
    production: {
        httpPort: 80,
        httpsPort: 443,
        mongoDbUrl: process.env.DB_URL,
        cryptoSecret: process.env.DB_SECRET,
        sessionConfig: {
            secret: process.env.SESSION_SECRET,
        },
        cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryApiSecret: process.env.CLOUDINARY_SECRET,
    }
};
const env = process.env.NODE_ENV;

module.exports = config[env] || config.development;
