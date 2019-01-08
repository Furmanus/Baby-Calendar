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

export class WeightTableRow extends React.Component {
    @autobind
    onEditClick() {
        const {
            entry,
            handleEditClick
        } = this.props;

        handleEditClick(entry);
    }
    @autobind
    onRemoveClick() {
        const {
            entry,
            handleRemoveClick
        } = this.props;

        handleRemoveClick(entry);
    }
    render() {
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
}