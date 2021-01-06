import {
    DELETE_NOTE_ENTRY_ATTEMPT,
    DELETE_NOTE_ENTRY_CONFIRMED,
    DELETE_NOTE_ENTRY_FAILURE,
    DELETE_NOTE_ENTRY_SUCCESS,
    FETCH_NOTES_ENTRIES,
    FETCH_NOTES_ENTRIES_FAILURE,
    FETCH_NOTES_ENTRIES_SUCCESS,
    SUBMIT_NOTES_FORM,
    SUBMIT_NOTES_FORM_FAILURE,
    SUBMIT_NOTES_FORM_SUCCESS,
} from '../constants/constants';
import {
    createDataEntry,
    deleteDataEntry,
    fetchChildNotesApi,
    replaceDataEntry,
} from '../../../../api/api';
import {appNotesManageTranslations as translations} from '../constants/translations';
import {closeConfirm, showConfirm, showSnackBarDialog} from '../../../common/actions/app_actions';

export function fetchNotesEntriesAction() {
    return async dispatch => {
        dispatch({
            type: FETCH_NOTES_ENTRIES,
        });

        try {
            const response = await fetchChildNotesApi();

            dispatch(fetchNotesEntriesSuccess(response.data));
        } catch (error) {
            console.error(error);
            dispatch(fetchNotesEntriesFailure());
        }
    };
}

function fetchNotesEntriesSuccess(notesEntries) {
    return {
        type: FETCH_NOTES_ENTRIES_SUCCESS,
        notesEntries,
    };
}

function fetchNotesEntriesFailure() {
    return {
        type: FETCH_NOTES_ENTRIES_FAILURE,
    };
}

export function submitNotesFormAction(config) {
    const {
        mode,
        date,
        description,
        editedNoteDate,
        editedNoteDescription,
    } = config;

    return async dispatch => {
        let response;

        dispatch({
            type: SUBMIT_NOTES_FORM,
        });

        try {
            if (mode === 'create') {
                response = await createDataEntry({
                    childNoteEntry: {
                        description,
                        date,
                    },
                });
            } else {
                response = await replaceDataEntry({
                    noteEntry: {
                        description,
                        date,
                    },
                    originalNoteEntry: {
                        description: editedNoteDescription,
                        date: editedNoteDate,
                    },
                });
            }

            dispatch(showSnackBarDialog({
                mode: 'success',
                text: mode === 'create' ? translations.en.SnackbarCreateEntrySuccess : translations.en.SnackbarEditEntrySuccess,
            }));
            dispatch(submitNotesFormSuccess(response.data.childNotesEntries));
        } catch (e) {
            dispatch(showSnackBarDialog({
                mode: 'error',
                text: mode === 'create' ? translations.en.SnackbarCreateEntryFailure : translations.en.SnackbarEditEntryFailure,
            }));
            dispatch(submitNotesFormFailure());
        }
    };
}

function submitNotesFormSuccess(newList) {
    return {
        type: SUBMIT_NOTES_FORM_SUCCESS,
        notesEntries: newList,
    };
}

function submitNotesFormFailure() {
    return {
        type: SUBMIT_NOTES_FORM_FAILURE,
    };
}

export function deleteNoteEntry(noteDate, noteDescription) {
    return dispatch => {
        dispatch({
            type: DELETE_NOTE_ENTRY_ATTEMPT,
        });
        dispatch(showConfirm({
            title: translations.en.ConfirmDeleteDialogTitle,
            content: translations.en.ConfirmDeleteDialogContent,
            cancelText: translations.en.ConfirmDeleteDialogCancelButton,
            confirmText: translations.en.ConfirmDeleteDialogOkButton,
            onConfirm: () => {
                dispatch(deleteNoteEntryConfirmed(noteDate, noteDescription));
            },
        }));
    };
}

function deleteNoteEntryConfirmed(noteDate, noteDescription) {
    return async dispatch => {
        dispatch({
            type: DELETE_NOTE_ENTRY_CONFIRMED,
        });
        dispatch(closeConfirm());

        try {
            const response = await deleteDataEntry({
                childNoteEntry: {
                    description: noteDescription,
                    date: noteDate,
                },
            });

            dispatch(showSnackBarDialog({
                mode: 'success',
                text: translations.en.SnackbarDeleteEntrySuccess,
            }));
            dispatch(deleteNoteEntrySuccess(response.data.childNotesEntries));
        } catch (e) {
            dispatch(showSnackBarDialog({
                mode: 'error',
                text: translations.en.SnackbarDeleteEntryFailure,
            }));
            dispatch(deleteNoteEntryFailure());
        }
    };
}

function deleteNoteEntrySuccess(newList) {
    return {
        type: DELETE_NOTE_ENTRY_SUCCESS,
        notesEntries: newList,
    };
}

function deleteNoteEntryFailure() {
    return {
        type: DELETE_NOTE_ENTRY_FAILURE,
    };
}
