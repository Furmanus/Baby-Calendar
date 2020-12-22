import {
    FETCH_INOCULATIONS_ENTRIES,
    FETCH_INOCULATIONS_ENTRIES_FAILURE,
    FETCH_INOCULATIONS_ENTRIES_SUCCESS,
} from '../contants/actionTypes';
import {fetchChildInoculationsApi} from '../../../../api/api';

export function fetchInoculationsEntriesAction() {
    return async dispatch => {
        dispatch({
            type: FETCH_INOCULATIONS_ENTRIES,
        });

        try {
            const {data} = await fetchChildInoculationsApi();

            dispatch(fetchInoculationsEntriesSuccess(data));
        } catch (e) {
            dispatch(fetchInoculationsEntriesFailure());
        }
    };
}

function fetchInoculationsEntriesSuccess(inoculationsEntries) {
    return {
        type: FETCH_INOCULATIONS_ENTRIES_SUCCESS,
        inoculationsEntries,
    };
}

function fetchInoculationsEntriesFailure() {
    return {
        type: FETCH_INOCULATIONS_ENTRIES_FAILURE,
    };
}
