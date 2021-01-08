import {
    DELETE_NOTE_ENTRY_CONFIRMED,
    DELETE_NOTE_ENTRY_FAILURE,
    DELETE_NOTE_ENTRY_SUCCESS,
    FETCH_NOTES_ENTRIES,
    FETCH_NOTES_ENTRIES_FAILURE,
    FETCH_NOTES_ENTRIES_SUCCESS,
    SUBMIT_NOTES_FORM,
    SUBMIT_NOTES_FORM_FAILURE,
    SUBMIT_NOTES_FORM_SUCCESS,
} from '../constants/constants';

const initialState = {
    isFetchingNotesEntries: false,
    notesEntries: null,
    isSubmittingCreateForm: false,
    isDeletingEntry: false,
};

export function appNotesReducer(state = initialState, action) {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case FETCH_NOTES_ENTRIES:
            return {
                ...state,
                isFetchingNotesEntries: true,
            };
        case FETCH_NOTES_ENTRIES_SUCCESS:
            return {
                ...state,
                isFetchingNotesEntries: false,
                notesEntries: action.notesEntries,
            };
        case FETCH_NOTES_ENTRIES_FAILURE:
            return {
                ...state,
                isFetchingNotesEntries: false,
            };
        case SUBMIT_NOTES_FORM:
            return {
                ...state,
                isSubmittingCreateForm: true,
            };
        case SUBMIT_NOTES_FORM_SUCCESS:
            return {
                ...state,
                isSubmittingCreateForm: false,
                notesEntries: action.notesEntries,
            };
        case SUBMIT_NOTES_FORM_FAILURE:
            return {
                ...state,
                isSubmittingCreateForm: false,
            };
        case DELETE_NOTE_ENTRY_CONFIRMED:
            return {
                ...state,
                isDeletingEntry: true,
            };
        case DELETE_NOTE_ENTRY_SUCCESS:
            return {
                ...state,
                isDeletingEntry: false,
                notesEntries: action.notesEntries,
            };
        case DELETE_NOTE_ENTRY_FAILURE:
            return {
                ...state,
                isDeletingEntry: false,
            };
        default:
            return state;
    }
}
