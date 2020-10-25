import {TOGGLE_EXPAND_MENU_ACTION} from '../constants/app_actions';

const username = window.babyCalendarAppUser || 'anonymous';

if (window.babyCalendarAppUser) {
    delete window.babyCalendarAppUser;
}

export const initialState = {
    username: username,
    isMenuExpanded: false,
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
        default:
            return state;
    }
}
