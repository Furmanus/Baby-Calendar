import {
    DELETE_INFECTION_ENTRY_ATTEMPT,
    DELETE_INFECTION_ENTRY_ATTEMPT_CONFIRMED,
    DELETE_INFECTION_ENTRY_ATTEMPT_FAILURE,
    DELETE_INFECTION_ENTRY_ATTEMPT_SUCCESS,
    FETCH_INFECTION_ENTRIES,
    FETCH_INFECTION_ENTRIES_FAILURE,
    FETCH_INFECTION_ENTRIES_SUCCESS,
    SUBMIT_CREATE_INFECTIONS_FORM,
    SUBMIT_CREATE_INFECTIONS_FORM_FAILURE,
    SUBMIT_CREATE_INFECTIONS_FORM_SUCCESS,
} from '../constants/actionTypes';
import {
    createDataEntry,
    deleteDataEntry,
    fetchChildInfectionsApi,
    replaceDataEntry,
} from '../../../../api/api';
import {closeConfirm, showConfirm, showSnackBarDialog} from '../../../common/actions/app_actions';
import {infectionsTranslations as translations} from '../constants/translations';

export function fetchInfectionEntriesAction() {
    return async dispatch => {
        dispatch({
            type: FETCH_INFECTION_ENTRIES,
        });

        try {
            const {data} = await fetchChildInfectionsApi();

            dispatch(fetchInfectionEntriesSuccess(data));
        } catch (error) {
            dispatch(fetchInfectionEntriesFailure());
        }
    }
}

function fetchInfectionEntriesSuccess(infectionsEntries) {
    return {
        type: FETCH_INFECTION_ENTRIES_SUCCESS,
        infectionsEntries,
    };
}

function fetchInfectionEntriesFailure() {
    return {
        type: FETCH_INFECTION_ENTRIES_FAILURE,
    };
}

export function submitInfectionsForm(mode, data, editedEntry) {
    return async dispatch => {
        let response;

        dispatch({
            type: SUBMIT_CREATE_INFECTIONS_FORM,
        });

        try {
            if (mode === 'create') {
                response = await createDataEntry({
                    childInfectionEntry: data,
                });
            } else if (mode === 'edit' && editedEntry) {
                response = await replaceDataEntry({
                    infectionEntry: data,
                    originalInfectionEntry: editedEntry,
                });
            }

            dispatch(submitInfectionsFormSuccess(response.data.childInfectionsEntries));
            dispatch(showSnackBarDialog({
                mode: 'success',
                text: mode === 'create' ? translations.en.CreateEntrySnackbarSuccess : translations.en.EditEntrySnackbarSuccess,
            }));
        } catch (error) {
            console.error(error);
            dispatch(submitInfectionsFormFailure());
            dispatch(showSnackBarDialog({
                mode: 'error',
                text: mode === 'create' ? translations.en.CreateEntrySnackbarFailure : translations.en.EditEntrySnackbarFailure,
            }));
        }
    };
}

function submitInfectionsFormSuccess(newList) {
    return {
        type: SUBMIT_CREATE_INFECTIONS_FORM_SUCCESS,
        infectionsEntries: newList,
    };
}

function submitInfectionsFormFailure() {
    return {
        type: SUBMIT_CREATE_INFECTIONS_FORM_FAILURE,
    };
}

export function deleteInfectionEntryAction(entry) {
    return dispatch => {
        dispatch({
            type: DELETE_INFECTION_ENTRY_ATTEMPT,
        });
        dispatch(showConfirm({
            title: translations.en.DeleteEntryConfirmTitle,
            content: translations.en.DeleteEntryConfirmContent,
            confirmText: translations.en.DeleteEntryConfirmOkButton,
            cancelText: translations.en.DeleteEntryConfirmCancelButton,
            onConfirm: () => {
                dispatch(deleteInfectionEntryConfirmed(entry));
            },
        }));
    };
}

function deleteInfectionEntryConfirmed(entry) {
    return async dispatch => {
        dispatch({
            type: DELETE_INFECTION_ENTRY_ATTEMPT_CONFIRMED,
        });
        dispatch(closeConfirm());

        try {
            const response = await deleteDataEntry({
                childInfectionEntry: entry,
            });

            dispatch(deleteInfectionEntrySuccess(response.data.childInfectionsEntries));
            dispatch(showSnackBarDialog({
                mode: 'success',
                text: translations.en.DeleteSnackBarSuccessText,
            }));
        } catch (error) {
            console.error(error);
            dispatch(showSnackBarDialog({
                mode: 'error',
                text: translations.en.DeleteSnackBarFailureText,
            }));
            dispatch(deleteInfectionEntryFailure());
        }
    }
}

function deleteInfectionEntrySuccess(newList) {
    return {
        type: DELETE_INFECTION_ENTRY_ATTEMPT_SUCCESS,
        infectionsEntries: newList,
    };
}

function deleteInfectionEntryFailure() {
    return {
        type: DELETE_INFECTION_ENTRY_ATTEMPT_FAILURE,
    };
}
