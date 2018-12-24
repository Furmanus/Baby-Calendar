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
    Table
} from 'react-bootstrap';
import PerfectScrollBar from 'react-perfect-scrollbar';
import {AppInoculationTableRow} from '../components/AppInoculationTableRow';

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
        editedIndex: -1
    };
    @autobind
    handleRemoveClick(inoculationEntry) {
        const {
            deleteUserData
        } = this.props;

        deleteUserData(inoculationEntry);
    }
    @autobind
    handleEditClick(index) {
        this.setState({
            editedIndex: index
        });
    }
    @autobind
    handleCancelEdit() {
        this.setState({
            editedIndex: -1
        });
    }
    @autobind
    handleConfirmEdit(inoculationEntry, originalInoculationEntry) {
        const {
            replaceUserData
        } = this.props;

        replaceUserData(inoculationEntry, originalInoculationEntry);
    }
    @autobind
    renderContent() {
        const {
            childInoculationsEntries
        } = this.props;
        const {
            editedIndex
        } = this.state;

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
                                index={index}
                                date={entry.inoculationDate}
                                description={entry.description}
                                isEntryEdited={index === editedIndex}
                                key={index}
                                handleRemoveClick={this.handleRemoveClick}
                                handleEditClick={this.handleEditClick}
                                handleCancelEdit={this.handleCancelEdit}
                                handleConfirmEdit={this.handleConfirmEdit}
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

        return (
            <div className="inoculation-wrapper">
                <div className="data-wrapper full-height">
                    {this.renderContent()}
                </div>
                <div className="inoculation-form-wrapper">
                    <AddInoculationEntryForm
                        isSubmitting={isSubmitting}
                        updateUserData={updateUserData}
                    />
                </div>
            </div>
        );
    }
}