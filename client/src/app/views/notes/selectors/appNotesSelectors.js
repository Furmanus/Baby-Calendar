function getAppNotesState(state) {
    return state.notes;
}

export function isFetchingNotesEntriesSelector(state) {
    return getAppNotesState(state).isFetchingNotesEntries;
}

export function getNotesEntriesSelector(state) {
    return getAppNotesState(state).notesEntries;
}

export function isSubmittingCreateFormSelector(state) {
    return getAppNotesState(state).isSubmittingCreateForm;
}

export function isDeletingNoteEntrySelector(state) {
    return getAppNotesState(state).isDeletingEntry;
}
