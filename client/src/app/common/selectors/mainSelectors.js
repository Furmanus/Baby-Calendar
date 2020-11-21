function getMainStore(state) {
    return state.main;
}

export function isMenuExpandedSelector(state) {
    return getMainStore(state).isMenuExpanded;
}
export function isFetchingChildInfoSelector(state) {
    return getMainStore(state).isFetchingUserData;
}
export function getChildNameSelector(state) {
    return getMainStore(state).childName;
}
export function getChildBirthDateSelector(state) {
    return getMainStore(state).birthDate;
}
export function getChildImageUrlSelector(state) {
    return getMainStore(state).childImageUrl;
}
export function isSnackBarPopupOpenSelector(state) {
    return getMainStore(state).isSnackBarPopupOpen;
}
export function getSnackBarMenuModeSelector(state) {
    return getMainStore(state).snackBarPopupMode;
}
export function getSnackBarMenuTextSelector(state) {
    return getMainStore(state).snackBarPopupText;
}
export function getSnackBarPopupExitCallback(state) {
    return getMainStore(state).snackBarPopupExitCallback;
}
export function getSnackBarPopupHideDuration(state) {
    return getMainStore(state).snackBarPopupHideDuration;
}
