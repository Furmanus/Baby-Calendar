import {
    FETCH_INOCULATIONS_ENTRIES,
    FETCH_INOCULATIONS_ENTRIES_FAILURE,
    FETCH_INOCULATIONS_ENTRIES_SUCCESS,
} from '../contants/actionTypes';

const initialState = {
    isFetchingInoculationsEntries: false,
    inoculationsEntries: null,
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
        default:
            return state;
    }
}
