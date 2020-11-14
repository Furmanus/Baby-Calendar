import {TOGGLE_EXPAND_MENU_ACTION, FETCH_CHILD_DATA, FETCH_CHILD_DATA_SUCCESS, FETCH_CHILD_DATA_FAILURE} from '../constants/app_actions';

const username = window.babyCalendarAppUser || 'anonymous';

if (window.babyCalendarAppUser) {
    delete window.babyCalendarAppUser;
}

export const initialState = {
    username: username,
    isMenuExpanded: false,
    isFetchingUserData: false,
    childName: null,
    birthDate: null,
    childImageUrl: null,
};

export function appReducer(state = initialState, action) {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case TOGGLE_EXPAND_MENU_ACTION:
            return {
                ...state,
                isMenuExpanded: !state.isMenuExpanded,
            };
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
