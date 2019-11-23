export const config = {
    cloudName: process.env.CLOUD_NAME,
    uploadPreset: process.env.UPLOAD_PRESET,
    sources: ['local', 'url', 'camera'],
    multiple: false,
    maxFileSize: 5000000,
    defaultImageWidth: 250,
    defaultImageHeight: 333
};