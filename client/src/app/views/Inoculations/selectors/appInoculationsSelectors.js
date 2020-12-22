function getInoculationsState(state) {
    return state.inoculations;
}

export function isFetchingInoculationsEntriesSelector(state) {
    return getInoculationsState(state).isFetchingInoculationsEntries;
}

export function getInoculationsEntriesSelector(state) {
    return getInoculationsState(state).inoculationsEntries;
}
