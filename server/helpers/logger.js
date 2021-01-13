const fs = require('fs/promises');
const os = require('os');

const END_ERROR = 'END_ERROR';

async function writeLog(text, logLevel) {
    const path = process.env.LOGS_PATH;
    const maxLength = process.env.MAX_ERRORS_IN_LOG || 100;

    if (path) {
        const errorText = `${logLevel}: ${new Date().toUTCString()} ${text} ${END_ERROR}`;
        const fileContent = await fs.readFile(path, {
            encoding: 'utf-8',
            flag: 'a+',
        });
        const errors = fileContent.split(os.EOL);

        while (errors.length > maxLength) {
            errors.shift();
        }

        errors.push(errorText);
        errors.filter(Boolean);

        return fs.writeFile(path, errors.join(os.EOL), {
            encoding: 'utf-8',
            flag: 'w',
        });
    }
}

module.exports = function logMessage(error, logLevel = 'info') {
    if (process.env.NODE_ENV === 'development') {
        switch (logLevel) {
            case 'info':
                console.log(error);
                break;
            case 'warning':
                console.warn(error);
                break;
            case 'error':
                console.error(error);
                break;
            default:
                console.log(error);
        }
    }

    writeLog(error.toString(), logLevel);
}
