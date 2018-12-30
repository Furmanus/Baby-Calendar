import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import {
    FaEdit,
    FaRegTrashAlt
} from 'react-icons/fa';

export class AppDiaperTableRow extends React.Component {
    static propTypes = {
        date: PropTypes.string.isRequired,
        handleDeleteClick: PropTypes.func.isRequired,
        handleEditClick: PropTypes.func.isRequired
    };
    @autobind
    onEditClick() {
        const {
            date,
            handleEditClick
        } = this.props;

        handleEditClick(date);
    }
    @autobind
    onRemoveClick() {
        const {
            date,
            handleDeleteClick
        } = this.props;

        handleDeleteClick(date);
    }
    render() {
        const {
            date
        } = this.props;

        return (
            <tr>
                <td>{date}</td>
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