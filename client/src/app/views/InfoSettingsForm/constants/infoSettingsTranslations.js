import {INFO_SETTINGS_FORM_CHILD_NAME_INPUT_MAX, INFO_SETTINGS_FORM_CHILD_NAME_INPUT_MIN} from './form';

export const infoSettingsTranslations = {
    en: {
        InfoSettingsFormHeading: 'Child data',
        ChildNameInputLabel: 'Child name',
        ChildNameInputHint: `{count}/${INFO_SETTINGS_FORM_CHILD_NAME_INPUT_MAX} characters`,
        BirthDateInputLabel: 'Birth date',
        BirthDateInputHint: 'Select birth date',
        SubmitButton: 'Submit',
        UploadButton: 'Upload photo',
        UploadHint: 'Upload photo of your child (optional)',
        // form errors
        ChildNameInputMinLength: `You have to use at least ${INFO_SETTINGS_FORM_CHILD_NAME_INPUT_MIN} characters`,
        ChildNameInputMaxLength: `You have to use no more than ${INFO_SETTINGS_FORM_CHILD_NAME_INPUT_MAX} characters`,
        BirthDateInvalidDateFormat: 'Invalid date format',
        BirthDatePastToday: 'Can\'t set future date',
    },
};
