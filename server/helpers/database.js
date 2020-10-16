const loginErrorCodes = require('../constants/errors_codes');
const MongoClient = require('mongodb').MongoClient;
const config = require('../config/config');
const url = config.mongoDbUrl;
const constants = require('../constants/database_constats');
const cryptoHelper = require('./crypto');
const cloudinaryHelper = require('./cloudinary');

const blankUserDataEntry = {
    childName: '',
    birthDate: '',
    childWeightEntries: [],
    childPoopsEntries: [],
    childInoculationsEntries: [],
    childInfectionsEntries: [],
    childNotesEntries: [],
};

const databaseMethods = {
    async createConnection() {
        try {
            return MongoClient.connect(url);
        } catch (err) {
            console.error(err);
        }
    },
    async getUser(data, callback) {
        let {
            user,
            password
        } = data;

        if (user && password) {
            try {
                password = cryptoHelper.hashString(password);

                const dbConnection = await this.createConnection();
                const dbObject = dbConnection.db(constants.DATABASE_NAME);
                const userData = await dbObject.collection(constants.USERS).find({
                    user,
                    password
                }).toArray();

                dbConnection.close();

                if (userData.length) {
                    callback(200, userData[0]);
                } else {
                    callback(400, {
                        error: true,
                        message: 'Wrong user login or password',
                        code: loginErrorCodes.LoginWrongUserOrPassword,
                    });
                }
            } catch (err) {
                console.error(err);
                callback(500, {
                    error: err,
                    message: 'Error while fetching user data from database',
                    code: 500,
                });
            }
        } else {
            let code;

            if (!user && !password) {
                code = loginErrorCodes.LoginAndPasswordFieldEmpty;
            } else if (!user && password) {
                code = loginErrorCodes.LoginFieldEmpty;
            } else if (user && !password) {
                code = loginErrorCodes.PasswordFieldEmpty;
            }

            callback(400, {
                error: true,
                message: 'Missing required fields',
                code,
            });
        }
    },
    async insertUser(data, callback) {
        const {
            user
        } = data;

        try {
            const dbConnection = await this.createConnection();
            const dbObject = dbConnection.db(constants.DATABASE_NAME);
            const userAlreadyExists = await dbObject.collection(constants.USERS).findOne({user});
            let userRecord;

            if (userAlreadyExists) {
                dbConnection.close();

                callback(409, {
                    error: true,
                    message: 'User already exists',
                    code: loginErrorCodes.RegisterUserAlreadyExists,
                });
            } else {
                userRecord = await dbObject.collection(constants.USERS).insertOne(data);
                await dbObject.collection(constants.USERS_DATA).insertOne(
                    Object.assign({}, blankUserDataEntry, {userId: userRecord.ops[0]._id.toHexString()})
                );

                dbConnection.close();

                callback(200, {
                    user: userRecord.ops[0].user,
                    id: userRecord.ops[0]._id
                });
            }
        } catch (err) {
            console.error(err);
            callback(500, {
                error: err,
                message: 'Error while storing user data in database'
            });
        }
    },
    async getUserData(data, callback) {
        const {
            userId
        } = data;
        const dbConnection = await this.createConnection();
        const dbObject = dbConnection.db(constants.DATABASE_NAME);
        let userDataRecord;

        if ('string' === typeof userId) {
            userDataRecord = await dbObject.collection(constants.USERS_DATA).findOne({userId});
            if (userDataRecord) {
                callback(200, userDataRecord);
            } else {
                callback(400, {
                    error: true,
                    message: 'Can\'t find specified user data or user doesn\'t exists',
                });
            }
            dbConnection.close();
        } else {
            callback(400, {
                error: true,
                message: 'User id is not string type'
            });
        }
    },
    async updateUserData(data, callback) {
        try {
            const {
                childName,
                birthDate,
                childWeightEntry,
                childPoopEntry,
                childInoculationEntry,
                childInfectionEntry,
                childNoteEntry,
                imageData,
                userId
            } = data;
            const dbConnection = await this.createConnection();
            const dbObject = dbConnection.db(constants.DATABASE_NAME);
            const userDataRecord = await dbObject.collection(constants.USERS_DATA).findOne({userId});
            let deletionResult;

            if (userDataRecord) {
                userDataRecord.childName = childName || userDataRecord.childName;
                userDataRecord.birthDate = birthDate || userDataRecord.birthDate;
                childWeightEntry && userDataRecord.childWeightEntries.push(childWeightEntry);
                childPoopEntry && userDataRecord.childPoopsEntries.push(childPoopEntry);
                childInoculationEntry && userDataRecord.childInoculationsEntries.push(childInoculationEntry);
                childInfectionEntry && userDataRecord.childInfectionsEntries.push(childInfectionEntry);
                childNoteEntry && userDataRecord.childNotesEntries.push(childNoteEntry);

                if (userDataRecord.imageData) {
                    try {
                        await cloudinaryHelper.removeImage(userDataRecord.imageData.public_id);
                    } catch (e) {
                        console.warn(e);
                    }
                    /**
                     * Deletion result ignored on purpose. New image is already uploaded, so how app should react
                     * on failed deletion of old image is a mystery. Wait till rewrite app, so client first sends image
                     * to server and then server uploads image to cloudinary?
                     */
                }
                if (imageData) {
                    userDataRecord.imageData = imageData;
                }

                await dbObject.collection(constants.USERS_DATA).updateOne({userId}, {
                    $set: {...userDataRecord}
                });
                dbConnection.close();
                callback(200, userDataRecord);
            } else {
                callback(400, {
                    error: true,
                    message: 'Can\'t find specified user data or user doesn\'t exists'
                });
            }
        } catch (err) {
            console.error(err);
            callback(500, err);
        }
    },
    async deleteUserData(data, callback) {
        try {
            const {
                childName,
                birthDate,
                childWeightEntry,
                childPoopEntry,
                childInoculationEntry,
                childInfectionEntry,
                childNoteEntry,
                imageData,
                userId
            } = data;
            const dbConnection = await this.createConnection();
            const dbObject = dbConnection.db(constants.DATABASE_NAME);
            const userDataRecord = await dbObject.collection(constants.USERS_DATA).findOne({userId});
            let entryDeleted = false;

            if (userDataRecord) {
                if (childName) {
                    userDataRecord.childName = null;
                }
                if (birthDate) {
                    userDataRecord.birthDate = null;
                }
                if (imageData) {
                    const deletionResult = await cloudinaryHelper.removeImage(imageData.public_id);

                    if (deletionResult.result === 'ok') {
                        userDataRecord.imageData = null;
                    } else {
                        callback(500, {
                            error: true,
                            message: 'Failed to delete image'
                        });
                        return;
                    }
                }
                if (childWeightEntry) {
                    userDataRecord.childWeightEntries = userDataRecord.childWeightEntries.filter(entry => {
                        const weighsEqual = (entry.childWeight === childWeightEntry.childWeight);
                        const datesEqual = (entry.weightDate === childWeightEntry.weightDate);

                        if (weighsEqual && datesEqual && !entryDeleted) {
                            entryDeleted = true;
                            return false;
                        }
                        return true;
                    });
                }
                if (childPoopEntry) {
                    userDataRecord.childPoopsEntries = userDataRecord.childPoopsEntries.filter(entry => {
                        const datesEqual = (entry.date === childPoopEntry.date);

                        if (datesEqual && !entryDeleted) {
                            entryDeleted = true;
                            return false;
                        }
                        return true;
                    });
                }
                if (childInoculationEntry) {
                    userDataRecord.childInoculationsEntries = userDataRecord.childInoculationsEntries.filter(entry => {
                        const descriptionsEqual = (entry.description === childInoculationEntry.description);
                        const datesEqual = (entry.inoculationDate === childInoculationEntry.inoculationDate);

                        if (descriptionsEqual && datesEqual && !entryDeleted) {
                            entryDeleted = true;
                            return false;
                        }
                        return true;
                    });
                }
                if (childInfectionEntry) {
                    userDataRecord.childInfectionsEntries = userDataRecord.childInfectionsEntries.filter(entry => {
                        const descriptionsEqual = (entry.description === childInfectionEntry.description);
                        const datesEqual = (entry.inoculationDate === childInfectionEntry.inoculationDate);

                        if (descriptionsEqual && datesEqual && !entryDeleted) {
                            entryDeleted = true;
                            return false;
                        }
                        return true;
                    });
                }
                if (childNoteEntry) {
                    userDataRecord.childNotesEntries = userDataRecord.childNotesEntries.filter(entry => {
                        const descriptionsEqual = (entry.description === childNoteEntry.description);
                        const datesEqual = (entry.date === childNoteEntry.date);

                        if (descriptionsEqual && datesEqual && !entryDeleted) {
                            entryDeleted = true;
                            return false;
                        }
                        return true;
                    });
                }

                await dbObject.collection(constants.USERS_DATA).updateOne({userId}, {
                    $set: {...userDataRecord}
                });
                dbConnection.close();
                callback(200, userDataRecord);
            } else {
                callback(400, {
                    error: true,
                    message: 'Can\'t find specified user data or user doesn\'t exists'
                });
            }
        } catch (err) {
            console.error(err);
            callback(500, err);
        }
    },
    async replaceUserRecord(data, callback) {
        try {
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
                userId
            } = data;
            const dbConnection = await this.createConnection();
            const dbObject = dbConnection.db(constants.DATABASE_NAME);
            const userDataRecord = await dbObject.collection(constants.USERS_DATA).findOne({userId});
            let entryChanged = false;

            if (userDataRecord) {
                if (childWeightEntry && originalChildWeightEntry) {
                    const originalWeight = originalChildWeightEntry.childWeight;
                    const originalDate = originalChildWeightEntry.weightDate;

                    userDataRecord.childWeightEntries = userDataRecord.childWeightEntries.map(entry => {
                        const {
                            childWeight: entryWeight,
                            weightDate: entryDate
                        } = entry;
                        const areEntriesSame = (entryWeight === originalWeight && entryDate === originalDate);

                        if (areEntriesSame && !entryChanged) {
                            entryChanged = true;
                            return childWeightEntry;
                        }
                        return entry;
                    });
                }
                if (childPoopEntry) {
                    const {
                        date: originalDate
                    } = originalChildPoopEntry;

                    userDataRecord.childPoopsEntries = userDataRecord.childPoopsEntries.map(entry => {
                        const areEntriesSame = (entry.date === originalDate);

                        if (areEntriesSame && !entryChanged) {
                            entryChanged = true;
                            return childPoopEntry;
                        }
                        return entry;
                    });
                }

                if (inoculationEntry && originalInoculationEntry) {
                    const {
                        inoculationDate: originalInoculationDate,
                        description: originalDescription
                    } = originalInoculationEntry;

                    userDataRecord.childInoculationsEntries = userDataRecord.childInoculationsEntries.map(entry => {
                        const {
                            inoculationDate,
                            description
                        } = entry;
                        const areEntriesSame = (
                            originalInoculationDate === inoculationDate &&
                            originalDescription === description
                        );

                        if (areEntriesSame && !entryChanged) {
                            entryChanged = true;
                            return inoculationEntry;
                        }
                        return entry;
                    });
                }

                if (infectionEntry && originalInfectionEntry) {
                    const {
                        date: originalDate,
                        description: originalDescription
                    } = originalInfectionEntry;

                    userDataRecord.childInfectionsEntries = userDataRecord.childInfectionsEntries.map(entry => {
                        const {
                            date,
                            description
                        } = entry;
                        const areEntriesSame = (date === originalDate && description === originalDescription);

                        if (areEntriesSame && !entryChanged) {
                            entryChanged = true;
                            return infectionEntry;
                        }
                        return entry;
                    });
                }

                if (noteEntry && originalNoteEntry) {
                    const {
                        date: originalDate,
                        description: originalDescription
                    } = originalNoteEntry;

                    userDataRecord.childNotesEntries = userDataRecord.childNotesEntries.map(entry => {
                        const {
                            date,
                            description
                        } = entry;
                        const areEntriesSame = (date === originalDate && description === originalDescription);

                        if (areEntriesSame && !entryChanged) {
                            entryChanged = true;
                            return noteEntry;
                        }
                        return entry;
                    });
                }

                await dbObject.collection(constants.USERS_DATA).updateOne({userId}, {
                    $set: {...userDataRecord}
                });
                dbConnection.close();
                callback(200, userDataRecord);
            } else {
                callback(400, {
                    error: true,
                    message: 'Can\'t find specified user data or user doesn\'t exists'
                })
            }
        } catch (err) {
            console.error(err);
            callback(500, err);
        }
    }
};

module.exports = databaseMethods;
