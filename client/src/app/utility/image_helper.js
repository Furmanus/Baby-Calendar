import {config} from '../../config/config';

export function prepareImageUrl(url) {
    // if (window.cloudinary) {
    //     return cloudinary.url(url, {
    //         width: `${config.maxImageWidth}px`,
    //         height: `${config.maxImageHeight}px`,
    //         crop: 'scale',
    //         quality: 100,
    //         radius: 'max',
    //         border: '4px solid black'
    //     });
    // }
    const splitUrl = url.split('/');

    if (splitUrl.length) {
        splitUrl.splice(splitUrl.length - 2, 0, `w_${config.maxImageWidth},h_${config.maxImageHeight},c_scale`);
    }

    return splitUrl.join('/');
}