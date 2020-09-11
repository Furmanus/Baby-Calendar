require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const router = require('./router/router');
const usersRouter = require('./router/users_router');
const dataRouter = require('./router/data_router');
const config = require('./config/config');
const MongoStore = require('connect-mongo')(expressSession);
const cloudinaryHelper = require('./helpers/cloudinary');
const {
    httpPort,
    httpsPort,
    envName
} = config;
const mongoStoreOptions = {
    url: config.mongoDbUrl,
};
const PORT = process.env.PORT || httpsPort;
const httpsOptions = {
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem'),
};

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'client/dist'));
app.use(express.static(path.resolve(__dirname, '..', 'client/dist')));
app.use(bodyParser.json());
app.use(expressSession({
    secret: config.sessionConfig.secret,
    store: new MongoStore(mongoStoreOptions),
}));
app.use(router);
app.use(usersRouter);
app.use(dataRouter);

cloudinaryHelper.initConfig();

https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} in ${envName} mode`);
});
