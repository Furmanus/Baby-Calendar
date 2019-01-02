import React from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';
import {
    deleteUserDataRecord,
    replaceUserData,
    updateUserData
} from '../actions/app_actions';
import {EmptyData} from '../components/EmptyData';
import {AddInoculationEntryForm} from '../components/AddInoculationEntryForm';
import {
    Table,
    FormControl,
    ControlLabel
} from 'react-bootstrap';
import PerfectScrollBar from 'react-perfect-scrollbar';
import {AppInoculationTableRow} from '../components/AppInoculationTableRow';
import {AppConfirmModal} from '../components/AppConfirmModal';

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
        entrySelectedToDelete: null
    };
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
    @autobind
    renderContent() {
        const {
            childInoculationsEntries
        } = this.props;

        if (childInoculationsEntries.length) {
            return <PerfectScrollBar className="scrollbar-space">
                <Table className="data-table" responsive>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {childInoculationsEntries.map((entry, index) => {
                        return (
                            <AppInoculationTableRow
                                date={entry.inoculationDate}
                                description={entry.description}
                                key={index}
                                handleRemoveClick={this.handleRemoveClick}
                                handleEditClick={this.handleEditClick}
                            />
                        );
                    })}
                    </tbody>
                </Table>
            </PerfectScrollBar>;
        }

        return <EmptyData/>;
    }
    render() {
        const {
            isSubmitting,
            updateUserData
        } = this.props;
        const {
            editedEntry,
            newInoculationDescription,
            newInoculationDate,
            entrySelectedToDelete
        } = this.state;

        return (
            <div className="inoculation-wrapper">
                <div className="inoculation-form-wrapper">
                    <AddInoculationEntryForm
                        isSubmitting={isSubmitting}
                        updateUserData={updateUserData}
                    />
                </div>
                <div className="data-wrapper full-height">
                    {this.renderContent()}
                </div>
                <AppConfirmModal
                    title="Edit inoculation entry"
                    visible={!!editedEntry}
                    confirmEnabled={!!newInoculationDescription && !!newInoculationDate}
                    bodyRenderer={this.editInoculationModalBodyRenderer}
                    onCancel={this.handleCancelEdit}
                    onConfirm={this.handleConfirmEdit}
                />
                <AppConfirmModal
                    title="Confirm delete"
                    visible={!!entrySelectedToDelete}
                    onCancel={this.handleRemoveReject}
                    onConfirm={this.handleRemoveConfirm}
                    bodyRenderer={this.deleteEntryModalBodyRenderer}
                />
            </div>
        );
    }
}