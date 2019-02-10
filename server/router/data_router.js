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
        childInoculationEntry,
        childInfectionEntry,
        childNoteEntry,
        imageData
    } = req.body;

    databaseHelper.updateUserData({
        childName,
        birthDate,
        childWeightEntry,
        childPoopEntry,
        childInoculationEntry,
        childInfectionEntry,
        childNoteEntry,
        userId,
        imageData
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
        childInfectionEntry,
        childNoteEntry,
        imageData
    } = req.body;

    databaseHelper.deleteUserData({
        childName,
        birthDate,
        childWeightEntry,
        childPoopEntry,
        childInoculationEntry,
        childInfectionEntry,
        childNoteEntry,
        imageData,
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
        originalInoculationEntry,
        infectionEntry,
        originalInfectionEntry,
        noteEntry,
        originalNoteEntry,
    } = req.body;

    databaseHelper.replaceUserRecord({
        childWeightEntry,
        originalChildWeightEntry,
        childPoopEntry,
        originalChildPoopEntry,
        inoculationEntry,
        originalInoculationEntry,
        infectionEntry,
        originalInfectionEntry,
        noteEntry,
        originalNoteEntry,
        userId
    }, (statusCode, response) => {
        res.status(statusCode).send(response);
    });
});
module.exports = router;