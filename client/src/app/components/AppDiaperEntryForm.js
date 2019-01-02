import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import {
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from 'react-bootstrap';

export class AppDiaperEntryForm extends React.Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        isSubmitting: PropTypes.bool
    };
    static defaultProps = {
        isSubmitting: false
    };
    state = {
        date: ''
    };
    @autobind
    validateFormCompletion() {
        return !this.state.date;
    }
    @autobind
    handleDateChange(e) {
        this.setState({
            date: e.target.value
        });
    }
    @autobind
    handleSubmit(e) {
        const {
            handleSubmit
        } = this.props;
        const {
            date
        } = this.state;

        e.preventDefault();

        if (date) {
            handleSubmit(date);
        }
    }
    render() {
        const {
            isSubmitting
        } = this.props;

        return (
            <div className="diaper-form-wrapper">
                <p>Add diaper entry</p>
                <Form className="diaper-form-content" inline>
                    <FormGroup
                        controlId="diaperForm"
                    >
                        <ControlLabel>
                            Date:
                        </ControlLabel>
                        <FormControl
                            type="date"
                            placeholder="Enter date"
                            value={this.state.date}
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