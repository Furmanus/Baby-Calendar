import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {AppDataDashboard} from '../../../common/components/AppDataDashboard';
import {
    fetchInfectionEntriesAction,
    submitInfectionsForm,
    deleteInfectionEntryAction,
} from '../actions/appInfectionsActions';
import {
    getInfectionsEntriesSelector,
    isFetchingInfectionsEntriesSelector,
    isSubmittingFormSelector,
    isDeletingInfectionEntrySelector,
} from '../selectors/appInfectionsSelectors';
import {infectionsTranslations as translations} from '../constants/translations';

function mapStateToProps(state) {
    return {
        infectionsEntries: getInfectionsEntriesSelector(state),
        isFetchingInfectionsEntries: isFetchingInfectionsEntriesSelector(state),
        isSubmittingForm: isSubmittingFormSelector(state),
        isDeletingInfectionEntry: isDeletingInfectionEntrySelector(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchInfectionsEntries: () => dispatch(fetchInfectionEntriesAction()),
        submitForm: (mode, entry, editedEntry) => dispatch(submitInfectionsForm(mode, entry, editedEntry)),
        deleteInfectionEntry: (entry) => dispatch(deleteInfectionEntryAction(entry)),
    };
}

const columns = [
    {
        label: translations.en.TableDateColumnLabel,
        key: 'date',
        type: 'date',
    },
    {
        label: translations.en.TableDescriptionColumnLabel,
        key: 'description',
        type: 'multiline',
    },
];

class AppInfectionsManageClass extends React.PureComponent {
    static propTypes = {
        fetchInfectionsEntries: PropTypes.func,
        infectionsEntries: PropTypes.arrayOf(PropTypes.object),
        isFetchingInfectionsEntries: PropTypes.bool,
        isSubmittingForm: PropTypes.bool,
        submitForm: PropTypes.func,
        deleteInfectionEntry: PropTypes.func,
        isDeletingInfectionEntry: PropTypes.bool,
    };

    componentDidMount() {
        const {
            fetchInfectionsEntries,
            infectionsEntries,
        } = this.props;

        if (!infectionsEntries) {
            fetchInfectionsEntries();
        }
    }

    handleCreateEntrySubmit = (mode, values, editedValues) => {
        const {
            isSubmittingForm,
            submitForm,
        } = this.props;

        if (!isSubmittingForm) {
            submitForm(mode, values, editedValues);
        }
    };

    handleDeleteEntry = (entry) => {
        this.props.deleteInfectionEntry(entry);
    };

    render() {
        const {
            infectionsEntries,
            isFetchingInfectionsEntries,
            isSubmittingForm,
            isDeletingInfectionEntry,
        } = this.props;

        return (
            <AppDataDashboard
                heading={translations.en.Heading}
                showLoader={isFetchingInfectionsEntries | isDeletingInfectionEntry}
                columns={columns}
                data={infectionsEntries}
                handleCreateEntryFormSubmit={this.handleCreateEntrySubmit}
                handleDeleteEntry={this.handleDeleteEntry}
                isSubmittingCreateForm={isSubmittingForm}
            />
        );
    }
}

export const AppInfectionsManage = connect(mapStateToProps, mapDispatchToProps)(AppInfectionsManageClass);
