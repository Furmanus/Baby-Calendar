import {
    FETCH_CHILD_DATA,
    FETCH_CHILD_DATA_FAILURE,
    FETCH_CHILD_DATA_SUCCESS,
} from '../constants/action_types';

export const infoInitialState = {
    isFetchingUserData: false,
    childName: null,
    birthDate: null,
    childImageUrl: null,
};

export function infoReducer(state = infoInitialState, action) {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case FETCH_CHILD_DATA:
            return {
                ...state,
                isFetchingUserData: true,
            };
        case FETCH_CHILD_DATA_SUCCESS:
            return {
                ...state,
                childName: action.childName,
                birthDate: action.birthDate,
                childImageUrl: action.childImage,
                isFetchingUserData: false,
            };
        case FETCH_CHILD_DATA_FAILURE:
            return {
                ...state,
                isFetchingUserData: false,
            };
        default:
            return state;
    }
}
