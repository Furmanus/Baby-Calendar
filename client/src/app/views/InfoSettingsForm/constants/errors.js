import {infoSettingsTranslations} from './infoSettingsTranslations';

export const infoSettingsErrorCodeToTextMap = new Proxy({
    1101: {
        text: infoSettingsTranslations.en.ImageTypeInvalid,
        field: 'childImage',
    },
}, {
    get(target, key) {
        if (key in target) {
            return target[key];
        }

        return {
            text: infoSettingsTranslations.en.UnknownError,
            field: null,
        };
    }
});
