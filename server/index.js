const express = require('express');
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

app.use(bodyParser.json());
app.use(expressSession(config.sessionConfig));
app.use(router);
app.use(usersRouter);
app.use(dataRouter);

app.listen(httpPort, () => {
    console.log(`Server is listening on port ${httpPort} in ${envName} mode.`);
});
