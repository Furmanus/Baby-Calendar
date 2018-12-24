const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const router = require('./router/router');
const usersRouter = require('./router/users_router');
const dataRouter = require('./router/data_router');
const config = require('./config/config');
const {
    httpPort,
    httpsPort,
    envName
} = config;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'client/dist'));
app.use(express.static(path.resolve(__dirname, '..', 'client/dist')));
app.use(bodyParser.json());
app.use(expressSession(config.sessionConfig));
app.use(router);
app.use(usersRouter);
app.use(dataRouter);

app.listen(httpPort, () => {
    console.log(`Server is listening on port ${httpPort} in ${envName} mode.`);
});
