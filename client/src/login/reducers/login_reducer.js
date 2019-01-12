import {LOGIN} from '../constants/login_constants';
import {
    LOGIN_CHANGE_LOGIN_INPUT_ERROR,
    lOGIN_CHANGE_LOGIN_PASSWORD_INPUT_ERROR,
    LOGIN_CHANGE_LOGIN_INPUT_VALUE,
    LOGIN_CHANGE_LOGIN_PASSWORD_INPUT_VALUE,
    LOGIN_CHANGE_TAB,
    LOGIN_CHANGE_LOGIN_INPUT_ERROR_HINT,
    LOGIN_CHANGE_PASSWORD_INPUT_ERROR_HINT,
    LOGIN_SUBMIT,
    LOGIN_SUBMIT_SUCCESS,
    LOGIN_SUBMIT_ERROR,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    SHOW_REGISTER_FORM_ERROR,
    HIDE_REGISTER_FORM_ERROR,
    SET_REGISTER_LOGIN_VALIDATION,
    SET_REGISTER_PASSWORD_VALIDATION,
    SET_REGISTER_REPEAT_PASSWORD_VALIDATION,
    REGISTER_CHANGE_LOGIN_INPUT_STATE,
    REGISTER_CHANGE_PASSWORD_INPUT_STATE,
    REGISTER_CHANGE_REPEAT_PASSWORD_INPUT_STATE
} from '../constants/actions_constants';

const initialState = {
    activePage: LOGIN,
    loginInputValue: '',
    loginPasswordValue: '',
    loginInputErrorState: null,
    loginInputPasswordErrorState: null,
    loginInputErrorHint: '',
    loginPasswordErrorHint: '',
    isSubmitting: false,
    //REGISTER - change to more appriopriate names
    registerFormError: null,
    loginValidationState: null,
    passwordValidationState: null,
    repeatPasswordValidationState: null,
    loginInputState: '',
    passwordInputState: '',
    repeatPasswordInputState: ''
};

export function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_CHANGE_TAB:
            return {
                ...state,
                activePage: action.tab
            };
        case LOGIN_CHANGE_LOGIN_INPUT_VALUE:
            return {
                ...state,
                loginInputValue: action.loginInputValue
            };
        case LOGIN_CHANGE_LOGIN_PASSWORD_INPUT_VALUE:
            return {
                ...state,
                loginPasswordValue: action.loginPasswordValue
            };
        case LOGIN_CHANGE_LOGIN_INPUT_ERROR:
            return {
                ...state,
                loginInputErrorState: action.status
            };
        case lOGIN_CHANGE_LOGIN_PASSWORD_INPUT_ERROR:
            return {
                ...state,
                loginInputPasswordErrorState: action.status
            };
        case LOGIN_CHANGE_LOGIN_INPUT_ERROR_HINT:
            return {
                ...state,
                loginInputErrorHint: action.hint
            };
        case LOGIN_CHANGE_PASSWORD_INPUT_ERROR_HINT:
            return {
                ...state,
                loginPasswordErrorHint: action.hint
            };
        case LOGIN_SUBMIT:
            return {
                ...state,
                isSubmitting: true
            };
        case LOGIN_SUBMIT_SUCCESS:
            return {
                ...state,
                isSubmitting: false,
                loginInputErrorState: 'success',
                loginInputPasswordErrorState: 'success',
                loginInputErrorHint: '',
                loginPasswordErrorHint: '',
            };
        case LOGIN_SUBMIT_ERROR:
            return {
                ...state,
                isSubmitting: false,
                loginInputErrorState: action.loginInputErrorState,
                loginInputPasswordErrorState: action.loginInputPasswordErrorState,
                loginInputErrorHint: action.loginInputErrorHint,
                loginPasswordErrorHint: action.loginPasswordErrorHint,
            };
        case REGISTER_USER:
            return {
                ...state,
                isSubmitting: true,
                registerFormError: null
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isSubmitting: false,
                registerFormError: null,
                loginValidationState: 'success',
                passwordValidationState: 'success',
                repeatPasswordValidationState: 'success'
            };
        case REGISTER_USER_FAILURE:
            return {
                ...state,
                isSubmitting: false,
                registerFormError: action.error,
                loginValidationState: 'error',
                passwordValidationState: 'error',
                repeatPasswordValidationState: 'error'
            };
        case SHOW_REGISTER_FORM_ERROR:
            return {
                ...state,
                registerFormError: action.error
            };
        case HIDE_REGISTER_FORM_ERROR:
            return {
                ...state,
                registerFormError: null
            };
        case SET_REGISTER_LOGIN_VALIDATION:
            return {
                ...state,
                loginValidationState: action.state
            };
        case SET_REGISTER_PASSWORD_VALIDATION:
            return {
                ...state,
                passwordValidationState: action.state
            };
        case SET_REGISTER_REPEAT_PASSWORD_VALIDATION:
            return {
                ...state,
                repeatPasswordValidationState: action.state
            };
        case REGISTER_CHANGE_LOGIN_INPUT_STATE:
            return {
                ...state,
                loginInputState: action.value
            };
        case REGISTER_CHANGE_PASSWORD_INPUT_STATE:
            return {
                ...state,
                passwordInputState: action.value
            };
        case REGISTER_CHANGE_REPEAT_PASSWORD_INPUT_STATE:
            return {
                ...state,
                repeatPasswordInputState: action.value
            };
        default:
            return state;
    }
}