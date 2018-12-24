const express = require('express');
const router = express.Router();
const databaseHelper = require('../helpers/database');
const config = require('../config/config');

router.get('/', (req, res) => {
    res.redirect('/login');
});
router.get('/login', (req, res) => {
    const {
        userId,
        user
    } = req.session;

    if (userId && user) {
        //TODO consider stateful session stored in db?
        res.redirect('/dashboard');
    } else {
        res.render('login');
    }
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
        if (response.password) {
            delete response.password;
        }
        res.status(statusCode).send(response);
    });
});
router.get('/dashboard', async (req, res) => {
    const {
        userId,
        user
    } = req.session;

    if ((userId && user)) {
        res.render('app', {
            "userId": userId,
            "user": user
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/logout', (req, res) => {
    delete req.session.userId;
    delete req.session.user;

    res.status(200).send({response: 'ok'});
});

module.exports = router;