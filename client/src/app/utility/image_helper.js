import {config} from '../../config/config';

export function prepareImageUrl(url, originalWidth, originalHeight) {
    const {
        defaultImageWidth,
        defaultImageHeight
    } = config;
    const splitUrl = url.split('/');
    const vertical = originalWidth > originalHeight;
    const ratio = vertical ? originalHeight / originalWidth : originalWidth / originalHeight;
    const newWidth = vertical ? defaultImageWidth : Math.floor(defaultImageHeight * ratio);
    const newHeight = vertical ? Math.floor(defaultImageWidth * ratio) : defaultImageHeight;

    if (splitUrl.length) {
        splitUrl.splice(splitUrl.length - 2, 0, `w_${newWidth},h_${newHeight},c_scale`);
    }

    return splitUrl.join('/');
}