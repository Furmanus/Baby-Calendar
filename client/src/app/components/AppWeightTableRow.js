import React from 'react';
import {
    calculateAverageWeightGain,
    calculateWeightDifference
} from '../../common/helpers/helpers';
import {
    FaRegTrashAlt,
    FaEdit
} from 'react-icons/fa';
import autobind from 'autobind-decorator';
import {AppWeightTableRowEditForm} from './AppWeightTableRowEditForm';

export class AppWeightTableRow extends React.Component {
    @autobind
    onEditClick() {
        const {
            index,
            handleEditClick
        } = this.props;

        handleEditClick(index);
    }
    @autobind
    onRemoveClick() {
        const {
            entry,
            handleRemoveClick
        } = this.props;

        handleRemoveClick(entry);
    }
    @autobind
    renderRow() {
        const {
            entries: childWeightEntries,
            entry,
            index
        } = this.props;

        return (
            <tr>
                <td className="data-table-cell-wide">{Number(entry.childWeight).toFixed(3)} kg</td>
                <td className="data-table-cell-wide">{entry.weightDate}</td>
                <td>{calculateWeightDifference(childWeightEntries, index)}</td>
                <td>{calculateAverageWeightGain(childWeightEntries, index)}</td>
                <td>
                    <FaEdit
                        className="icon"
                        size={18}
                        onClick={this.onEditClick}
                    />
                </td>
                <td>
                    <FaRegTrashAlt
                        className="icon"
                        size={18}
                        onClick={this.onRemoveClick}
                    />
                </td>
            </tr>
        );
    }
    render() {
        const {
            isEntryEdited,
            handleCancelEdit,
            handleConfirmEdit,
            entry
        } = this.props;

        return (
            isEntryEdited ?
                <AppWeightTableRowEditForm
                    handleCancelEdit={handleCancelEdit}
                    handleConfirmEdit={handleConfirmEdit}
                    originalEntry={entry}
                /> :
                this.renderRow()
        );
    }
}