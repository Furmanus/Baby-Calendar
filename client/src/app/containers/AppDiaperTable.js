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
    ControlLabel
} from 'react-bootstrap';
import {
    deleteUserDataRecord,
    updateUserData,
    replaceUserData
} from '../actions/app_actions';
import {AppDiaperEntryForm} from '../components/AppDiaperEntryForm';

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
        editEntryDateNewValue: ''
    };
    componentDidUpdate(prevProps, prevState) {
        const {
            editedEntry
        } = this.state;

        if (editedEntry && editedEntry !== prevState.editedEntry) {
            this.setState({
                editedEntryDateNewValue: editedEntry.date
            });
        }
    }
    @autobind
    handleDeleteRowClick(date) {
        const {
            deleteUserData
        } = this.props;

        deleteUserData({
            date
        });
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
    handleNewEntryFormSubmit(entryDate) {
        const {
            updateUserData
        } = this.props;

        if (entryDate) {
            updateUserData({
                childPoopEntry: {
                    date: entryDate
                }
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
                    <Table>
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
            isSubmitting
        } = this.props;
        const {
            isEntryEdited,
            editEntryDateNewValue
        } = this.state;

        return (
            <div className="diaper-wrapper">
                <AppDiaperEntryForm
                    handleSubmit={this.handleNewEntryFormSubmit}
                    isSubmitting={isSubmitting}
                />
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
            </div>
        );
    }
}