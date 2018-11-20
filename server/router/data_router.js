const express = require('express');
const router = express.Router();
const databaseHelper = require('../helpers/database');

router.get('/data', async (req, res) => {
    const {
        userId
    } = req.session;

    databaseHelper.getUserData({userId}, (statusCode, response) => {
        res.status(statusCode).send(response);
    });
});
router.put('/data', async (req, res) => {
    const {
        userId
    } = req.body;
    const {
        childName,
        birthDate,
        childWeightEntry,
        childPoopEntry
    } = req.body;

    databaseHelper.updateUserData({
        childName,
        birthDate,
        childWeightEntry,
        childPoopEntry,
        userId
    }, (statusCode, response) => {
        res.status(statusCode).send(response);
    });
});
module.exports = router;