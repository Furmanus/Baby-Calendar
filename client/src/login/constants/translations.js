import {LOGIN_MAX_LENGTH, LOGIN_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH} from './login_form';

export const loginTranslations = {
    en: {
        LoginPageHeaderLogin: 'Login',
        LoginPageHeaderRegister: 'Register',
        // login input
        LoginPageLoginInputLabel: 'Login',
        LoginPageLoginInputHintLoginMode: ' ',
        LoginPageLoginInputHintDefault: `{count}/${LOGIN_MAX_LENGTH} Use at least ${LOGIN_MIN_LENGTH} characters`,
        // password input
        LoginPagePasswordInputLabel: 'Password',
        LoginPagePasswordInputLabelLoginMode: ' ',
        LoginPagePasswordInputHintDefault: `{count}/${PASSWORD_MAX_LENGTH} Use at least ${PASSWORD_MIN_LENGTH} characters`,
        // repeat password input
        LoginPagePasswordRepeatInputLabel: 'Repeat password',
        LoginPagePasswordRepeatInputHintDefault: 'Type exactly same password as above',
        // submit form buttons
        LoginPageLoginButton: 'Login',
        LoginPageRegisterButton: 'Register',
        // toggle login/register
        LoginPageRegisterAccountText: 'Don\'t have account?',
        LoginPageRegisterButtonText: 'Register here',
        LoginPageAlreadyHaveAccountText: 'Already have account?',
        LoginPageAlreadyHaveAccountButtonText: 'Login here',
        // form submit errors
        RegisterLoginTooShort: `Login too short, minimum ${LOGIN_MIN_LENGTH} characters are required`,
        RegisterLoginTooLong: `User name too long, maximum ${LOGIN_MAX_LENGTH} characters are allowed`,
        RegisterPasswordTooShort: `Password too short, minimum ${PASSWORD_MIN_LENGTH} characters are required`,
        RegisterPasswordTooLong: `Password too long, maximum ${PASSWORD_MAX_LENGTH} characters are allowed`,
        RegisterPasswordInvalidCharacters: 'Password need to have at least capital one letter and one number',
        LoginWrongUserOrPassword: 'Wrong user name or password',
        LoginMissingRequiredFields: 'Required field empty',
        RegisterUserAlreadyExists: 'User already exists',
        LoginEmpty: 'Empty login field',
        PasswordEmpty: 'Empty password field',
        RepeatPasswordWrong: 'Repeated password doesn\'t match above password',
        UnknownError: 'Temporary issue, please check later',
    }
};
