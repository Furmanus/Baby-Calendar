const MongoClient = require('mongodb').MongoClient;
const config = require('../config/config');
const url = config.mongoDbUrl;
const constants = require('../constants/database_constats');
const cryptoHelper = require('./crypto');

const blankUserDataEntry = {
    childName: '',
    birthDate: '',
    childWeightEntries: [],
    childPoopsEntries: []
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
                    callback(400, {error: 'Wrong user login or password'});
                }
            } catch (err) {
                console.error(err);
                callback(500, {
                    error: err,
                    message: 'Error while fetching user data from database'
                });
            }
        } else {
            callback(400, {error: 'Missing required fields'});
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

                await dbObject.collection(constants.USERS_DATA).updateOne({userId}, {
                    $set: {...userDataRecord}
                });
                dbConnection.close();

                callback(200);
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
    }
};

module.exports = databaseMethods;