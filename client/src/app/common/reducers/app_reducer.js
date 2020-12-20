import {
    TOGGLE_EXPAND_MENU_ACTION,
    FETCH_CHILD_DATA,
    FETCH_CHILD_DATA_SUCCESS,
    FETCH_CHILD_DATA_FAILURE,
    SHOW_SNACKBAR_POPUP,
    HIDE_SNACKBAR_POPUP,
    RESET_SNACKBAR_POPUP,
    OPEN_CONFIRM_MODAL, CLOSE_CONFIRM_MODAL
} from '../constants/app_actions';

const username = window.babyCalendarAppUser || 'anonymous';

if (window.babyCalendarAppUser) {
    delete window.babyCalendarAppUser;
}

export const initialState = {
    username: username,
    isMenuExpanded: false,
    isFetchingUserData: false,
    childName: null,
    birthDate: null,
    childImageUrl: null,
    isSnackBarPopupOpen: false,
    snackBarPopupText: null,
    snackBarPopupHideDuration: 2000,
    snackBarPopupMode: 'info',
    snackBarPopupExitCallback: () => {},
    confirmModalConfig: null,
};

export function appReducer(state = initialState, action) {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case TOGGLE_EXPAND_MENU_ACTION:
            return {
                ...state,
                isMenuExpanded: !state.isMenuExpanded,
            };
        case FETCH_CHILD_DATA:
            return {
                ...state,
                isFetchingUserData: true,
            };
        case FETCH_CHILD_DATA_SUCCESS:
            return {
                ...state,
                childName: action.childName,
                birthDate: action.birthDate,
                childImageUrl: action.childImage,
                isFetchingUserData: false,
            };
        case FETCH_CHILD_DATA_FAILURE:
            return {
                ...state,
                isFetchingUserData: false,
            };
        case SHOW_SNACKBAR_POPUP:
            return {
                ...state,
                isSnackBarPopupOpen: true,
                snackBarPopupText: action.text,
                snackBarPopupMode: action.mode,
                snackBarPopupHideDuration: action.hideDuration,
                snackBarPopupExitCallback: action.callback,
            };
        case HIDE_SNACKBAR_POPUP:
            return {
                ...state,
                isSnackBarPopupOpen: false,
            };
        case RESET_SNACKBAR_POPUP:
            return {
                ...state,
                snackBarPopupText: null,
                snackBarPopupMode: 'info',
                snackBarPopupExitCallback: () => {},
                snackBarPopupHideDuration: 2000,

            };
        case OPEN_CONFIRM_MODAL:
            return {
                ...state,
                confirmModalConfig: action.confirmModalConfig,
            };
        case CLOSE_CONFIRM_MODAL:
            return {
                ...state,
                confirmModalConfig: null,
            };
        default:
            return state;
    }
}
