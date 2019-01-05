import React from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';
import {EmptyData} from '../components/EmptyData';
import PerfectScrollBar from 'react-perfect-scrollbar';
import {AppDiaperTableRow} from '../components/AppDiaperTableRow';
import {AppConfirmModal} from '../components/AppConfirmModal';
import {
    Table,
    FormControl,
    ControlLabel,
    Form,
    FormGroup,
    Button
} from 'react-bootstrap';
import {
    deleteUserDataRecord,
    updateUserData,
    replaceUserData
} from '../actions/app_actions';

@connect(state => {
    return {
        childPoopEntries: state.childPoopEntries,
        isSubmitting: state.isSubmitting
    };
}, dispatch => {
    return {
        updateUserData: data => {
            dispatch(updateUserData(data))
        },
        deleteUserData: childPoopEntry => {
            dispatch(deleteUserDataRecord({
                childPoopEntry
            }));
        },
        replaceUserData: (diaperNewEntry, diaperOldEntry) => {
            dispatch(replaceUserData(diaperNewEntry, diaperOldEntry));
        }
    };
})
export class AppDiaperTable extends React.Component {
    state = {
        isEntryEdited: false,
        editedEntry: null,
        editEntryDateNewValue: '',
        entrySelectedToDelete: null,
        isAddingEntry: false,
        newEntryDateValue: ''
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
                editEntryDateNewValue: editedEntry
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
            newEntryDateValue: ''
        });
    }
    @autobind
    handleAddEntryConfirm() {
        const {
            newEntryDateValue
        } = this.state;
        const {
            updateUserData
        } = this.props;

        if (newEntryDateValue) {
            this.setState({
                isAddingEntry: false,
                newEntryDateValue: ''
            });


            updateUserData({
                childPoopEntry: {
                    date: newEntryDateValue
                }
            });
        }
    }
    @autobind
    onAddEntryDateChange(e) {
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
    addEntryModalBodyRenderer() {
        const {
            newEntryDateValue
        } = this.state;

        return (
            <Form>
                <FormGroup controlId="addDiaper">
                    <ControlLabel>Date:</ControlLabel>
                    <FormControl
                        type="date"
                        value={newEntryDateValue}
                        placeholder="Enter date"
                        onChange={this.onAddEntryDateChange}
                    />
                </FormGroup>
            </Form>
        );
    }
    @autobind
    handleDeleteRowClick(date) {
        if (date) {
            this.setState({
                entrySelectedToDelete: {
                    date
                }
            });
        }
    }
    @autobind
    handleDeleteRowConfirm() {
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
    handleDeleteRowReject() {
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
    handleEditRowClick(entry) {
        if (entry) {
            this.setState({
                isEntryEdited: true,
                editedEntry: entry
            });
        }
    }
    @autobind
    onEditEntryCancel() {
        this.setState({
            isEntryEdited: false,
            editedEntry: null,
            editEntryDateNewValue: ''
        });
    }
    @autobind
    onEditEntryConfirm() {
        const {
            replaceUserData
        } = this.props;
        const {
            editedEntry,
            editEntryDateNewValue
        } = this.state;

        if (editEntryDateNewValue) {
            this.setState({
                isEntryEdited: false,
                editedEntry: null,
                editEntryDateNewValue: ''
            });

            replaceUserData({
                childPoopEntry: {
                    date: editEntryDateNewValue
                },
                originalChildPoopEntry: {
                    date: editedEntry
                }
            });
        }
    }
    @autobind
    onEditEntryDateChange(e) {
        const {
            value
        } = e.target;

        if (value) {
            this.setState({
                editEntryDateNewValue: value
            });
        }
    }
    @autobind
    editEntryModalBodyRenderer() {
        const {
            editEntryDateNewValue
        } = this.state;

        return (
            <div className="modal-diaper-wrapper">
                <ControlLabel>Pick new date: </ControlLabel>
                <FormControl
                    placeholder="Pick date"
                    type="date"
                    value={editEntryDateNewValue}
                    onChange={this.onEditEntryDateChange}
                />
            </div>
        );
    }
    renderContent() {
        const {
            childPoopEntries
        } = this.props;

        if (childPoopEntries && childPoopEntries.length) {
            return (
                <PerfectScrollBar className="scrollbar-space">
                    <Table className="data-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Edit</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                childPoopEntries.map((entry, index) => {
                                    return (
                                        <AppDiaperTableRow
                                            date={entry.date}
                                            key={index}
                                            handleEditClick={this.handleEditRowClick}
                                            handleDeleteClick={this.handleDeleteRowClick}
                                        />
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                </PerfectScrollBar>
            );
        }
        return <EmptyData/>;
    }
    render() {
        const {
            isEntryEdited,
            editEntryDateNewValue,
            entrySelectedToDelete,
            isAddingEntry,
            newEntryDateValue
        } = this.state;

        return (
            <div className="diaper-wrapper">
                <div className="diaper-add-entry-wrapper">
                    <Button
                        onClick={this.handleAddEntryClick}
                    >
                        Add diaper entry
                    </Button>
                </div>
                <div className="data-wrapper">
                    {this.renderContent()}
                </div>
                <AppConfirmModal
                    title="Edit entry"
                    visible={isEntryEdited}
                    onCancel={this.onEditEntryCancel}
                    onConfirm={this.onEditEntryConfirm}
                    bodyRenderer={this.editEntryModalBodyRenderer}
                    confirmEnabled={!!editEntryDateNewValue}
                />
                <AppConfirmModal
                    title="Confirm delete"
                    visible={!!entrySelectedToDelete}
                    onCancel={this.handleDeleteRowReject}
                    onConfirm={this.handleDeleteRowConfirm}
                    bodyRenderer={this.deleteEntryModalBodyRenderer}
                />
                <AppConfirmModal
                    title="Add new entry"
                    visible={isAddingEntry}
                    onCancel={this.handleAddEntryCancel}
                    onConfirm={this.handleAddEntryConfirm}
                    bodyRenderer={this.addEntryModalBodyRenderer}
                    confirmEnabled={!!newEntryDateValue}
                />
            </div>
        );
    }
}