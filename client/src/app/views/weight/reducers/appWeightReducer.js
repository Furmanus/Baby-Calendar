import {
    FETCH_WEIGHT_DATA_FAILURE,
    FETCH_WEIGHT_DATA_SUCCESS,
    FETCH_WEIGHT_DATA,
    SUBMIT_CHILD_WEIGHT_FORM,
    SUBMIT_CHILD_WEIGHT_FORM_SUCCESS,
    SUBMIT_CHILD_WEIGHT_FORM_FAILURE,
    DELETE_WEIGHT_ENTRY_CONFIRMED,
    DELETE_WEIGHT_ENTRY_ATTEMPT_SUCCESS, DELETE_WEIGHT_ENTRY_ATTEMPT_FAILURE,
} from '../constants/actionTypes';

const initialState = {
    weightEntries: null,
    isFetchingWeightEntries: false,
    isSubmittingWeightEntries: false,
    isDeletingWeightEntry: false,
};

export function appWeightReducer(state = initialState, action) {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case FETCH_WEIGHT_DATA:
            return {
                ...state,
                isFetchingWeightEntries: true,
            };
        case FETCH_WEIGHT_DATA_SUCCESS:
            return {
                ...state,
                isFetchingWeightEntries: false,
                weightEntries: action.weightEntries,
            };
        case FETCH_WEIGHT_DATA_FAILURE:
            return {
                ...state,
                isFetchingWeightEntries: false,
            };
        case SUBMIT_CHILD_WEIGHT_FORM:
            return {
                ...state,
                isSubmittingWeightEntries: true,
            };
        case SUBMIT_CHILD_WEIGHT_FORM_SUCCESS:
            return {
                ...state,
                isSubmittingWeightEntries: false,
                weightEntries: action.weightEntries,
            };
        case SUBMIT_CHILD_WEIGHT_FORM_FAILURE:
            return {
                ...state,
                isSubmittingWeightEntries: false,
            };
        case DELETE_WEIGHT_ENTRY_CONFIRMED:
            return {
                ...state,
                isDeletingWeightEntry: true,
            };
        case DELETE_WEIGHT_ENTRY_ATTEMPT_SUCCESS:
            return {
                ...state,
                weightEntries: action.weightEntries,
                isDeletingWeightEntry: false,
            };
        case DELETE_WEIGHT_ENTRY_ATTEMPT_FAILURE:
            return {
                ...state,
                isDeletingWeightEntry: false,
            };
        default:
            return state;
    }
}
