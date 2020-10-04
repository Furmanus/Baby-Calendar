import {LOGIN_MAX_LENGTH, LOGIN_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH} from './login_form';

export const loginTranslations = {
    en: {
        LoginPageHeaderLogin: 'Login',
        LoginPageHeaderRegister: 'Register',
        // login input
        LoginPageLoginInputLabel: 'Login',
        LoginPageLoginInputHintLoginMode: 'Enter login',
        LoginPageLoginInputHintDefault: 'Use between 3-32 characters',
        // password input
        LoginPagePasswordInputLabel: 'Password',
        LoginPagePasswordInputLabelLoginMode: 'Enter password',
        LoginPagePasswordInputHintDefault: 'At least 6 characters',
        // repeat password input
        LoginPagePasswordRepeatInputLabel: 'Repeat password',
        LoginPagePasswordRepeatInputHintDefault: 'Repeat Password',
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
        RegisterPasswordInvalidCharacters: 'Password need to have at least one capital letter and one number',
        LoginWrongUserOrPassword: 'Wrong user name or password',
        LoginEmpty: 'Empty login field',
        PasswordEmpty: 'Empty password field',
        UnknownError: 'Temporary issue, please check later',
    }
};
