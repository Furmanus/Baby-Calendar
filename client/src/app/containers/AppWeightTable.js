import React from 'react';
import {connect} from 'react-redux';
import {boundMethod} from 'autobind-decorator';
import {EmptyData} from '../components/EmptyData';
import {
    updateUserData,
    deleteUserDataRecord,
    replaceUserData
} from '../actions/app_actions';
import {WeightTableRow} from '../components/WeightTableRow';
import PerfectScrollBar from 'react-perfect-scrollbar';
import {ConfirmModal} from '../components/ConfirmModal';
import {
    ControlLabel,
    FormGroup,
    FormControl,
    Form,
    Button
} from 'react-bootstrap';
import {DataTable} from '../components/DataTable';
import {scrollPageToBottom} from '../utility/utility';
import {WeightChart} from '../components/WeightChart';

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
        entrySelectedToDelete: null,
        isAddingEntry: false,
        newEntryDateValue: '',
        newEntryChildWeightValue: ''
    };
    componentDidMount() {
        scrollPageToBottom();
    }
    componentDidUpdate(prevProps, prevState) {
        const {
            editedEntry: prevEditedEntry
        } = prevState;
        const {
            editedEntry
        } = this.state;

        if (null === prevEditedEntry && null !== editedEntry) {
            this.setState({
                editedEntryNewDateValue: editedEntry.weightDate,
                editedEntryNewChildWeightValue: editedEntry.childWeight
            });
        }
    }
    @boundMethod
    handleAddEntryClick() {
        this.setState({
            isAddingEntry: true
        });
    }
    @boundMethod
    handleAddEntryCancel() {
        this.setState({
            isAddingEntry: false,
            newEntryDateValue: '',
            newEntryChildWeightValue: ''
        });
    }
    @boundMethod
    handleAddEntryConfirm() {
        const {
            newEntryChildWeightValue,
            newEntryDateValue
        } = this.state;
        const {
            updateUserData
        } = this.props;

        if (newEntryChildWeightValue && newEntryDateValue) {
            this.setState({
                isAddingEntry: false,
                newEntryDateValue: '',
                newEntryChildWeightValue: ''
            });

            updateUserData({
                childWeightEntry: {
                    childWeight: newEntryChildWeightValue,
                    weightDate: newEntryDateValue
                }
            });
        }
    }
    @boundMethod
    onAddEntryChildWeightChange(e) {
        const {
            value
        } = e.target;

        if (!isNaN(value) && isFinite(value)) {
            this.setState({
                newEntryChildWeightValue: value
            });
        }
    }
    @boundMethod
    onAddEntryWeightDateChange(e) {
        const {
            value
        } = e.target;

        this.setState({
            newEntryDateValue: value
        });
    }
    @boundMethod
    addEntryModalBodyRenderer() {
        const {
            newEntryChildWeightValue,
            newEntryDateValue
        } = this.state;

        return (
            <Form>
                <FormGroup controlId="addWeight">
                    <ControlLabel>Weight:</ControlLabel>
                    <FormControl
                        type="text"
                        value={newEntryChildWeightValue}
                        placeholder="Enter child weight"
                        onChange={this.onAddEntryChildWeightChange}
                    />
                    <ControlLabel>Date:</ControlLabel>
                    <FormControl
                        type="date"
                        value={newEntryDateValue}
                        placeholder="Enter date"
                        onChange={this.onAddEntryWeightDateChange}
                    />
                </FormGroup>
            </Form>
        );
    }
    @boundMethod
    handleEditClick(entry) {
        this.setState({
            editedEntry: entry
        });
    }
    @boundMethod
    handleRemoveClick(entry) {
        if (entry) {
            this.setState({
                entrySelectedToDelete: entry
            });
        }
    }
    @boundMethod
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
    @boundMethod
    handleRejectRemove() {
        this.setState({
            entrySelectedToDelete: null
        });
    }
    @boundMethod
    handleCancelEdit() {
        this.setState({
            editedEntry: null,
            editedEntryNewDateValue: '',
            editedEntryNewChildWeightValue: ''
        });
    }
    @boundMethod
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
    deleteEntryModalBodyRenderer() {
        return (
            <p>Are you sure you want to remove selected entry?</p>
        );
    }
    weightTableHeaderRenderer() {
        return (
            <tr>
                <th>Weight</th>
                <th>Date</th>
                <th>Diff</th>
                <th>Avg</th>
                <th>Edit</th>
                <th>Remove</th>
            </tr>
        );
    }
    @boundMethod
    weightTableRowRenderer(entry, index) {
        const {
            childWeightEntries
        } = this.props;

        return (
            <WeightTableRow
                key={index}
                entries={childWeightEntries}
                entry={entry}
                index={index}
                handleEditClick={this.handleEditClick}
                handleRemoveClick={this.handleRemoveClick}
            />
        );
    }
    renderContent() {
        const {
            childWeightEntries
        } = this.props;

        if (childWeightEntries.length) {
            return (
                <PerfectScrollBar className="scrollbar-space">
                    <DataTable
                        data={childWeightEntries}
                        tableHeadRenderer={this.weightTableHeaderRenderer}
                        tableRowRenderer={this.weightTableRowRenderer}
                    />
                </PerfectScrollBar>
            );
        } else {
            return <EmptyData/>;
        }
    }
    @boundMethod
    onEditedEntryDateChange(e) {
        const {
            value
        } = e.target;

        this.setState({
            editedEntryNewDateValue: value
        });
    }
    @boundMethod
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
    @boundMethod
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
            editedEntry,
            editedEntryNewChildWeightValue,
            editedEntryNewDateValue,
            entrySelectedToDelete,
            isAddingEntry,
            newEntryDateValue,
            newEntryChildWeightValue
        } = this.state;
        const {
            childWeightEntries
        } = this.props;

        return (
            <div className="weight-wrapper">
                <div className="weight-add-entry-wrapper">
                    <Button
                        onClick={this.handleAddEntryClick}
                    >
                        Add weight entry
                    </Button>
                </div>
                <div className="data-wrapper">
                    {this.renderContent()}
                </div>
                <WeightChart data={childWeightEntries}/>
                <ConfirmModal
                    title="Edit weight entry"
                    visible={!!editedEntry}
                    bodyRenderer={this.editEntryModalBodyRenderer}
                    onCancel={this.handleCancelEdit}
                    onConfirm={this.handleConfirmEdit}
                    confirmEnabled={!!editedEntryNewDateValue && !!editedEntryNewChildWeightValue}
                />
                <ConfirmModal
                    title="Confirm delete"
                    visible={!!entrySelectedToDelete}
                    onCancel={this.handleRejectRemove}
                    onConfirm={this.handleConfirmRemove}
                    bodyRenderer={this.deleteEntryModalBodyRenderer}
                />
                <ConfirmModal
                    title="Add new entry"
                    visible={isAddingEntry}
                    onCancel={this.handleAddEntryCancel}
                    onConfirm={this.handleAddEntryConfirm}
                    bodyRenderer={this.addEntryModalBodyRenderer}
                    confirmEnabled={!!newEntryDateValue && !!newEntryChildWeightValue}
                />
            </div>
        );
    }
}
