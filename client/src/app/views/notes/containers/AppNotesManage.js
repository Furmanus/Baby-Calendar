import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {AppDataDashboard} from '../../../common/components/AppDataDashboard';
import {
    getNotesEntriesSelector,
    isDeletingNoteEntrySelector,
    isFetchingNotesEntriesSelector,
    isSubmittingCreateFormSelector,
} from '../selectors/appNotesSelectors';
import {
    deleteNoteEntry, fetchNotesEntriesAction, submitNotesFormAction,
} from '../actions/appNotesActions';
import {appNotesManageTranslations as translations} from '../constants/translations';

function mapStateToProps(state) {
    return {
        isFetchingNotesEntries: isFetchingNotesEntriesSelector(state),
        notesEntries: getNotesEntriesSelector(state),
        isSubmittingCreateForm: isSubmittingCreateFormSelector(state),
        isDeletingNoteEntry: isDeletingNoteEntrySelector(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchNotesEntries: () => dispatch(fetchNotesEntriesAction()),
        submitCreateForm: (config) => dispatch(submitNotesFormAction(config)),
        deleteNoteEntry: (date, description) => dispatch(deleteNoteEntry(date, description)),
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

const columns = [
    {
        label: translations.en.ManageDateColumnLabel,
        key: 'date',
        type: 'date',
        validation: {
            isRequired: true,
        },
    },
    {
        label: translations.en.ManageDescriptionColumnLabel,
        key: 'description',
        type: 'multiline',
        validation: {
            isRequired: true,
        },
    },
];

class AppNotesManageClass extends React.PureComponent {
    static propTypes = {
        isFetchingNotesEntries: PropTypes.bool,
        notesEntries: PropTypes.arrayOf(PropTypes.object),
        fetchNotesEntries: PropTypes.func,
        isSubmittingCreateForm: PropTypes.bool,
        submitCreateForm: PropTypes.func,
        isDeletingNoteEntry: PropTypes.bool,
        deleteNoteEntry: PropTypes.func,
    };

    componentDidMount() {
        const {
            isFetchingNotesEntries,
            fetchNotesEntries,
            notesEntries,
        } = this.props;

        if (!isFetchingNotesEntries && !notesEntries) {
            fetchNotesEntries();
        }
    }

    onDeleteClick = (entry) => {
        const {
            date,
            description,
        } = entry;

        this.props.deleteNoteEntry(date, description);
    };

    handleCreateFormSubmit = (mode, values, editedValues) => {
        const {
            submitCreateForm,
            isSubmittingCreateForm,
        } = this.props;

        if (!isSubmittingCreateForm) {
            submitCreateForm({
                editedNoteDate: editedValues && editedValues.date,
                editedNoteDescription: editedValues && editedValues.description,
                mode,
                ...values,
            });
        }
    };

    render() {
        const {
            isFetchingNotesEntries,
            notesEntries,
            isSubmittingCreateForm,
            isDeletingNoteEntry,
        } = this.props;

        return (
            <AppDataDashboard
                showLoader={isFetchingNotesEntries || isDeletingNoteEntry}
                data={notesEntries}
                heading={translations.en.ManageHeading}
                columns={columns}
                isSubmittingCreateForm={isSubmittingCreateForm}
                handleCreateEntryFormSubmit={this.handleCreateFormSubmit}
                handleDeleteEntry={this.onDeleteClick}
                addEntryButton={translations.en.AddEntryButton}
            />
        );
    }
}

export const AppNotesManage = connector(AppNotesManageClass);
