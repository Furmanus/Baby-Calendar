const express = require('express');
const multer = require('multer');
const router = express.Router();
const databaseHelper = require('../helpers/database');
const awsHelper = require('../helpers/aws');

const upload = multer({
    storage: multer.memoryStorage(),
});

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
// V2 TODO remove things above
router.get('/api/info', async (req, res) => {
    const {
        userId,
    } = req.session;

    databaseHelper.getUserData({userId}, (statusCode, response) => {
        res.status(statusCode).send(response);
    });
});
router.post('/api/info', upload.single('childImage'), async (req, res) => {
    const {
        userId,
    } = req.session;
    const {
        body,
        file,
    } = req;
    const {
        childName,
        birthDate,
    } = body;
    let fileUrl;

    if (file) {
        try {
            fileUrl = await awsHelper.uploadFile(file);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    databaseHelper.updateUserData(Object.assign({
        childName,
        birthDate,
        userId
    }, fileUrl ? {imageData: fileUrl} : {}), (statusCode, response) => {
        res.status(statusCode).send(response);
    });
});

module.exports = router;
