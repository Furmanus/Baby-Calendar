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
