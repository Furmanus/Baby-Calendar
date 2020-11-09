const AWS = require('aws-sdk');
const {v4: uuid} = require('uuid');

class AwsHelper {
    #bucketName = process.env.AWS_S3_BUCKETNAME;
    #s3 = new AWS.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    });

    uploadFile(file) {
        const filename = this.prepareFileName(file);
        const params = {
            Bucket: this.#bucketName,
            Key: filename,
            Body: file.buffer,
        };
        return new Promise((resolve, reject) => {
            this.#s3.upload(params, (error, data) => {
                if (error) {
                    reject(error);
                }

                resolve(data.Location);
            });
        });
    }

    prepareFileName(file) {
        const extension = file.originalname.match(/.(\w+)$/)[1];

        if (extension) {
            return `${uuid()}.${extension}`
        }

        return file.originalname;
    }
}

module.exports = new AwsHelper();
