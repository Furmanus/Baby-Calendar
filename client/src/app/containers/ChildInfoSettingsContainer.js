import React from 'react';
import {connect} from 'react-redux';
import {
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from 'react-bootstrap';
import {updateUserData} from '../actions/app_actions';
import {boundMethod} from 'autobind-decorator';

@connect(state => {
    return {
        childname: state.childName,
        birthdate: state.birthdate
    };
}, dispatch => {
    return {
        updateUserData: data => {
            dispatch(updateUserData(data));
        }
    };
})
export class ChildInfoSettingsContainer extends React.Component {
    constructor(props) {
        super(...arguments);

        this.state = {
            childname: props.childname,
            birthdate: props.birthdate,
            isSubmitting: false
        }
    }
    @boundMethod
    handleChangeName(ev) {
        this.setState({
            childname: ev.target.value
        });
    }
    @boundMethod
    handleChangeBirthdate(ev) {
        this.setState({
            birthdate: ev.target.value
        });
    }
    @boundMethod
    handleSubmit(ev) {
        const {
            updateUserData
        } = this.props;
        const {
            birthday: propsBirthday,
            childname: propsChildname
        } = this.props;
        let {
            birthdate,
            childname
        } = this.state;

        ev.preventDefault();

        if (birthdate || childname) {
            this.setState({
                isSubmitting: true
            });

            updateUserData({
                birthdate: birthdate || propsBirthday,
                childname: childname || propsChildname
            });
        }
    }
    render() {
        const {
            isSubmitting,
        } = this.state;

        return (
            <form className="settings-wrapper">
                <FormGroup controlId="childname">
                    <ControlLabel>Enter child name:</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.childname}
                        onChange={this.handleChangeName}
                    />
                </FormGroup>
                <FormGroup controlId="birthdate">
                    <ControlLabel>Pick date of birth:</ControlLabel>
                    <FormControl
                        type="date"
                        value={this.state.birthdate}
                        onChange={this.handleChangeBirthdate}
                    />
                </FormGroup>
                <Button
                    type="submit"
                    className="center-horizontal"
                    onClick={this.handleSubmit}
                >
                    Submit
                    <div className={`loader-button ${isSubmitting ? 'loader-visible' : ''}`}/>
                </Button>
            </form>
        );
    }
}
