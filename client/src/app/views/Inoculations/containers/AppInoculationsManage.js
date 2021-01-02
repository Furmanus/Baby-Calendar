import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    getInoculationsEntriesSelector,
    isDeletingInoculationEntrySelector,
    isFetchingInoculationsEntriesSelector,
    isSubmittingInoculationsFormSelector,
} from '../selectors/appInoculationsSelectors';
import {
    deleteInoculationAttempt,
    fetchInoculationsEntriesAction,
    submitInoculationForm,
} from '../actions/appInoculationsActions';
import {appInoculationsManageTranslations as translations} from '../contants/translations';
import {AppDataDashboard} from '../../../common/components/AppDataDashboard';

function mapStateToProps(state) {
    return {
        isFetchingInoculationsEntries: isFetchingInoculationsEntriesSelector(state),
        isDeletingInoculationEntry: isDeletingInoculationEntrySelector(state),
        isSubmittingForm: isSubmittingInoculationsFormSelector(state),
        inoculationsEntries: getInoculationsEntriesSelector(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchInoculationEntries: () => dispatch(fetchInoculationsEntriesAction()),
        deleteInoculationEntry: (date, description) => dispatch(deleteInoculationAttempt(date, description)),
        submitInoculationForm: (config) => dispatch(submitInoculationForm(config)),
    };
}

const columns = [
    {
        label: translations.en.TableDateRowHeading,
        key: 'inoculationDate',
        type: 'date',
    },
    {
        label: translations.en.TableDescriptionRowHeading,
        key: 'description',
        type: 'multiline',
    },
];

class AppInoculationsManageClass extends React.PureComponent {
    state = {
        rowsPerPage: 5,
        currentPage: 0,
        modalState: null,
        editedInoculationDate: null,
        editedInoculationDescription: null,
    };

    componentDidMount() {
        const {
            fetchInoculationEntries,
            inoculationsEntries,
        } = this.props;

        if (!inoculationsEntries) {
            fetchInoculationEntries();
        }
    }

    handlePageChange = (event, newPage) => {
        this.setState({
            currentPage: newPage,
        });
    };

    handlePerPageChange = (event) => {
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10),
            currentPage: 0,
        });
    };

    onAddEntryClick = () => {
        this.setState({
            modalState: 'create',
        });
    };

    onModalClose = () => {
        this.setState({
            modalState: null,
            editedInoculationDate: null,
            editedInoculationDescription: null,
        });
    };

    onDeleteClick = (inoculationDate, inoculationDescription) => {
        this.props.deleteInoculationEntry(inoculationDate, inoculationDescription);
    };

    handleCreateFormSubmit = (mode, values, editedValues) => {
        const {
            submitInoculationForm,
            isSubmittingForm,
        } = this.props;

        event.preventDefault();

        if (!isSubmittingForm) {
            submitInoculationForm({
                editedInoculationDate: editedValues && editedValues.inoculationDate,
                editedInoculationDescription: editedValues && editedValues.description,
                mode,
                ...values,
            });
        }
    };

    render() {
        const {
            inoculationsEntries,
            isFetchingInoculationsEntries,
            isDeletingInoculationEntry,
            isSubmittingForm,
        } = this.props;

        return (
            <AppDataDashboard
                heading={translations.en.ManageHeading}
                isSubmittingCreateForm={isSubmittingForm}
                showLoader={isFetchingInoculationsEntries || isDeletingInoculationEntry}
                handleDeleteEntry={this.onDeleteClick}
                data={inoculationsEntries}
                columns={columns}
                handleCreateEntryFormSubmit={this.handleCreateFormSubmit}
            />
        );
    }
}

export const AppInoculationsManage = connect(mapStateToProps, mapDispatchToProps)(AppInoculationsManageClass);

AppInoculationsManage.propTypes = {
    isFetchingInoculationsEntries: PropTypes.bool,
    isDeletingInoculationEntry: PropTypes.bool,
    isSubmittingForm: PropTypes.bool,
    inoculationsEntries: PropTypes.arrayOf(PropTypes.object),
    fetchInoculationEntries: PropTypes.func,
    deleteInoculationEntry: PropTypes.func,
    submitInoculationForm: PropTypes.func,
};
