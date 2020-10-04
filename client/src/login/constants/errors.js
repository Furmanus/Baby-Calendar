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
}, {
    get(target, p) {
        if (p in target) {
            return target[p];
        }

        return loginTranslations[LANG].UnknownError;
    }
});
