import React from 'react';
import autobind from 'autobind-decorator';
import propTypes from 'prop-types';
import {
    FaRegTrashAlt,
    FaEdit
} from 'react-icons/fa';
import {AppInoculationTableRowEditForm} from './AppInoculationTableRowEditForm';

export class AppInoculationTableRow extends React.Component {
    static propTypes = {
        index: propTypes.number.isRequired,
        date: propTypes.string.isRequired,
        isEntryEdited: propTypes.bool,
        handleEditClick: propTypes.func,
        handleRemoveClick: propTypes.func,
        handleCancelEdit: propTypes.func,
        handleConfirmEdit: propTypes.func,
        description: propTypes.string
    };
    static defaultProps = {
        description: '',
        isEntryEdited: false,
        handleEditClick: () => {},
        handleRemoveClick: () => {},
        handleConfirmEdit: () => {},
        handleCancelEdit: () => {}
    };
    @autobind
    onEditClick() {
        const {
            handleEditClick,
            index
        } = this.props;

        handleEditClick(index);
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
    @autobind
    renderRow() {
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
    render() {
        const {
            isEntryEdited,
            date,
            description,
            handleCancelEdit,
            handleConfirmEdit
        } = this.props;

        return (
            isEntryEdited ?
                <AppInoculationTableRowEditForm
                    inoculationDate={date}
                    description={description}
                    handleCancelEdit={handleCancelEdit}
                    handleConfirmEdit={handleConfirmEdit}
                /> :
                this.renderRow()
        );
    }

}