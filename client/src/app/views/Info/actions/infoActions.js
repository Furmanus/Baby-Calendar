import {FETCH_CHILD_DATA, FETCH_CHILD_DATA_FAILURE, FETCH_CHILD_DATA_SUCCESS} from '../constants/action_types';
import {fetchChildDataApi} from '../../../../api/api';

export function fetchChildInfoAction() {
    return async dispatch => {
        dispatch({
            type: FETCH_CHILD_DATA,
        });

        try {
            const data = await fetchChildDataApi();

            dispatch(fetchChildInfoSuccessAction(data));
        } catch(e) {
            dispatch(fetchChildInfoFailureAction())
        }
    };
}
function fetchChildInfoSuccessAction(data) {
    return {
        type: FETCH_CHILD_DATA_SUCCESS,
        childName: data.childName,
        birthDate: data.birthDate,
        childImage: data.imageData,
    };
}
function fetchChildInfoFailureAction() {
    return {
        type: FETCH_CHILD_DATA_FAILURE,
    };
}
