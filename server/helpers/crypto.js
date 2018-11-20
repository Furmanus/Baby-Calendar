const crypto = require('crypto');
const config = require('../config/config');

module.exports = {
    hashString(str) {
        if ('string' !== typeof str) {
            throw new TypeError('Invalid argument, string to hash isn\'t string type');
        }

        return crypto.createHmac('sha256', config.cryptoSecret).update(str).digest('hex');
    }
};