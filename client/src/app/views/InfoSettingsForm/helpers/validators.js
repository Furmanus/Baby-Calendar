import {INFO_SETTINGS_FORM_CHILD_NAME_INPUT_MAX, INFO_SETTINGS_FORM_CHILD_NAME_INPUT_MIN} from '../constants/form';
import {infoSettingsTranslations} from '../constants/infoSettingsTranslations';
import dayjs from 'dayjs';

export function validateInfoSettingsChildName(value) {
    if (value.length < INFO_SETTINGS_FORM_CHILD_NAME_INPUT_MIN) {
        return infoSettingsTranslations.en.ChildNameInputMinLength;
    } else if (value.length > INFO_SETTINGS_FORM_CHILD_NAME_INPUT_MAX) {
        return infoSettingsTranslations.en.ChildNameInputMaxLength;
    }

    return null;
}
export function validateInfoSettingsBirthDate(value) {
    if (!dayjs(value, 'YYYY-MM-DD', true).isValid()) {
        return infoSettingsTranslations.en.BirthDateInvalidDateFormat;
    } else if (dayjs().diff(value) < 0) {
        return infoSettingsTranslations.en.BirthDatePastToday;
    }

    return null;
}
