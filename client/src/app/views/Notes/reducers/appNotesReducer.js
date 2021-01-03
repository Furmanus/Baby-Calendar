const initialState = {
    isFetchingNotesEntries: false,
    notesEntries: null,
};

export function appNotesReducer(state = initialState, action) {
    if (!action) {
        return state;
    }

    switch (action.type) {
        default:
            return state;
    }
}
