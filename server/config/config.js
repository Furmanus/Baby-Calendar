const config = {
    development: {
        httpPort: 3000,
        httpsPort: 3001,
        envName: 'development',
        mongoDbUrl: 'mongodb://admin:admin666@ds033380.mlab.com:33380/child_calendar',
        cryptoSecret: 'secret',
        sessionConfig: {
            secret: 'sess sec ret'
        }
    },
    production: {
        httpPort: 80,
        httpsPort: 443,
        envName: 'production',
        mongoDbUrl: 'mongodb://admin:admin666@ds033380.mlab.com:33380/child_calendar',
        cryptoSecret: '666 prod secret 666',
        sessionConfig: {
            secret: 'sess sec ret'
        }
    }
};
const env = process.env.NODE_ENV;

module.exports = config[env] || config.development;