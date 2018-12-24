import React from 'react';
import autobind from 'autobind-decorator';
import {
    FormControl
} from 'react-bootstrap';
import {
    FaRegCheckSquare,
    FaRegWindowClose
} from 'react-icons/fa';

export class AppInoculationTableRowEditForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inoculationDate: props.inoculationDate,
            description: props.description
        };
    }
    @autobind
    handleDateChange(e) {
        const {
            value
        } = e.target;

        this.setState({
            inoculationDate: value
        });
    }
    @autobind
    handleDescriptionChange(e) {
        const {
            value
        } = e.target;

        if (value.length < 160) {
            this.setState({
                description: value
            });
        }
    }
    @autobind
    handleConfirmEdit() {
        const {
            handleConfirmEdit,
            inoculationDate: originalInoculationDate,
            description: originalDescription
        } = this.props;
        const {
            inoculationDate,
            description
        } = this.state;

        handleConfirmEdit(
            {
                inoculationDate,
                description
            },
            {
                originalInoculationDate,
                originalDescription
            }
        );

    }
    render() {
        const {
            inoculationDate,
            description
        } = this.state;
        const {
            handleCancelEdit
        } = this.props;

        return (
            <tr>
                <td className="middle-align">
                    <FormControl
                        placeholder="Enter date"
                        type="date"
                        value={inoculationDate}
                        onChange={this.handleDateChange}
                    />
                </td>
                <td className="middle-align">
                    <FormControl
                        className="no-resize"
                        placeholder="Enter description"
                        componentClass="textarea"
                        value={description}
                        onChange={this.handleDescriptionChange}
                    />
                </td>
                <td className="middle-align">
                    <FaRegWindowClose
                        className="icon"
                        size={18}
                        onClick={handleCancelEdit}
                    />
                </td>
                <td className="middle-align">
                    <FaRegCheckSquare
                        className="icon"
                        size={18}
                        onClick={this.handleConfirmEdit}
                    />
                </td>
            </tr>
        );
    }
}