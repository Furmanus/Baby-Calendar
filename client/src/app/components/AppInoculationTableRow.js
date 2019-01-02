import React from 'react';
import autobind from 'autobind-decorator';
import propTypes from 'prop-types';
import {
    FaRegTrashAlt,
    FaEdit
} from 'react-icons/fa';

export class AppInoculationTableRow extends React.Component {
    static propTypes = {
        date: propTypes.string.isRequired,
        handleEditClick: propTypes.func,
        handleRemoveClick: propTypes.func,
        description: propTypes.string
    };
    static defaultProps = {
        description: '',
        handleEditClick: () => {},
        handleRemoveClick: () => {}
    };
    @autobind
    onEditClick() {
        const {
            handleEditClick,
            date,
            description
        } = this.props;

        handleEditClick({
            inoculationDate: date,
            description: description
        });
    }
    @autobind
    onRemoveClick() {
        const {
            handleRemoveClick,
            date,
            description
        } = this.props;

        handleRemoveClick({
            childInoculationEntry: {
                inoculationDate: date,
                description
            }
        });
    }
    render() {
        const {
            date,
            description
        } = this.props;
        return (
            <tr>
                <td className="inoculation-table-cell-date inoculation-table-cell middle-align">{date}</td>
                <td className="inoculation-table-cell-description inoculation-table-cell middle-align">{description}</td>
                <td className="middle-align">
                    <FaEdit
                        className="icon"
                        size={18}
                        onClick={this.onEditClick}
                    />
                </td>
                <td className="middle-align">
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