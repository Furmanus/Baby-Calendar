import React from 'react';
import {
    FormControl
} from 'react-bootstrap';
import autobind from 'autobind-decorator';
import {
    FaRegCheckSquare,
    FaRegWindowClose
} from 'react-icons/fa';


export class AppWeightTableRowEditForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            childWeight: props.originalEntry.childWeight,
            weightDate: props.originalEntry.weightDate
        };
    }
    @autobind
    handleWeightChange(e) {
        const {
            value
        } = e.target;

        if (!isNaN(Number(value))) {
            this.setState({
                childWeight: value
            });
        }
    }
    @autobind
    handleDateChange(e) {
        const {
            value
        } = e.target;

        this.setState({
            weightDate: value
        });
    }
    @autobind
    handleConfirmEdit() {
        const {
            handleConfirmEdit,
            originalEntry
        } = this.props;
        const {
            childWeight,
            weightDate
        } = this.state;

        handleConfirmEdit(childWeight, weightDate, originalEntry);

    }
    render() {
        const {
            childWeight,
            weightDate
        } = this.state;
        const {
            handleCancelEdit
        } = this.props;

        return (
            <tr>
                <td className="data-table-cell-wide ">
                    <FormControl
                        className="weight-form-input"
                        type="text"
                        placeholder="Edit child weight"
                        value={childWeight}
                        onChange={this.handleWeightChange}
                    />
                </td>
                <td className="data-table-cell-wide">
                    <FormControl
                        className="weight-form-input"
                        type="date"
                        value={weightDate}
                        placeholder="Enter date"
                        onChange={this.handleDateChange}
                    />
                </td>
                <td/>
                <td/>
                <td>
                    <FaRegWindowClose
                        className="icon"
                        size={18}
                        onClick={handleCancelEdit}
                    />
                </td>
                <td>
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