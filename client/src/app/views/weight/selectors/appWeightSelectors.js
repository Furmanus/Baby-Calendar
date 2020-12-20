function getAppWeightState(state) {
    return state.weight;
}

export function getAppWeightEntriesSelector(state) {
    return getAppWeightState(state).weightEntries;
}

export function isFetchingWeightEntriesSelector(state) {
    return getAppWeightState(state).isFetchingWeightEntries;
}
export function isSubmittingChildWeightFormSelector(state) {
    return getAppWeightState(state).isSubmittingWeightEntries;
}
export function isDeletingChildWeightEntrySelector(state) {
    return getAppWeightState(state).isDeletingWeightEntry;
}
