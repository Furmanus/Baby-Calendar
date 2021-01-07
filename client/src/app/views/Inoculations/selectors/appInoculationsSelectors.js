function getInoculationsState(state) {
    return state.inoculations;
}

export function isFetchingInoculationsEntriesSelector(state) {
    return getInoculationsState(state).isFetchingInoculationsEntries;
}

export function getInoculationsEntriesSelector(state) {
    return getInoculationsState(state).inoculationsEntries;
}
export function isSubmittingInoculationsFormSelector(state) {
    return getInoculationsState(state).isSubmittingForm;
}
export function isDeletingInoculationEntrySelector(state) {
    return getInoculationsState(state).isDeletingEntry;
}
