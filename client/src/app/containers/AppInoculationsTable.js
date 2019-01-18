import React from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';
import {
    deleteUserDataRecord,
    replaceUserData,
    updateUserData
} from '../actions/app_actions';
import {EmptyData} from '../components/EmptyData';
import {
    Table,
    FormControl,
    ControlLabel,
    Form,
    FormGroup,
    Button
} from 'react-bootstrap';
import PerfectScrollBar from 'react-perfect-scrollbar';
import {InoculationTableRow} from '../components/InoculationTableRow';
import {ConfirmModal} from '../components/ConfirmModal';
import {DataTable} from '../components/DataTable';

@connect(state => {
    return {
        childInoculationsEntries: state.childInoculationsEntries,
        isSubmitting: state.isSubmitting
    };
}, dispatch => {
    return {
        updateUserData: data => {
            dispatch(updateUserData(data))
        },
        deleteUserData: inoculationEntry => {
            dispatch(deleteUserDataRecord(inoculationEntry));
        },
        replaceUserData: (inoculationEntry, originalInoculationEntry) => {
            dispatch(replaceUserData({
                inoculationEntry,
                originalInoculationEntry
            }));
        }
    };
})
export class AppInoculationsTable extends React.Component {
    state = {
        editedEntry: null,
        newInoculationDate: '',
        newInoculationDescription: '',
        entrySelectedToDelete: null,
        isAddingEntry: false,
        newEntryDateValue: '',
        newEntryDescriptionValue: ''
    };
    componentDidUpdate(prevProps, prevState) {
        const {
            editedEntry: prevEditedEntry
        } = prevState;
        const {
            editedEntry
        } = this.state;

        if (null === prevEditedEntry && null !== editedEntry) {
            this.setState({
                newInoculationDate: editedEntry.inoculationDate,
                newInoculationDescription: editedEntry.description
            });
        }
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
            newEntryDateValue: '',
            newEntryDescriptionValue: ''
        });
    }
    @autobind
    handleAddEntryConfirm() {
        const {
            newEntryDateValue,
            newEntryDescriptionValue
        } = this.state;
        const {
            updateUserData
        } = this.props;

        if (newEntryDateValue && newEntryDescriptionValue) {
            this.setState({
                isAddingEntry: false,
                newEntryDateValue: '',
                newEntryDescriptionValue: ''
            });

            updateUserData({
                childInoculationEntry: {
                    inoculationDate: newEntryDateValue,
                    description: newEntryDescriptionValue
                }
            });
        }
    }
    @autobind
    onNewEntryDateChange(e) {
        const {
            value
        } = e.target;

        if (value) {
            this.setState({
                newEntryDateValue: value
            });
        }
    }
    @autobind
    onNewEntryDescriptionChange(e) {
        const {
            value
        } = e.target;

        if (value !== undefined && value.length < 160) {
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
                    <FormGroup controlId="addInoculation">
                        <ControlLabel>Date:</ControlLabel>
                        <FormControl
                            type="date"
                            value={newEntryDateValue}
                            placeholder="Enter date"
                            onChange={this.onNewEntryDateChange}
                        />
                        <ControlLabel>Description:</ControlLabel>
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
    handleRemoveClick(inoculationEntry) {
        if (inoculationEntry) {
            this.setState({
                entrySelectedToDelete: inoculationEntry
            });
        }
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
    handleRemoveReject() {
        this.setState({
            entrySelectedToDelete: null
        });
    }
    @autobind
    deleteEntryModalBodyRenderer() {
        return (
            <p>Are you sure you want to delete selected entry?</p>
        );
    }
    @autobind
    handleEditClick(entry) {
        this.setState({
            editedEntry: entry
        });
    }
    @autobind
    handleCancelEdit() {
        this.setState({
            editedEntry: null,
            newInoculationDate: '',
            newInoculationDescription: ''
        });
    }
    @autobind
    handleConfirmEdit() {
        const {
            replaceUserData
        } = this.props;
        const {
            newInoculationDate,
            newInoculationDescription,
            editedEntry
        } = this.state;

        if (newInoculationDate && newInoculationDescription) {
            this.setState({
                editedEntry: null,
                newInoculationDate: '',
                newInoculationDescription: ''
            });

            replaceUserData({
                inoculationDate: newInoculationDate,
                description: newInoculationDescription
            }, editedEntry);
        }
    }
    @autobind
    onEditedInoculationDateChange(e) {
        const {
            value
        } = e.target;

        this.setState({
            newInoculationDate: value
        });
    }
    @autobind
    onEditedInoculationDescriptionChange(e) {
        const {
            value
        } = e.target;

        if (value.length < 160) {
            this.setState({
                newInoculationDescription: value
            });
        }
    }
    @autobind
    editInoculationModalBodyRenderer() {
        const {
            newInoculationDate,
            newInoculationDescription
        } = this.state;

        return (
            <div className="modal-inoculation-wrapper">
                <ControlLabel>Pick new date: </ControlLabel>
                <FormControl
                    placeholder="Enter date"
                    type="date"
                    value={newInoculationDate}
                    onChange={this.onEditedInoculationDateChange}
                />
                <ControlLabel>Enter new description: </ControlLabel>
                <FormControl
                    placeholder="Enter description"
                    className="no-resize"
                    componentClass="textarea"
                    value={newInoculationDescription}
                    onChange={this.onEditedInoculationDescriptionChange}
                />
            </div>
        );
    }
    inoculationTableHeaderRenderer() {
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
    inoculationTableRowRenderer(entry, index) {
        return (
            <InoculationTableRow
                date={entry.inoculationDate}
                description={entry.description}
                key={index}
                handleRemoveClick={this.handleRemoveClick}
                handleEditClick={this.handleEditClick}
            />
        );
    }
    @autobind
    renderContent() {
        const {
            childInoculationsEntries
        } = this.props;

        if (childInoculationsEntries.length) {
            return <PerfectScrollBar className="scrollbar-space">
                <DataTable
                    data={childInoculationsEntries}
                    tableHeadRenderer={this.inoculationTableHeaderRenderer}
                    tableRowRenderer={this.inoculationTableRowRenderer}
                />
            </PerfectScrollBar>;
        }

        return <EmptyData/>;
    }
    render() {
        const {
            editedEntry,
            newInoculationDescription,
            newInoculationDate,
            entrySelectedToDelete,
            isAddingEntry,
            newEntryDateValue,
            newEntryDescriptionValue
        } = this.state;

        return (
            <div className="inoculation-wrapper">
                <div className="inoculation-add-entry-wrapper">
                    <Button
                        onClick={this.handleAddEntryClick}
                    >
                        Add inoculation entry
                    </Button>
                </div>
                <div className="data-wrapper full-height">
                    {this.renderContent()}
                </div>
                <ConfirmModal
                    title="Edit inoculation entry"
                    visible={!!editedEntry}
                    confirmEnabled={!!newInoculationDescription && !!newInoculationDate}
                    bodyRenderer={this.editInoculationModalBodyRenderer}
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