import {
    FETCH_INFECTION_ENTRIES,
    FETCH_INFECTION_ENTRIES_FAILURE,
    FETCH_INFECTION_ENTRIES_SUCCESS,
    SUBMIT_CREATE_INFECTIONS_FORM_FAILURE,
    SUBMIT_CREATE_INFECTIONS_FORM_SUCCESS,
    SUBMIT_CREATE_INFECTIONS_FORM,
    DELETE_INFECTION_ENTRY_ATTEMPT_CONFIRMED,
    DELETE_INFECTION_ENTRY_ATTEMPT_SUCCESS, DELETE_INFECTION_ENTRY_ATTEMPT_FAILURE,
} from '../constants/actionTypes';

const appInfectionInitialState = {
    isFetchingInfectionsEntries: false,
    infectionsEntries: null,
    isSubmittingForm: false,
    isDeletingEntry: false,
};

export function appInfectionsReducer(state = appInfectionInitialState, action) {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case FETCH_INFECTION_ENTRIES:
            return {
                ...state,
                isFetchingInfectionsEntries: true,
            };
        case FETCH_INFECTION_ENTRIES_SUCCESS:
            return {
                ...state,
                isFetchingInfectionsEntries: false,
                infectionsEntries: action.infectionsEntries,
            };
        case FETCH_INFECTION_ENTRIES_FAILURE:
            return {
                ...state,
                isFetchingInfectionsEntries: false,
            };
        case SUBMIT_CREATE_INFECTIONS_FORM:
            return {
                ...state,
                isSubmittingForm: true,
            };
        case SUBMIT_CREATE_INFECTIONS_FORM_SUCCESS:
            return {
                ...state,
                isSubmittingForm: false,
                infectionsEntries: action.infectionsEntries,
            };
        case SUBMIT_CREATE_INFECTIONS_FORM_FAILURE:
            return {
                ...state,
                isSubmittingForm: false,
            };
        case DELETE_INFECTION_ENTRY_ATTEMPT_CONFIRMED:
            return {
                ...state,
                isDeletingEntry: true,
            };
        case DELETE_INFECTION_ENTRY_ATTEMPT_SUCCESS:
            return {
                ...state,
                isDeletingEntry: false,
                infectionsEntries: action.infectionsEntries,
            };
        case DELETE_INFECTION_ENTRY_ATTEMPT_FAILURE:
            return {
                ...state,
                isDeletingEntry: false,
            };
        default:
            return state;
    }
}
