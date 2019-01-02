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
import {AppConfirmModal} from '../components/AppConfirmModal';
import {
    ControlLabel,
    FormControl
} from 'react-bootstrap';

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
        editedEntry: null,
        editedEntryNewDateValue: '',
        editedEntryNewChildWeightValue: '',
        entrySelectedToDelete: null
    };

    @autobind
    handleEditClick(entry) {
        this.setState({
            editedEntry: entry
        });
    }
    @autobind
    handleRemoveClick(entry) {
        if (entry) {
            this.setState({
                entrySelectedToDelete: entry
            });
        }
    }
    @autobind
    handleConfirmRemove() {
        const {
            entrySelectedToDelete
        } = this.state;
        const {
            deleteUserData
        } = this.props;

        if (entrySelectedToDelete) {
            deleteUserData(entrySelectedToDelete);

            this.setState({
                entrySelectedToDelete: null
            });
        }
    }
    @autobind
    handleRejectRemove() {
        this.setState({
            entrySelectedToDelete: null
        });
    }
    @autobind
    handleCancelEdit() {
        this.setState({
            editedEntry: null,
            editedEntryNewDateValue: '',
            editedEntryNewChildWeightValue: ''
        });
    }
    @autobind
    handleConfirmEdit() {
        const {
            replaceUserData
        } = this.props;
        const {
            editedEntry,
            editedEntryNewChildWeightValue,
            editedEntryNewDateValue
        } = this.state;

        if (editedEntryNewChildWeightValue && editedEntryNewDateValue) {
            this.setState({
                editedEntry: null,
                editedEntryNewDateValue: '',
                editedEntryNewChildWeightValue: ''
            });

            replaceUserData(editedEntryNewChildWeightValue, editedEntryNewDateValue, editedEntry);
        }
    }
    @autobind
    deleteEntryModalBodyRenderer() {
        return (
            <p>Are you sure you want to remove selected entry?</p>
        );
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
                                        handleEditClick={this.handleEditClick}
                                        handleRemoveClick={this.handleRemoveClick}
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
    @autobind
    onEditedEntryDateChange(e) {
        const {
            value
        } = e.target;

        this.setState({
            editedEntryNewDateValue: value
        });
    }
    @autobind
    onEditedEntryWeightChange(e) {
        const {
            value
        } = e.target;

        if (!isNaN(Number(value))) {
            this.setState({
                editedEntryNewChildWeightValue: value
            });
        }
    }
    @autobind
    editEntryModalBodyRenderer() {
        const {
            editedEntryNewDateValue,
            editedEntryNewChildWeightValue
        } = this.state;

        return (
            <div className="modal-weight-wrapper">
                <ControlLabel>Pick new date: </ControlLabel>
                <FormControl
                    placeholder="Enter date"
                    type="date"
                    value={editedEntryNewDateValue}
                    onChange={this.onEditedEntryDateChange}
                />
                <ControlLabel>Pick new weight: </ControlLabel>
                <FormControl
                    placeholder="Enter weight"
                    type="text"
                    value={editedEntryNewChildWeightValue}
                    onChange={this.onEditedEntryWeightChange}
                />
            </div>
        );
    }
    render() {
        const {
            updateUserData,
            isSubmitting
        } = this.props;
        const {
            editedEntry,
            editedEntryNewChildWeightValue,
            editedEntryNewDateValue,
            entrySelectedToDelete
        } = this.state;

        return (
            <div className="weight-wrapper">
                <div className="weight-form-wrapper">
                    <AddWeightEntryForm
                        updateData={updateUserData}
                        isSubmitting={isSubmitting}
                    />
                </div>
                <div className="data-wrapper">
                    {this.renderContent()}
                </div>
                <AppConfirmModal
                    title="Edit weight entry"
                    visible={!!editedEntry}
                    bodyRenderer={this.editEntryModalBodyRenderer}
                    onCancel={this.handleCancelEdit}
                    onConfirm={this.handleConfirmEdit}
                    confirmEnabled={!!editedEntryNewDateValue && !!editedEntryNewChildWeightValue}
                />
                <AppConfirmModal
                    title="Confirm delete"
                    visible={!!entrySelectedToDelete}
                    onCancel={this.handleRejectRemove}
                    onConfirm={this.handleConfirmRemove}
                    bodyRenderer={this.deleteEntryModalBodyRenderer}
                />
            </div>
        );
    }
}