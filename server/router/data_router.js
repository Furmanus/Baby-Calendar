const express = require('express');
const multer = require('multer');
const router = express.Router();
const databaseHelper = require('../helpers/database');
const awsHelper = require('../helpers/aws');
const errorCodes = require('../constants/errors_codes');

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
        wasImageDeleted,
    } = body;
    let fileUrl;

    if (file) {
        const type = file.mimetype.match(/image\/([a-zA-Z]+)/);

        if (type && type[1] && ['png', 'jpg', 'jpeg', 'gif'].includes(type[1])) {
            try {
                fileUrl = await awsHelper.uploadFile(file);
            } catch (error) {
                res.status(500).send(error);
            }
        } else {
            return res.status(400).send({
                error: true,
                code: errorCodes.InvalidImageType,
                fieldName: 'childImage',
            });
        }
    }

    if (wasImageDeleted === 'true') {
        fileUrl = '';
    }

    databaseHelper.updateUserData(Object.assign({
        childName,
        birthDate,
        userId
    }, fileUrl !== undefined && fileUrl !== null ? {imageData: fileUrl} : {}), async (statusCode, response) => {
        const {
            oldImageUrl,
        } = response;

        if ((fileUrl && oldImageUrl) || wasImageDeleted === 'true') {
            try {
                await awsHelper.deleteFile(oldImageUrl);
            } catch (error) {
                console.error(error);
            }
        }

        res.status(statusCode).send(response);
    });
});
router.get('/api/weight',(req, res) => {
    const {
        userId,
    } = req.session;

    databaseHelper.getUserData({userId}, (statusCode, response) => {
        res.status(statusCode).send(response.childWeightEntries || response);
    });
});
router.get('/api/inoculations', (req, res) => {
    const {
        userId,
    } = req.session;

    databaseHelper.getUserData({userId}, (statusCode, response) => {
        res.status(statusCode).send(response.childInoculationsEntries || response);
    });
});
router.get('/api/infections', (req, res) => {
    const {
        userId,
    } = req.session;

    databaseHelper.getUserData({userId}, (statusCode, response) => {
        res.status(statusCode).send(response.childInfectionsEntries || response);
    });
});
router.get('/api/notes', (req, res) => {
    const {
        userId,
    } = req.session;

    databaseHelper.getUserData({userId}, (statusCode, response) => {
        res.status(statusCode).send(response.childNotesEntries || response);
    });
});
router.put('/api/data', async (req, res) => {
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
router.post('/api/data', async (req, res) => {
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
router.delete('/api/data', async (req, res) => {
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

module.exports = router;
