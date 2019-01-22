const cloudinary = require('cloudinary');
const config = require('../config/config');

exports.initConfig = function() {
    cloudinary.v2.config({
        cloud_name: config.cloudinaryCloudName,
        api_key: config.cloudinaryApiKey,
        api_secret: config.cloudinaryApiSecret
    });
};
exports.removeImage = async function(publicId) {
    return await cloudinary.v2.uploader.destroy(publicId);
};