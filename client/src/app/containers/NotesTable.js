import React from 'react';
import autobind from 'autobind-decorator';
import {connect} from 'react-redux';
import {EmptyData} from '../components/EmptyData';
import {
    Button,
    Form,
    FormControl,
    FormGroup,
    ControlLabel
} from 'react-bootstrap';
import {ConfirmModal} from '../components/ConfirmModal';
import {
    deleteUserDataRecord,
    replaceUserData,
    updateUserData
} from '../actions/app_actions';
import {DataTable} from '../components/DataTable';
import PerfectScrollBar from 'react-perfect-scrollbar';
import {InfectionTableRow} from '../components/InfectionTableRow';
import {scrollPageToBottom} from '../utility/utility';
import {NoteTableRow} from '../components/NoteTableRow';
//TODO rewrite InfectionsTable and InoculationsTable and NotesTable to one generic container
@connect(state => {
    return {
        childNotesEntries: state.childNotesEntries
    };
}, dispatch => {
    return {
        updateUserData: data => {
            dispatch(updateUserData(data));
        },
        replaceUserData: (noteEntry, originalNoteEntry) => {
            dispatch(replaceUserData({
                noteEntry,
                originalNoteEntry
            }));
        },
        deleteUserData: noteEntry => {
            dispatch(deleteUserDataRecord(noteEntry));
        }
    };
})
export class NotesTable extends React.Component {
    state = {
        editedEntry: null,
        entrySelectedToDelete: null,
        isAddingEntry: false,
        newEntryDescriptionValue: '',
        newEntryDateValue: '',
        editedEntryNewDescriptionValue: '',
        editedEntryNewDateValue: ''
    };
    componentDidMount() {
        scrollPageToBottom();
    }
    @autobind
    handleAddEntryClick() {
        this.setState({
            isAddingEntry: true
        });
    }
    @autobind
    handleAddEntryCancel() {
        this.setState({
            isAddingEntry: false,
            newEntryDescriptionValue: '',
            newEntryDateValue: ''
        });
    }
    @autobind
    handleAddEntryConfirm() {
        const {
            updateUserData
        } = this.props;
        const {
            newEntryDateValue,
            newEntryDescriptionValue
        } = this.state;

        if (newEntryDateValue && newEntryDescriptionValue) {
            this.setState({
                isAddingEntry: false,
                newEntryDescriptionValue: '',
                newEntryDateValue: ''
            });

            updateUserData({
                childNoteEntry: {
                    date: newEntryDateValue,
                    description: newEntryDescriptionValue
                }
            });
        }
    }
    @autobind
    onNewEntryDateChange(e) {
        this.setState({
            newEntryDateValue: e.target.value
        });
    }
    @autobind
    onNewEntryDescriptionChange(e) {
        const {
            value
        } = e.target;

        if (value.length < 160) {
            this.setState({
                newEntryDescriptionValue: value
            });
        }
    }
    @autobind
    addEntryModalBodyRenderer() {
        const {
            newEntryDescriptionValue,
            newEntryDateValue
        } = this.state;

        return (
            <div>
                <Form>
                    <FormGroup controlId="addNote">
                        <ControlLabel>Date:</ControlLabel>
                        <FormControl
                            type="date"
                            value={newEntryDateValue}
                            placeholder="Enter date"
                            onChange={this.onNewEntryDateChange}
                        />
                        <ControlLabel>Note description:</ControlLabel>
                        <FormControl
                            componentClass="textarea"
                            className="no-resize"
                            value={newEntryDescriptionValue}
                            placeholder="Enter description"
                            onChange={this.onNewEntryDescriptionChange}
                        />
                    </FormGroup>
                </Form>
            </div>
        );
    }
    @autobind
    onEditedNoteDateChange(e) {
        this.setState({
            editedEntryNewDateValue: e.target.value
        });
    }
    @autobind
    onEditedNoteDescriptionChange(e) {
        const {
            value
        } = e.target;

        if (value !== undefined && value.length < 160) {
            this.setState({
                editedEntryNewDescriptionValue: value
            });
        }
    }
    @autobind
    editNoteModalBodyRenderer() {
        const {
            editedEntryNewDescriptionValue,
            editedEntryNewDateValue
        } = this.state;

        return (
            <div className="modal-inoculation-wrapper">
                <ControlLabel>Pick new date: </ControlLabel>
                <FormControl
                    placeholder="Enter date"
                    type="date"
                    value={editedEntryNewDateValue}
                    onChange={this.onEditedNoteDateChange}
                />
                <ControlLabel>Enter new description: </ControlLabel>
                <FormControl
                    placeholder="Enter description"
                    className="no-resize"
                    componentClass="textarea"
                    value={editedEntryNewDescriptionValue}
                    onChange={this.onEditedNoteDescriptionChange}
                />
            </div>
        );
    }
    @autobind
    handleEditClick(noteEntry) {
        if (noteEntry) {
            this.setState({
                editedEntry: noteEntry,
                editedEntryNewDescriptionValue: noteEntry.description,
                editedEntryNewDateValue: noteEntry.date
            });
        }
    }
    @autobind
    handleCancelEdit() {
        this.setState({
            editedEntry: null,
            editedEntryNewDescriptionValue: '',
            editedEntryNewDateValue: ''
        });
    }
    @autobind
    handleConfirmEdit() {
        const {
            replaceUserData
        } = this.props;
        const {
            editedEntryNewDateValue,
            editedEntryNewDescriptionValue,
            editedEntry
        } = this.state;

        if (editedEntryNewDateValue && editedEntryNewDescriptionValue) {
            replaceUserData({
                date: editedEntryNewDateValue,
                description: editedEntryNewDescriptionValue
            }, editedEntry);

            this.setState({
                editedEntryNewDateValue: '',
                editedEntryNewDescriptionValue: '',
                editedEntry: null
            });
        }
    }
    @autobind
    handleRemoveClick(noteEntry) {
        this.setState({
            entrySelectedToDelete: noteEntry
        });
    }
    @autobind
    handleRemoveReject() {
        this.setState({
            entrySelectedToDelete: null
        });
    }
    @autobind
    handleRemoveConfirm() {
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
    deleteEntryModalBodyRenderer() {
        return (
            <p>Are you sure you want to delete selected entry?</p>
        );
    }
    @autobind
    notesTableHeaderRenderer() {
        return (
            <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Edit</th>
                <th>Remove</th>
            </tr>
        );
    }
    @autobind
    notesTableRowRenderer(entry, index) {
        const {
            date,
            description
        } = entry;

        return (
            <NoteTableRow
                date={date}
                description={description}
                index={index}
                key={index}
                handleEditClick={this.handleEditClick}
                handleRemoveClick={this.handleRemoveClick}
            />
        );
    }
    @autobind
    renderContent() {
        const {
            childNotesEntries
        } = this.props;

        if (childNotesEntries.length) {
            return <PerfectScrollBar className="scrollbar-space">
                <DataTable
                    data={childNotesEntries}
                    tableHeadRenderer={this.notesTableHeaderRenderer}
                    tableRowRenderer={this.notesTableRowRenderer}
                />
            </PerfectScrollBar>;
        }
        return <EmptyData/>;
    }
    render() {
        const {
            editedEntry,
            entrySelectedToDelete,
            isAddingEntry,
            newEntryDescriptionValue,
            newEntryDateValue,
            editedEntryNewDescriptionValue,
            editedEntryNewDateValue
        } = this.state;

        return (
            <div className="inoculation-wrapper">
                <div className="inoculation-add-entry-wrapper">
                    <Button
                        onClick={this.handleAddEntryClick}
                    >
                        Add note entry
                    </Button>
                </div>
                <div className="data-wrapper full-height">
                    {this.renderContent()}
                </div>
                <ConfirmModal
                    title="Edit infection entry"
                    visible={!!editedEntry}
                    confirmEnabled={!!editedEntryNewDescriptionValue && !!editedEntryNewDateValue}
                    bodyRenderer={this.editNoteModalBodyRenderer}
                    onCancel={this.handleCancelEdit}
                    onConfirm={this.handleConfirmEdit}
                />
                <ConfirmModal
                    title="Confirm delete"
                    visible={!!entrySelectedToDelete}
                    onCancel={this.handleRemoveReject}
                    onConfirm={this.handleRemoveConfirm}
                    bodyRenderer={this.deleteEntryModalBodyRenderer}
                />
                <ConfirmModal
                    title="Add new entry"
                    visible={isAddingEntry}
                    onCancel={this.handleAddEntryCancel}
                    onConfirm={this.handleAddEntryConfirm}
                    bodyRenderer={this.addEntryModalBodyRenderer}
                    confirmEnabled={!!newEntryDescriptionValue && !!newEntryDateValue}
                />
            </div>
        );
    }
}