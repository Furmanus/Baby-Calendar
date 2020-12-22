import {
    FETCH_INOCULATIONS_ENTRIES,
    FETCH_INOCULATIONS_ENTRIES_FAILURE,
    FETCH_INOCULATIONS_ENTRIES_SUCCESS,
    SUBMIT_INOCULATIONS_FORM, SUBMIT_INOCULATIONS_FORM_FAILURE,
    SUBMIT_INOCULATIONS_FORM_SUCCESS,
} from '../contants/actionTypes';

const initialState = {
    isFetchingInoculationsEntries: false,
    inoculationsEntries: null,
    isSubmittingForm: false,
    isDeletingEntry: false,
};

export function appInoculationsReducer(state = initialState, action) {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case FETCH_INOCULATIONS_ENTRIES:
            return {
                ...state,
                isFetchingInoculationsEntries: true,
            };
        case FETCH_INOCULATIONS_ENTRIES_SUCCESS:
            return {
                ...state,
                isFetchingInoculationsEntries: false,
                inoculationsEntries: action.inoculationsEntries,
            };
        case FETCH_INOCULATIONS_ENTRIES_FAILURE:
            return {
                ...state,
                isFetchingInoculationsEntries: false,
            };
        case SUBMIT_INOCULATIONS_FORM:
            return {
                ...state,
                isSubmittingForm: true,
            };
        case SUBMIT_INOCULATIONS_FORM_SUCCESS:
            return {
                ...state,
                isSubmittingForm: false,
                inoculationsEntries: action.inoculationsEntries,
            };
        case SUBMIT_INOCULATIONS_FORM_FAILURE:
            return {
                ...state,
                isSubmittingForm: false,
            };
        default:
            return state;
    }
}
