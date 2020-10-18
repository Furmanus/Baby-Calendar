import {loginTranslations} from './translations';
// TODO change to settings
const LANG = 'en';

export const loginSubmitErrorCodeToMessageMap = new Proxy({
    1001: loginTranslations[LANG].RegisterLoginTooShort,
    1002: loginTranslations[LANG].RegisterLoginTooLong,
    1003: loginTranslations[LANG].RegisterPasswordTooShort,
    1004: loginTranslations[LANG].RegisterPasswordTooLong,
    1005: loginTranslations[LANG].RegisterPasswordInvalidCharacters,
    1000: loginTranslations[LANG].LoginWrongUserOrPassword,
    1008: loginTranslations[LANG].LoginMissingRequiredFields,
    1009: loginTranslations[LANG].RegisterUserAlreadyExists,
}, {
    get(target, p) {
        if (p in target) {
            return target[p];
        }

        return loginTranslations[LANG].UnknownError;
    },
});
export const loginSubmitErrorCodeToComponentStateFields = new Proxy({
    1000: ['loginInputHasError', 'passwordInputHasError'],
    1008: ['loginInputHasError', 'passwordInputHasError'],
    1009: ['loginInputHasError'],
}, {
    get(target, property) {
        if (property in target) {
            return target[property];
        }

        return [];
    },
});

