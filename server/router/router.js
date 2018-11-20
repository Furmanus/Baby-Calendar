const express = require('express');
const router = express.Router();
const databaseHelper = require('../helpers/database');

router.get('/', (req, res) => {
    //TODO check session if user is logged in. if yes, redirect to dashboard, render login page otherwise
    res.json({res: 'ok'});
});

router.post('/login', async (req, res) => {
    const {
        user,
        password
    } = req.body;

    databaseHelper.getUser({
        user,
        password
    }, (statusCode, response) => {
        if (200 === statusCode) {
            req.session.userId = response._id;
            req.session.user = response.user;
        }
        res.status(statusCode).send(response);
    });
});

router.get('/logout', (req, res) => {
    delete req.session.userId;
    delete req.session.user;

    //TODO redirect to login page
    res.status(200).end();
});

module.exports = router;