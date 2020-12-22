import {
    FETCH_WEIGHT_DATA,
    FETCH_WEIGHT_DATA_FAILURE,
    FETCH_WEIGHT_DATA_SUCCESS,
    SUBMIT_CHILD_WEIGHT_FORM,
    SUBMIT_CHILD_WEIGHT_FORM_SUCCESS,
    SUBMIT_CHILD_WEIGHT_FORM_FAILURE,
    DELETE_WEIGHT_ENTRY_ATTEMPT,
    DELETE_WEIGHT_ENTRY_CONFIRMED,
    DELETE_WEIGHT_ENTRY_ATTEMPT_SUCCESS,
    DELETE_WEIGHT_ENTRY_ATTEMPT_FAILURE,
} from '../constants/actionTypes';
import {
    fetchChildWeightApi,
    replaceDataEntry,
    createDataEntry,
    deleteDataEntry,
} from '../../../../api/api';
import {closeConfirm, showConfirm, showSnackBarDialog} from '../../../common/actions/app_actions';
import {weightManageTranslations} from '../constants/translations';

export function fetchAppWeightData() {
    return async dispatch => {
        dispatch({
            type: FETCH_WEIGHT_DATA,
        });

        try {
            const {data} = await fetchChildWeightApi();

            dispatch(fetchAppWeightDataSuccess(data));
        } catch (e) {
            dispatch(fetchAppWeightDataFailure(e));
        }
    };
}

function fetchAppWeightDataSuccess(weightEntries) {
    return {
        type: FETCH_WEIGHT_DATA_SUCCESS,
        weightEntries,
    };
}

function fetchAppWeightDataFailure() {
    return {
        type: FETCH_WEIGHT_DATA_FAILURE,
    };
}

export function submitChildWeightFormAction(mode, weightDate, childWeight, editedWeightDate, editedChildWeight, callback = () => {}) {
    return async dispatch => {
        dispatch({
            type: SUBMIT_CHILD_WEIGHT_FORM,
        });

        try {
            let response;

            if (mode === 'create') {
                response = await createDataEntry({
                    childWeightEntry: {
                        childWeight,
                        weightDate,
                    }
                });
            } else {
                response = await replaceDataEntry({
                    childWeightEntry: {
                        weightDate,
                        childWeight,
                    },
                    originalChildWeightEntry: {
                        weightDate: editedWeightDate,
                        childWeight: editedChildWeight,
                    },
                });
            }

            dispatch(showSnackBarDialog({
                mode: 'success',
                text: mode === 'create' ? weightManageTranslations.en.CreateEntryDialogSuccess : weightManageTranslations.en.EditEntryDialogSuccess,
            }));
            dispatch(submitCreateFormSuccess(response.data.childWeightEntries));

            callback();
        } catch (error) {
            dispatch(showSnackBarDialog({
                mode: 'error',
                text: mode === 'create' ? weightManageTranslations.en.CreateEntryDialogFailure : weightManageTranslations.en.EditEntryDialogFailure,
            }));
            dispatch(submitCreateFormFailure());
            callback();
        }
    };
}

function submitCreateFormSuccess(weightEntries) {
    return {
        type: SUBMIT_CHILD_WEIGHT_FORM_SUCCESS,
        weightEntries,
    };
}

function submitCreateFormFailure() {
    return {
        type: SUBMIT_CHILD_WEIGHT_FORM_FAILURE,
    };
}
export function deleteWeightEntry(date, weight) {
    return dispatch => {
        dispatch({
            type: DELETE_WEIGHT_ENTRY_ATTEMPT,
        });

        dispatch(showConfirm({
            content: weightManageTranslations.en.DeleteConfirmContent,
            cancelText: weightManageTranslations.en.DeleteConfirmCancelText,
            confirmText: weightManageTranslations.en.DeleteConfirmConfirmText,
            onConfirm: () => {
                dispatch(deleteWeightEntryConfirmed(date, weight));
            },
        }));
    };
}

function deleteWeightEntryConfirmed(date, weight) {
    return async dispatch => {
        dispatch({
            type: DELETE_WEIGHT_ENTRY_CONFIRMED,
        });
        dispatch(closeConfirm());

        try {
            const {data} = await deleteDataEntry({
                childWeightEntry: {
                    weightDate: date,
                    childWeight: weight,
                },
            });

            dispatch(deleteWeightEntrySuccess(data.childWeightEntries));
            dispatch(showSnackBarDialog({
                mode: 'success',
                text: weightManageTranslations.en.DeleteSuccessPopup,
            }));
        } catch (e) {
            dispatch(deleteWeightEntryFailure());
            dispatch(showSnackBarDialog({
                mode: 'error',
                text: weightManageTranslations.en.DeleteFailurePopup,
            }));
        }
    };
}

function deleteWeightEntrySuccess(newList) {
    return {
        type: DELETE_WEIGHT_ENTRY_ATTEMPT_SUCCESS,
        weightEntries: newList,
    };
}

function deleteWeightEntryFailure() {
    return {
        type: DELETE_WEIGHT_ENTRY_ATTEMPT_FAILURE,
    };
}
