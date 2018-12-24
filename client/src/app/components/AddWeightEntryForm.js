import React from 'react';
import {
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from 'react-bootstrap';
import autobind from 'autobind-decorator';

export class AddWeightEntryForm extends React.Component {
    state = {
        childWeight: '',
        weightDate: ''
    };
    validateFormCompletion() {
        const {
            childWeight,
            weightDate
        } = this.state;
        const isFormDataValid = childWeight && weightDate;

        return !isFormDataValid;
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
        this.validateFormCompletion();
    }
    @autobind
    handleDateChange(e) {
        const {
            value
        } = e.target;

        this.setState({
            weightDate: value
        });
        this.validateFormCompletion();
    }
    @autobind
    handleSubmit(e) {
        const {
            childWeight,
            weightDate
        } = this.state;
        const {
            updateData
        } = this.props;

        e.preventDefault();

        if (childWeight && weightDate) {
            updateData({
                childWeightEntry: {
                    childWeight,
                    weightDate
                }
            });
        }
    }
    render() {
        const {
            isSubmitting
        } = this.props;

        return (
            <div>
                <p>Add weight entry</p>
                <Form className="weight-form-content" inline>
                    <FormGroup
                        controlId="formWeight"
                    >
                        <ControlLabel>Weight:</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.childWeight}
                            placeholder="Enter child weight"
                            onChange={this.handleWeightChange}
                        />
                        <ControlLabel>Date:</ControlLabel>
                        <FormControl
                            type="date"
                            value={this.state.weightDate}
                            placeholder="Enter date"
                            onChange={this.handleDateChange}
                        />
                    </FormGroup>
                    <Button
                        type="submit"
                        disabled={this.validateFormCompletion()}
                        onClick={this.handleSubmit}
                    >
                        Submit
                        <div className={`loader-button ${isSubmitting ? 'loader-visible' : ''}`}/>
                    </Button>
                </Form>
            </div>
        );
    }
}