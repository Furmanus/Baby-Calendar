import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    getAppWeightEntriesSelector,
    isFetchingWeightEntriesSelector,
    isDeletingChildWeightEntrySelector,
    isSubmittingChildWeightFormSelector,
} from '../selectors/appWeightSelectors';
import {
    deleteWeightEntry, fetchAppWeightData, submitChildWeightFormAction,
} from '../actions/appWeightActions';
import {weightManageTranslations as translations} from '../constants/translations';
import {AppDataDashboard} from '../../../common/components/AppDataDashboard';

function mapStateToProps(state) {
    return {
        weightEntries: getAppWeightEntriesSelector(state),
        isFetchingWeightEntries: isFetchingWeightEntriesSelector(state),
        isDeletingWeightEntry: isDeletingChildWeightEntrySelector(state),
        isSubmittingWeightEntries: isSubmittingChildWeightFormSelector(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchWeightEntries: () => dispatch(fetchAppWeightData()),
        deleteEntry: (date, weight) => dispatch(deleteWeightEntry(date, weight)),
        submitForm: (mode, weightDate, childWeight, editedWeightDate, editedChildWeight) => dispatch(submitChildWeightFormAction(mode, weightDate, childWeight, editedWeightDate, editedChildWeight)),
    };
}

const columns = [
    {
        label: translations.en.WeightDateTableHeader,
        key: 'weightDate',
        type: 'date',
    },
    {
        label: translations.en.ChildWeightTableHeader,
        key: 'childWeight',
        type: 'multiline',
    },
];

class AppWeightManageClass extends React.PureComponent {
    static propTypes = {
        weightEntries: PropTypes.arrayOf(PropTypes.object),
        isFetchingWeightEntries: PropTypes.bool,
        isDeletingWeightEntry: PropTypes.bool,
        fetchWeightEntries: PropTypes.func,
        deleteEntry: PropTypes.func,
        isSubmittingWeightEntries: PropTypes.bool,
        submitForm: PropTypes.func,
    };

    componentDidMount() {
        const {
            fetchWeightEntries,
            weightEntries,
        } = this.props;

        if (!weightEntries) {
            fetchWeightEntries();
        }
    }

    onDeleteClick = (entry) => {
        const {
            weightDate,
            childWeight,
        } = entry;

        this.props.deleteEntry(weightDate, childWeight);
    };

    handleCreateFormSubmit = (mode, values, editedValues) => {
        const {
            isSubmittingWeightEntries,
            submitForm,
        } = this.props;
        const {
            weightDate,
            childWeight,
        } = values;
        const editedWeightDate = editedValues && editedValues.weightDate;
        const editedChildWeight = editedValues && editedValues.childWeight;

        if (!isSubmittingWeightEntries) {
            submitForm(mode, weightDate, childWeight, editedWeightDate, editedChildWeight);
        }
    };

    render() {
        const {
            weightEntries,
            isFetchingWeightEntries,
            isDeletingWeightEntry,
            isSubmittingWeightEntries,
        } = this.props;

        return (
            <AppDataDashboard
                heading={translations.en.WeightManageHeader}
                isSubmittingCreateForm={isSubmittingWeightEntries}
                showLoader={isFetchingWeightEntries || isDeletingWeightEntry}
                handleDeleteEntry={this.onDeleteClick}
                data={weightEntries}
                columns={columns}
                handleCreateEntryFormSubmit={this.handleCreateFormSubmit}
            />
        );
    }
}

export const AppWeightManage = connect(mapStateToProps, mapDispatchToProps)(AppWeightManageClass);
