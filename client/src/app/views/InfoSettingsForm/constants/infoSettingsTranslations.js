import {INFO_SETTINGS_FORM_CHILD_NAME_INPUT_MAX, INFO_SETTINGS_FORM_CHILD_NAME_INPUT_MIN, INFO_SETTINGS_IMAGE_MAX_SIZE} from './form';

export const infoSettingsTranslations = {
    en: {
        InfoSettingsFormHeading: 'Child data',
        ChildNameInputLabel: 'Child name',
        ChildNameInputHint: `{count}/${INFO_SETTINGS_FORM_CHILD_NAME_INPUT_MAX} characters`,
        BirthDateInputLabel: 'Birth date',
        BirthDateInputHint: 'Select birth date',
        SubmitButton: 'Submit',
        UploadButton: 'Upload photo',
        UploadHint: `Upload photo of your child, ${INFO_SETTINGS_IMAGE_MAX_SIZE / 1024} kilobytes allowed (optional)`,
        UploadLabel: 'Child photo',
        // form errors
        ChildNameInputMinLength: `You have to use at least ${INFO_SETTINGS_FORM_CHILD_NAME_INPUT_MIN} characters`,
        ChildNameInputMaxLength: `You have to use no more than ${INFO_SETTINGS_FORM_CHILD_NAME_INPUT_MAX} characters`,
        BirthDateInvalidDateFormat: 'Invalid date format',
        BirthDatePastToday: 'Can\'t set future date',
        ImageSizeTooBig: `Image size too big, max ${INFO_SETTINGS_IMAGE_MAX_SIZE / 1024} kilobytes are allowed`,
    },
};
