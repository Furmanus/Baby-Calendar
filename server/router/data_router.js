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
    } = req.session;
    const {
        childName,
        birthDate,
        childWeightEntry,
        childPoopEntry,
        childInoculationEntry
    } = req.body;

    databaseHelper.updateUserData({
        childName,
        birthDate,
        childWeightEntry,
        childPoopEntry,
        childInoculationEntry,
        userId
    }, (statusCode, response) => {
        res.status(statusCode).send(response);
    });
});
router.delete('/data', async (req, res) => {
    const {
        userId
    } = req.session;
    const {
        childName,
        birthDate,
        childWeightEntry,
        childPoopEntry,
        childInoculationEntry,
    } = req.body;

    databaseHelper.deleteUserData({
        childName,
        birthDate,
        childWeightEntry,
        childPoopEntry,
        childInoculationEntry,
        userId
    }, (statusCode, response) => {
        res.status(statusCode).send(response);
    })
});
router.put('/data_replace', async (req, res) => {
    const {
        userId
    } = req.session;

    const {
        childWeightEntry,
        originalChildWeightEntry,
        childPoopEntry,
        originalChildPoopEntry,
        inoculationEntry,
        originalInoculationEntry
    } = req.body;

    databaseHelper.replaceUserRecord({
        childWeightEntry,
        originalChildWeightEntry,
        childPoopEntry,
        originalChildPoopEntry,
        inoculationEntry,
        originalInoculationEntry,
        userId
    }, (statusCode, response) => {
        res.status(statusCode).send(response);
    });
});
module.exports = router;