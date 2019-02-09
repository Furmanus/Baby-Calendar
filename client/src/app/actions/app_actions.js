import {
    CHANGE_ACTIVE_TAB,
    DELETE_USER_RECORD,
    DELETE_USER_RECORD_FAILURE,
    DELETE_USER_RECORD_SUCCESS,
    FETCH_USER_DATA,
    FETCH_USER_DATA_FAILURE,
    FETCH_USER_DATA_SUCCESS,
    HIDE_ERROR,
    LOGOUT,
    LOGOUT_FAILURE,
    LOGOUT_SUCCESS,
    REPLACE_USER_DATA,
    REPLACE_USER_DATA_FAILURE,
    REPLACE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA,
    UPDATE_USER_DATA_FAILURE,
    UPDATE_USER_DATA_SUCCESS
} from '../constants/app_actions';
import {
    logout as apiLogout,
    fetchUserData as apiFetchUserData,
    updateUserData as apiUpdateUserData,
    deleteUserData as apiDeleteUserData,
    replaceUserData as apiReplaceUserData
} from '../../api/api';
import {navigateTo} from '../../common/helpers/helpers';
import {
    INFO,
    SETTINGS
} from '../constants/app_tabs';

export function logout() {
    return async dispatch => {
        dispatch({
            type: LOGOUT
        });

        try {
            const response = await apiLogout();

            dispatch(logoutSuccess(response));
        } catch (err) {
            dispatch(logoutFailure(err));
            console.error(err);
        }
    };
}
function logoutSuccess(response) {
    navigateTo('/login');

    return {
        type: LOGOUT_SUCCESS
    };
}
function logoutFailure(err) {
    //TODO show alert
    return {
        type: LOGOUT_FAILURE
    };
}
export function fetchUserData() {
    return async dispatch => {
        dispatch({
            type: FETCH_USER_DATA
        });
        try {
            const userData = await apiFetchUserData();
            dispatch(fetchUserDataSuccess(userData));
        } catch (err) {
            dispatch(fetchUserDataFailure(err));
        }
    };
}
function fetchUserDataSuccess(userData) {
    const {
        childName,
        birthDate: birthdate,
        childWeightEntries,
        childPoopsEntries,
        childInoculationsEntries,
        childInfectionsEntries,
        childNotesEntries,
        imageData
    } = userData;

    return {
        type: FETCH_USER_DATA_SUCCESS,
        activeTab: childName && birthdate ? INFO : SETTINGS,
        childName,
        birthdate,
        childWeightEntries,
        childPoopsEntries,
        childInoculationsEntries,
        childInfectionsEntries,
        childNotesEntries,
        imageData
    };
}
function fetchUserDataFailure(err) {
    return {
        type: FETCH_USER_DATA_FAILURE,
        error: err
    }
}
export function updateUserData(data) {
    return async dispatch => {
        dispatch({
            type: UPDATE_USER_DATA
        });

        try {
            const response = await apiUpdateUserData(data);
            dispatch(updateUserDataSuccess(response));
        } catch (err) {
            dispatch(updateUserDataFailure(err));
        }
    };
}
function updateUserDataSuccess(data) {
    return {
        type: UPDATE_USER_DATA_SUCCESS,
        childName: data.childName,
        birthdate: data.birthDate,
        childWeightEntries: data.childWeightEntries,
        childPoopEntries: data.childPoopsEntries,
        childInoculationsEntries: data.childInoculationsEntries,
        childInfectionsEntries: data.childInfectionsEntries,
        childNotesEntries: data.childNotesEntries,
        imageData: data.imageData
    };
}
function updateUserDataFailure(err) {
    return {
        type: UPDATE_USER_DATA_FAILURE,
        error: err
    };
}
export function changeActiveTab(tab) {
    return {
        type: CHANGE_ACTIVE_TAB,
        tab
    };
}
export function deleteUserDataRecord(data) {
    return async dispatch => {
        dispatch({
            type: DELETE_USER_RECORD,
        });

        try {
            const response = await apiDeleteUserData(data);
            dispatch(deleteUserDataRecordSuccess(response));
        } catch (err) {
            dispatch(deleteUserDataRecordFailure(err));
        }
    };
}
function deleteUserDataRecordSuccess(data) {
    return {
        type: DELETE_USER_RECORD_SUCCESS,
        childName: data.childName,
        birthdate: data.birthDate,
        childWeightEntries: data.childWeightEntries,
        childPoopEntries: data.childPoopsEntries,
        childInoculationsEntries: data.childInoculationsEntries,
        childInfectionsEntries: data.childInfectionsEntries,
        childNotesEntries: data.childNotesEntries,
        imageData: data.imageData
    };
}
function deleteUserDataRecordFailure(error) {
    return {
        type: DELETE_USER_RECORD_FAILURE,
        error
    };
}
export function replaceUserData(data) {
    return async dispatch => {
        dispatch({
            type: REPLACE_USER_DATA
        });

        try {
            const response = await apiReplaceUserData(data);
            dispatch(replaceUserDataSuccess(response));
        } catch (err) {
            dispatch(replaceUserDataFailure(err));
        }
    };
}
function replaceUserDataSuccess(data) {
    return {
        type: REPLACE_USER_DATA_SUCCESS,
        childName: data.childName,
        birthdate: data.birthDate,
        childWeightEntries: data.childWeightEntries,
        childPoopEntries: data.childPoopsEntries,
        childInoculationsEntries: data.childInoculationsEntries,
        childInfectionsEntries: data.childInfectionsEntries,
        childNotesEntries: data.childNotesEntries,
    };
}
function replaceUserDataFailure(error) {
    return {
        type: REPLACE_USER_DATA_FAILURE,
        error
    };
}
export function hideError() {
    return {
        type: HIDE_ERROR
    };
}