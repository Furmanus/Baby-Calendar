const MongoClient = require('mongodb').MongoClient;
const config = require('../config/config');
const url = config.mongoDbUrl;
const constants = require('../constants/database_constats');
const cryptoHelper = require('./crypto');

const blankUserDataEntry = {
    childName: '',
    birthDate: '',
    childWeightEntries: [],
    childPoopsEntries: [],
    childInoculationsEntries: []
};

const databaseMethods = {
    async createConnection() {
        try {
            return connectionObject = await MongoClient.connect(url);
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
                        message: 'Wrong user login or password'
                    });
                }
            } catch (err) {
                console.error(err);
                callback(500, {
                    error: err,
                    message: 'Error while fetching user data from database'
                });
            }
        } else {
            callback(400, {
                error: true,
                message: 'Missing required fields'
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
                    message: 'User already exists'
                });
            } else {
                userRecord = await dbObject.collection(constants.USERS).insertOne(data);
                userDataRecord = await dbObject.collection(constants.USERS_DATA).insertOne(
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
                    message: 'Can\'t find specified user data or user doesn\'t exists'
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
                userId
            } = data;
            const dbConnection = await this.createConnection();
            const dbObject = dbConnection.db(constants.DATABASE_NAME);
            const userDataRecord = await dbObject.collection(constants.USERS_DATA).findOne({userId});

            if (userDataRecord) {
                userDataRecord.childName = childName || userDataRecord.childName;
                userDataRecord.birthDate = birthDate || userDataRecord.birthDate;
                childWeightEntry && userDataRecord.childWeightEntries.push(childWeightEntry);
                childPoopEntry && userDataRecord.childPoopsEntries.push(childPoopEntry);
                childInoculationEntry && userDataRecord.childInoculationsEntries.push(childInoculationEntry);

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