const config = {
    development: {
        httpPort: 3000,
        httpsPort: 3001,
        mongoDbUrl: process.env.DB_URL,
        cryptoSecret: process.env.DB_SECRET,
        sessionConfig: {
            secret: process.env.SESSION_SECRET,
        },
    },
    production: {
        httpPort: 80,
        httpsPort: 443,
        mongoDbUrl: process.env.DB_URL,
        cryptoSecret: process.env.DB_SECRET,
        sessionConfig: {
            secret: process.env.SESSION_SECRET,
        },
    }
};
const env = process.env.NODE_ENV;

module.exports = config[env] || config.development;
