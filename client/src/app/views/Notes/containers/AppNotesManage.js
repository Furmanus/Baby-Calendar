import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {AppDataDashboard} from '../../../common/components/AppDataDashboard';
import {
    getNotesEntriesSelector,
    isFetchingNotesEntriesSelector,
    isSubmittingCreateFormSelector,
} from '../selectors/appNotesSelectors';
import {
    fetchNotesEntriesAction,
    submitNotesFormAction,
} from '../actions/appNotesActions';
import {appNotesManageTranslations as translations} from '../constants/translations';

function mapStateToProps(state) {
    return {
        isFetchingNotesEntries: isFetchingNotesEntriesSelector(state),
        notesEntries: getNotesEntriesSelector(state),
        isSubmittingCreateForm: isSubmittingCreateFormSelector(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchNotesEntries: () => dispatch(fetchNotesEntriesAction()),
        submitCreateForm: (config) => dispatch(submitNotesFormAction(config)),
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

const columns = [
    {
        label: translations.en.ManageDateColumnLabel,
        key: 'date',
        type: 'date',
    },
    {
        label: translations.en.ManageDescriptionColumnLabel,
        key: 'description',
        type: 'multiline',
    },
];

class AppNotesManageClass extends React.PureComponent {
    static propTypes = {
        isFetchingNotesEntries: PropTypes.bool,
        notesEntries: PropTypes.arrayOf(PropTypes.object),
        fetchNotesEntries: PropTypes.func,
        isSubmittingCreateForm: PropTypes.bool,
        submitCreateForm: PropTypes.func,
    };

    componentDidMount() {
        const {
            isFetchingNotesEntries,
            fetchNotesEntries,
        } = this.props;

        if (!isFetchingNotesEntries) {
            fetchNotesEntries();
        }
    }

    onDeleteClick = (noteDate, noteDescription) => {
        // this.props.deleteNoteEntry(noteDate, noteDescription);
        console.log(noteDate, noteDescription);
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
        } = this.props;

        return (
            <AppDataDashboard
                showLoader={isFetchingNotesEntries}
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
