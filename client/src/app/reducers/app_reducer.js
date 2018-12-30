import {
    CHANGE_ACTIVE_TAB, DELETE_USER_RECORD, DELETE_USER_RECORD_FAILURE, DELETE_USER_RECORD_SUCCESS,
    FETCH_USER_DATA,
    FETCH_USER_DATA_FAILURE,
    FETCH_USER_DATA_SUCCESS, HIDE_ERROR, REPLACE_USER_DATA, REPLACE_USER_DATA_FAILURE, REPLACE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA, UPDATE_USER_DATA_FAILURE, UPDATE_USER_DATA_SUCCESS
} from '../constants/app_actions';
import {INFO} from '../constants/app_tabs';
import {sortByDateCallback} from '../../common/helpers/helpers';

const username = window.babyCalendarAppUser || 'anonymous';

if (window.babyCalendarAppUser) {
    delete window.babyCalendarAppUser;
}

const initialState = {
    username: username,
    activeTab: INFO,
    isFetchingData: false,
    birthdate: undefined,
    childName: undefined,
    childWeightEntries: [],
    childPoopEntries: [],
    childInoculationsEntries: [],
    error: null,
    isSubmitting: false
};

export function appReducer(state = initialState, action) {
    let sortedWeightEntries;
    let sortedInoculaionEntries;
    let sortedPoopsEntries;

    switch (action.type) {
        case FETCH_USER_DATA:
            return {
                ...state,
                isFetchingData: true
            };
        case FETCH_USER_DATA_SUCCESS:
            sortedWeightEntries = action.childWeightEntries.slice().sort(sortByDateCallback);
            sortedInoculaionEntries = action.childInoculationsEntries.slice().sort(sortByDateCallback);
            sortedPoopsEntries = action.childPoopsEntries.slice().sort(sortByDateCallback);

            return {
                ...state,
                isFetchingData: false,
                birthdate: action.birthdate,
                childName: action.childName,
                childWeightEntries: sortedWeightEntries,
                childPoopEntries: sortedPoopsEntries,
                childInoculationsEntries: sortedInoculaionEntries,
                activeTab: action.activeTab
            };
        case FETCH_USER_DATA_FAILURE:
            return {
                ...state,
                isFetchingData: false,
                error: action.error
            };
        case UPDATE_USER_DATA:
            return {
                ...state,
                isFetchingData: true
            };
        case UPDATE_USER_DATA_SUCCESS:
            sortedWeightEntries = action.childWeightEntries.slice().sort(sortByDateCallback);
            sortedInoculaionEntries = action.childInoculationsEntries.slice().sort(sortByDateCallback);
            sortedPoopsEntries = action.childPoopEntries.slice().sort(sortByDateCallback);

            return {
                ...state,
                childName: action.childName,
                birthdate: action.birthdate,
                childWeightEntries: sortedWeightEntries,
                childPoopEntries: sortedPoopsEntries,
                childInoculationsEntries: sortedInoculaionEntries,
                isFetchingData: false
            };
        case UPDATE_USER_DATA_FAILURE:
            return {
                ...state,
                error: action.error,
                isFetchingData: false
            };
        case CHANGE_ACTIVE_TAB:
            return {
                ...state,
                activeTab: action.tab
            };
        case DELETE_USER_RECORD:
            return {
                ...state,
                isFetchingData: true
            };
        case DELETE_USER_RECORD_SUCCESS:
            sortedWeightEntries = action.childWeightEntries.slice().sort(sortByDateCallback);
            sortedInoculaionEntries = action.childInoculationsEntries.slice().sort(sortByDateCallback);
            sortedPoopsEntries = action.childPoopEntries.slice().sort(sortByDateCallback);

            return {
                ...state,
                isFetchingData: false,
                childName: action.childName,
                birthdate: action.birthdate,
                childWeightEntries: sortedWeightEntries,
                childPoopEntries: sortedPoopsEntries,
                childInoculationsEntries: sortedInoculaionEntries
            };
        case DELETE_USER_RECORD_FAILURE:
            return {
                ...state,
                isFetchingData: false,
                error: action.error
            };
        case REPLACE_USER_DATA:
            return {
                ...state,
                isFetchingData: true
            };
        case REPLACE_USER_DATA_SUCCESS:
            sortedWeightEntries = action.childWeightEntries.slice().sort(sortByDateCallback);
            sortedInoculaionEntries = action.childInoculationsEntries.slice().sort(sortByDateCallback);
            sortedPoopsEntries = action.childPoopEntries.slice().sort(sortByDateCallback);

            return {
                ...state,
                isFetchingData: false,
                childWeightEntries: sortedWeightEntries,
                childPoopEntries: sortedPoopsEntries,
                childInoculationsEntries: sortedInoculaionEntries
            };
        case REPLACE_USER_DATA_FAILURE:
            return {
                ...state,
                isFetchingData: false,
                error: action.error
            };
        case HIDE_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}