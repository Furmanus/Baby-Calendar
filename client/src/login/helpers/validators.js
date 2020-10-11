import {LOGIN_MAX_LENGTH, LOGIN_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH} from '../constants/login_form';
import {loginTranslations} from '../constants/translations';
import {applicationConfig} from '../../common/config/config';

export function validateUserLogin(value) {
    const trimmedValue = value.trim();

    if (trimmedValue.length < LOGIN_MIN_LENGTH) {
        return loginTranslations[applicationConfig.lang].RegisterLoginTooShort;
    }
    if (trimmedValue.length > LOGIN_MAX_LENGTH) {
        return loginTranslations[applicationConfig.lang].RegisterLoginTooLong;
    }

    return false;
}
export function validateUserPassword(value) {
    if (!/^[a-zA-Z]+[0-9]+/g.test(value)) {
        return loginTranslations[applicationConfig.lang].RegisterPasswordInvalidCharacters;
    }
    if (value.length < PASSWORD_MIN_LENGTH) {
        return loginTranslations[applicationConfig.lang].RegisterPasswordTooShort;
    }
    if (value.length > PASSWORD_MAX_LENGTH) {
        return loginTranslations[applicationConfig.lang].RegisterPasswordTooLong;
    }

    return false;
}
export function validateRepeatPassword(value, passwordValue) {
    if (value !== passwordValue) {
        return loginTranslations[applicationConfig.lang].RepeatPasswordWrong;
    }

    return false;
}
