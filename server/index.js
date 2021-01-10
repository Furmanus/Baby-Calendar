require('dotenv').config();
const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const router = require('./router/router');
const usersRouter = require('./router/users_router');
const dataRouter = require('./router/data_router');
const config = require('./config/config');
const MongoStore = require('connect-mongo')(expressSession);
const {
    httpPort,
    httpsPort,
    envName
} = config;
const mongoStoreOptions = {
    url: config.mongoDbUrl,
};
let credentials;

try {
    credentials = {
        key: fs.readFileSync(process.env.CERT_KEY), cert: fs.readFileSync(process.env.CERT_PATH),
    };
} catch {
    console.error('Failed to read SSL cert files');
    credentials = {};
}

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'client/dist'));
app.use(express.static(path.resolve(__dirname, '..', 'client/dist')));
app.use('/info', express.static(path.resolve(__dirname, '..', 'client/dist')));
app.use(bodyParser.json());
app.use(expressSession({
    secret: config.sessionConfig.secret,
    store: new MongoStore(mongoStoreOptions),
}));
app.use(router);
app.use(usersRouter);
app.use(dataRouter);

http.createServer(app).listen(httpPort, () => {
    console.log(`Http server is listening at port ${httpPort} in ${envName} mode`);
});
https.createServer(credentials, app).listen(httpsPort, () => {
    console.log(`Https server is listening at port ${httpsPort} in ${envName} mode`);
});
