import React from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';
import {EmptyData} from '../components/EmptyData';
import {AddWeightEntryForm} from '../components/AddWeightEntryForm';
import {
    updateUserData,
    deleteUserDataRecord,
    replaceUserData
} from '../actions/app_actions';
import {
    Table
} from 'react-bootstrap';
import {AppWeightTableRow} from '../components/AppWeightTableRow';
import PerfectScrollBar from 'react-perfect-scrollbar';

@connect(state => {
    return {
        childWeightEntries: state.childWeightEntries,
        isSubmitting: state.isSubmitting
    };
}, dispatch => {
    return {
        updateUserData: data => {
            dispatch(updateUserData(data))
        },
        deleteUserData: childWeightEntry => {
            dispatch(deleteUserDataRecord({
                childWeightEntry
            }));
        },
        replaceUserData: (childWeight, weightDate, originalChildWeightEntry) => {
            dispatch(replaceUserData({
                childWeightEntry: {
                    childWeight,
                    weightDate
                },
                originalChildWeightEntry
            }));
        }
    };
})
export class AppWeightTable extends React.Component {
    state = {
        editedIndex: -1
    };
    @autobind
    handleEditClick(entryIndex) {
        this.setState({
            editedIndex: entryIndex
        });
    }
    @autobind
    handleRemoveClick(entry) {
        const {
            deleteUserData
        } = this.props;

        deleteUserData(entry);
    }
    @autobind
    handleCancelRowEdit() {
        this.setState({
            editedIndex: -1
        });
    }
    @autobind
    handleEditRowAccept(childWeight, weightDate, originalEntry) {
        const {
            replaceUserData
        } = this.props;
        if (childWeight && weightDate) {
            replaceUserData(childWeight, weightDate, originalEntry);
        }
    }
    @autobind
    renderContent() {
        const {
            childWeightEntries
        } = this.props;
        const {
            editedIndex
        } = this.state;

        if (childWeightEntries.length) {
            return (
                <PerfectScrollBar className="scrollbar-space">
                    <Table className="data-table" responsive>
                        <thead>
                            <tr>
                                <th>Weight</th>
                                <th>Date</th>
                                <th>Diff</th>
                                <th>Avg</th>
                                <th>Edit</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {childWeightEntries.map((entry, index) => {
                                return (
                                    <AppWeightTableRow
                                        key={index}
                                        entries={childWeightEntries}
                                        entry={entry}
                                        index={index}
                                        isEntryEdited={index === editedIndex}
                                        handleEditClick={this.handleEditClick}
                                        handleRemoveClick={this.handleRemoveClick}
                                        handleCancelEdit={this.handleCancelRowEdit}
                                        handleConfirmEdit={this.handleEditRowAccept}
                                    />
                                );
                            })}
                        </tbody>
                    </Table>
                </PerfectScrollBar>
            );
        } else {
            return <EmptyData/>;
        }
    }
    render() {
        const {
            updateUserData,
            isSubmitting
        } = this.props;

        return (
            <div className="weight-wrapper">
                <div className="data-wrapper">
                    {this.renderContent()}
                </div>
                <div className="weight-form-wrapper">
                    <AddWeightEntryForm
                        updateData={updateUserData}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>
        );
    }
}