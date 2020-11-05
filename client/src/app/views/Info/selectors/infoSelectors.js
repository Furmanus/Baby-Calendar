function getInfoState(state) {
    return state.info;
}
export function isFetchingChildInfoSelector(state) {
    return getInfoState(state).isFetchingUserData;
}
export function getChildNameSelector(state) {
    return getInfoState(state).childInfo;
}
export function getChildBirthDateSelector(state) {
    return getInfoState(state).birthDate;
}
export function getChildImageUrlSelector(state) {
    return getInfoState(state).childImageUrl;
}
