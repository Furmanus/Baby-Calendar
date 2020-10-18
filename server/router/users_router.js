const express = require('express');
const router = express.Router();
const databaseHelper = require('../helpers/database');
const cryptoHelper = require('../helpers/crypto');

router.get('/users', async (req, res) => {
    databaseHelper.getUsers({}, (statusCode, data) => {
        res.status(statusCode).json(data);
    });
});
router.post('/register', async (req, res) => {
    let {
        user,
        password
    } = req.body;

    if (user && password) {
        password = cryptoHelper.hashString(password);
        // TODO Add backend validation for login and password same as on frontend
        databaseHelper.insertUser({
            user,
            password
        }, (statusCode, data) => {
            if (201 === statusCode) {
                req.session.userId = data.id;
                req.session.user = data.user;
            }
            if (data.password) {
                delete data.password;
            }
            res.status(statusCode).json(data);
        });
    } else {
        res.status(400).json({
            error: true,
            message: 'Missing required fields'
        });
    }
});

module.exports = router;
