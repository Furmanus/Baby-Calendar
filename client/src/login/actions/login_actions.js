import {
    LOGIN_CHANGE_LOGIN_INPUT_ERROR,
    LOGIN_CHANGE_LOGIN_INPUT_VALUE,
    LOGIN_CHANGE_LOGIN_PASSWORD_INPUT_VALUE,
    LOGIN_CHANGE_TAB,
    lOGIN_CHANGE_LOGIN_PASSWORD_INPUT_ERROR,
    LOGIN_CHANGE_LOGIN_INPUT_ERROR_HINT,
    LOGIN_CHANGE_PASSWORD_INPUT_ERROR_HINT,
    LOGIN_SUBMIT,
    LOGIN_SUBMIT_SUCCESS,
    LOGIN_SUBMIT_ERROR
} from '../constants/actions_constants';
import {loginSubmit as apiLoginSubmit} from '../../api/api';

export function changeTab(tab) {
    return {
        type: LOGIN_CHANGE_TAB,
        tab
    };
}
export function changeLoginInputValue(value) {
    return {
        type: LOGIN_CHANGE_LOGIN_INPUT_VALUE,
        loginInputValue: value
    };
}
export function changeLoginPasswordInputValue(value) {
    return {
        type: LOGIN_CHANGE_LOGIN_PASSWORD_INPUT_VALUE,
        loginPasswordValue: value
    };
}
export function changeLoginInputErrorState(status) {
    return {
        type: LOGIN_CHANGE_LOGIN_INPUT_ERROR,
        status
    };
}
export function changeLoginPasswordInputErrorState(status) {
    return {
        type: lOGIN_CHANGE_LOGIN_PASSWORD_INPUT_ERROR,
        status
    };
}
export function changeLoginInputErrorHint(hint) {
    return {
        type: LOGIN_CHANGE_LOGIN_INPUT_ERROR_HINT,
        hint
    };
}
export function changeLoginPasswordInputErrorHint(hint) {
    return {
        type: LOGIN_CHANGE_PASSWORD_INPUT_ERROR_HINT,
        hint
    };
}
export function loginSubmit(formData) {
    return dispatch => {
        dispatch({
            type: LOGIN_SUBMIT
        });

        apiLoginSubmit(formData).then(response => {
            dispatch(loginSubmitSuccess(response));
        }).catch(error => {
            dispatch(loginSubmitError(error));
        });
    }
}
function loginSubmitSuccess() {
    setTimeout(() => {
        window.location = '/dashboard';
    }, 1000);
    return {
        type: LOGIN_SUBMIT_SUCCESS
    };
}
function loginSubmitError(error) {
    return {
        type: LOGIN_SUBMIT_ERROR,
        loginInputErrorState: 'error',
        loginInputPasswordErrorState: 'error',
        loginInputErrorHint: '',
        loginPasswordErrorHint: error.message
    };
}