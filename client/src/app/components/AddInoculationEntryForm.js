import React from 'react';
import {
    Form,
    FormControl,
    ControlLabel,
    Button,
    FormGroup
} from 'react-bootstrap';
import autobind from 'autobind-decorator';

export class AddInoculationEntryForm extends React.Component {
    state = {
        inoculationDate: '',
        description: ''
    };
    @autobind
    handleInoculationDateChange(e) {
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
    isFormDataValid() {
        const {
            inoculationDate,
            description
        } = this.state;

        return Boolean(inoculationDate && description && description.length < 160);
    }
    @autobind
    handleSubmit(e) {
        const {
            inoculationDate,
            description
        } = this.state;
        const {
            updateUserData
        } = this.props;

        e.preventDefault();

        if (this.isFormDataValid()) {
            updateUserData({
                childInoculationEntry: {
                    inoculationDate,
                    description
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
                <p>Add inoculation entry</p>
                <Form>
                    <FormGroup
                        controlId="formInoculation"
                    >
                        <ControlLabel>Inoculation date:</ControlLabel>
                        <FormControl
                            className="inoculation-form-input"
                            type="date"
                            value={this.state.inoculationDate}
                            placeholder="Enter date"
                            onChange={this.handleInoculationDateChange}
                        />
                        <ControlLabel>Description:</ControlLabel>
                        <FormControl
                            bsSize="small"
                            className="no-resize"
                            componentClass="textarea"
                            value={this.state.description}
                            placeholder="Enter description"
                            onChange={this.handleDescriptionChange}
                        />
                    </FormGroup>
                    <Button
                        type="submit"
                        disabled={!this.isFormDataValid()}
                        onClick={this.handleSubmit}
                        className="center-horizontal"
                    >
                        Submit
                        <div className={`loader-button ${isSubmitting ? 'loader-visible' : ''}`}/>
                    </Button>
                </Form>
            </div>
        );
    }
}