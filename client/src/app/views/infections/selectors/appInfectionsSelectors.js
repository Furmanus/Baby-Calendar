function getInfectionsState(state) {
    return state.infections;
}

export function getInfectionsEntriesSelector(state) {
    return getInfectionsState(state).infectionsEntries;
}

export function isFetchingInfectionsEntriesSelector(state) {
    return getInfectionsState(state).isFetchingInfectionsEntries;
}

export function isSubmittingFormSelector(state) {
    return getInfectionsState(state).isSubmittingForm;
}

export function isDeletingInfectionEntrySelector(state) {
    return getInfectionsState(state).isDeletingEntry;
}
