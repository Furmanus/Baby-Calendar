import {
    DELETE_INOCULATION_ENTRY_ATTEMPT,
    DELETE_INOCULATION_ENTRY_CONFIRMED,
    DELETE_INOCULATION_ENTRY_SUCCESS,
    FETCH_INOCULATIONS_ENTRIES,
    FETCH_INOCULATIONS_ENTRIES_FAILURE,
    FETCH_INOCULATIONS_ENTRIES_SUCCESS,
    SUBMIT_INOCULATIONS_FORM,
    SUBMIT_INOCULATIONS_FORM_FAILURE,
    SUBMIT_INOCULATIONS_FORM_SUCCESS,
} from '../contants/actionTypes';
import {createDataEntry, deleteDataEntry, fetchChildInoculationsApi, replaceDataEntry} from '../../../../api/api';
import {closeConfirm, showConfirm, showSnackBarDialog} from '../../../common/actions/app_actions';
import {appInoculationsManageTranslations as translations} from '../contants/translations';
import {DELETE_WEIGHT_ENTRY_ATTEMPT_FAILURE} from '../../Weight/constants/actionTypes';

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
export function submitInoculationForm(config) {
    const {
        mode,
        inoculationDate,
        inoculationDescription,
        editedInoculationDate,
        editedInoculationDescription,
        callback,
    } = config;

    return async dispatch => {
        let response;

        dispatch({
            type: SUBMIT_INOCULATIONS_FORM,
        });

        try {
            if (mode === 'create') {
                response = await createDataEntry({
                    childInoculationEntry: {
                        description: inoculationDescription,
                        inoculationDate,
                    },
                });
            } else {
                response = await replaceDataEntry({
                    inoculationEntry: {
                        description: inoculationDescription,
                        inoculationDate,
                    },
                    originalInoculationEntry: {
                        description: editedInoculationDescription,
                        inoculationDate: editedInoculationDate,
                    },
                });
            }

            dispatch(showSnackBarDialog({
                mode: 'success',
                text: mode === 'create' ? translations.en.SnackbarCreateEntrySuccess : translations.en.SnackbarEditEntrySuccess,
            }));
            dispatch(submitInoculationFormSuccess(response.data.childInoculationsEntries));
        } catch (e) {
            dispatch(showSnackBarDialog({
                mode: 'error',
                text: mode === 'create' ? translations.en.SnackbarCreateEntryFailure : translations.en.SnackbarEditEntryFailure,
            }));
            dispatch(submitInoculationFormFailure());
        }

        if (callback) {
            callback();
        }
    };
}

function submitInoculationFormSuccess(newList) {
    return {
        type: SUBMIT_INOCULATIONS_FORM_SUCCESS,
        inoculationsEntries: newList,
    };
}

function submitInoculationFormFailure() {
    return {
        type: SUBMIT_INOCULATIONS_FORM_FAILURE,
    };
}

export function deleteInoculationAttempt(inoculationDate, inoculationDescription) {
    return dispatch => {
        dispatch({
            type: DELETE_INOCULATION_ENTRY_ATTEMPT,
        });
        dispatch(showConfirm({
            title: translations.en.ConfirmDeleteDialogTitle,
            content: translations.en.ConfirmDeleteDialogContent,
            cancelText: translations.en.ConfirmDeleteDialogCancelButton,
            confirmText: translations.en.ConfirmDeleteDialogOkButton,
            onConfirm: () => {
                dispatch(deleteInoculationConfirmed(inoculationDate, inoculationDescription));
            },
        }));
    };
}
function deleteInoculationConfirmed(inoculationDate, inoculationDescription) {
    return async dispatch => {
        dispatch({
            type: DELETE_INOCULATION_ENTRY_CONFIRMED,
        });
        dispatch(closeConfirm());

        try {
            const response = await deleteDataEntry({
                childInoculationEntry: {
                    description: inoculationDescription,
                    inoculationDate,
                },
            });

            dispatch(showSnackBarDialog({
                mode: 'success',
                text: translations.en.SnackbarDeleteEntrySuccess,
            }));
            dispatch(deleteInoculationSuccess(response.data.childInoculationsEntries));
        } catch (e) {
            dispatch(showSnackBarDialog({
                mode: 'error',
                text: translations.en.SnackbarDeleteEntryFailure,
            }));
            dispatch(deleteInoculationFailure());
        }
    };
}

function deleteInoculationSuccess(newList) {
    return {
        type: DELETE_INOCULATION_ENTRY_SUCCESS,
        inoculationsEntries: newList,
    };
}

function deleteInoculationFailure() {
    return {
        type: DELETE_WEIGHT_ENTRY_ATTEMPT_FAILURE,
    };
}
