import {
    TOGGLE_EXPAND_MENU_ACTION,
    FETCH_CHILD_DATA,
    FETCH_CHILD_DATA_SUCCESS,
    FETCH_CHILD_DATA_FAILURE,
    SHOW_SNACKBAR_POPUP,
    HIDE_SNACKBAR_POPUP, RESET_SNACKBAR_POPUP
} from '../constants/app_actions';
import {fetchChildDataApi} from '../../../api/api';

export function toggleExpandMenuAction() {
    return {
        type: TOGGLE_EXPAND_MENU_ACTION,
    };
}
export function fetchChildInfoAction() {
    return async dispatch => {
        dispatch({
            type: FETCH_CHILD_DATA,
        });

        try {
            const data = await fetchChildDataApi();

            dispatch(fetchChildInfoSuccessAction(data));
        } catch(e) {
            dispatch(fetchChildInfoFailureAction())
        }
    };
}
function fetchChildInfoSuccessAction(data) {
    return {
        type: FETCH_CHILD_DATA_SUCCESS,
        childName: data.childName,
        birthDate: data.birthDate,
        childImage: data.imageData,
    };
}
function fetchChildInfoFailureAction() {
    return {
        type: FETCH_CHILD_DATA_FAILURE,
    };
}
export function showSnackBarDialog(config) {
    const {
        text,
        mode,
        hideDuration,
        callback,
    } = config;

    return {
        type: SHOW_SNACKBAR_POPUP,
        text,
        mode,
        hideDuration,
        callback,
    };
}
export function hideSnackBarDialog() {
    return {
        type: HIDE_SNACKBAR_POPUP,
    };
}
export function resetSnackBarDialogState() {
    return {
        type: RESET_SNACKBAR_POPUP,
    };
}
