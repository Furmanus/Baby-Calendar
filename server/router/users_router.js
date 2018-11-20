const express = require('express');
const router = express.Router();
const databaseHelper = require('../helpers/database');
const cryptoHelper = require('../helpers/crypto');

router.get('/users', async (req, res) => {
    databaseHelper.getUsers({}, (statusCode, data) => {
        res.status(statusCode).json(data);
    });
});
router.post('/users', async (req, res) => {
    let {
        user,
        password
    } = req.body;

    if (user && password) {
        password = cryptoHelper.hashString(password);

        databaseHelper.insertUser({
            user,
            password
        }, (statusCode, data) => {
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