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
    LOGIN_SUBMIT_SUCCESS, LOGIN_SUBMIT_ERROR
} from '../constants/actions_constants';

const initialState = {
    activePage: LOGIN,
    loginInputValue: '',
    loginPasswordValue: '',
    loginInputErrorState: null,
    loginInputPasswordErrorState: null,
    loginInputErrorHint: '',
    loginPasswordErrorHint: '',
    isSubmitting: false
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
        default:
            return state;
    }
}