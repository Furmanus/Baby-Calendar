import React from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';
import {
    FormGroup,
    FormControl,
    ControlLabel,
    Button,
    HelpBlock
} from 'react-bootstrap';
import {
    hideRegisterFormError,
    registerUser,
    setRegisterLoginValidation,
    setRegisterPasswordValidation,
    setRegisterRepeatPasswordValidation
} from '../actions/login_actions';

@connect(state => {
    return {
        isSubmitting: state.isSubmitting,
        registerFormError: state.registerFormError,
        loginValidationState: state.loginValidationState,
        passwordValidationState: state.passwordValidationState,
        repeatPasswordValidationState: state.repeatPasswordValidationState
    };
}, dispatch => {
    return {
        registerUser: data => {
            dispatch(registerUser(data));
        },
        hideRegisterFormError: () => {
            dispatch(hideRegisterFormError());
        },
        setRegisterLoginValidation: state => {
            dispatch(setRegisterLoginValidation(state));
        },
        setRegisterPasswordValidation: state => {
            dispatch(setRegisterPasswordValidation(state));
        },
        setRegisterRepeatPasswordValidation: state => {
            dispatch(setRegisterRepeatPasswordValidation(state));
        }
    };
})
export class RegisterForm extends React.Component {
    state = {
        loginInputState: '',
        passwordInputState: '',
        repeatPasswordInputState: ''
    };
    @autobind
    setLoginValidationState() {
        const {
            setRegisterLoginValidation
        } = this.props;
        const {
            loginInputState
        } = this.state;

        setRegisterLoginValidation(loginInputState.length === 0 ? 'error' : null);
    }
    @autobind
    setPasswordValidationState() {
        const {
            setRegisterPasswordValidation
        } = this.props;
        const {
            passwordInputState,
            repeatPasswordInputState
        } = this.state;
        const isPasswordEmpty = passwordInputState.length === 0;
        const arePasswordsEqual = passwordInputState === repeatPasswordInputState;

        setRegisterPasswordValidation(isPasswordEmpty || !arePasswordsEqual ? 'error' : null);
    }
    @autobind
    setRepeatPasswordValidationState() {
        const {
            setRegisterRepeatPasswordValidation
        } = this.props;
        const {
            passwordInputState,
            repeatPasswordInputState
        } = this.state;
        const isPasswordEmpty = repeatPasswordInputState.length === 0;
        const arePasswordsEqual = passwordInputState === repeatPasswordInputState;

        setRegisterRepeatPasswordValidation(isPasswordEmpty || !arePasswordsEqual ? 'error' : null);
    }
    @autobind
    onSubmit(e) {
        this.setLoginValidationState();
        this.setPasswordValidationState();
        this.setRepeatPasswordValidationState();

        const {
            loginInputState,
            passwordInputState,
            repeatPasswordInputState
        } = this.state;
        const {
            registerUser
        } = this.props;

        e.preventDefault();

        if (
            loginInputState &&
            passwordInputState &&
            repeatPasswordInputState &&
            passwordInputState === repeatPasswordInputState
        ) {
            registerUser({
                user: loginInputState,
                password: passwordInputState
            });
        }
    }
    @autobind
    onLoginInputValueChange(e) {
        this.setState({
            loginInputState: e.target.value
        });
    }
    @autobind
    onLoginInputFocus() {
        const {
            hideRegisterFormError,
            setRegisterLoginValidation
        } = this.props;

        hideRegisterFormError();
        setRegisterLoginValidation(null);
    }
    @autobind
    onPasswordInputChange(e) {
        this.setState({
            passwordInputState: e.target.value
        });
    }
    @autobind
    onPasswordInputFocus() {
        const {
            hideRegisterFormError,
            setRegisterPasswordValidation
        } = this.props;

        hideRegisterFormError();
        setRegisterPasswordValidation(null);
    }
    @autobind
    onPasswordRepeatInputChange(e) {
        this.setState({
            repeatPasswordInputState: e.target.value
        });
    }
    @autobind
    onPasswordRepeatInputFocus() {
        const {
            hideRegisterFormError,
            setRegisterRepeatPasswordValidation
        } = this.props;

        hideRegisterFormError();
        setRegisterRepeatPasswordValidation(null);
    }
    render() {
        const {
            loginInputState,
            passwordInputState,
            repeatPasswordInputState
        } = this.state;
        const {
            isSubmitting,
            registerFormError,
            loginValidationState,
            passwordValidationState,
            repeatPasswordValidationState
        } = this.props;
        const submitDisabled =
            loginValidationState === 'error' ||
            passwordValidationState === 'error' ||
            repeatPasswordValidationState === 'error' ||
            !loginInputState.length ||
            !passwordInputState.length ||
            !repeatPasswordInputState.length;

        return (
            <form className="form-container" onSubmit={this.onSubmit}>
                <FormGroup
                    controlId="registerInput"
                    validationState={loginValidationState}
                    className="form-group"
                >
                    <ControlLabel>Login:</ControlLabel>
                    <FormControl
                        type="text"
                        value={loginInputState}
                        placeholder="Enter login"
                        onChange={this.onLoginInputValueChange}
                        onFocus={this.onLoginInputFocus}
                    />
                    <FormControl.Feedback/>
                </FormGroup>
                <FormGroup
                    controlId="loginPassword"
                    validationState={passwordValidationState}
                    bsClass="form-group"
                >
                    <ControlLabel>Password:</ControlLabel>
                    <FormControl
                        type="password"
                        value={passwordInputState}
                        placeholder="Enter password"
                        onChange={this.onPasswordInputChange}
                        onFocus={this.onPasswordInputFocus}
                    />
                    <FormControl.Feedback/>
                </FormGroup>
                <FormGroup
                    controlId="loginRepeatPassword"
                    validationState={repeatPasswordValidationState}
                    bsClass="form-group"
                >
                    <ControlLabel>Repeat password:</ControlLabel>
                    <FormControl
                        type="password"
                        value={repeatPasswordInputState}
                        placeholder="Repeat password"
                        onChange={this.onPasswordRepeatInputChange}
                        onFocus={this.onPasswordRepeatInputFocus}
                    />
                    <FormControl.Feedback/>
                    <HelpBlock className="form-hint">{registerFormError}</HelpBlock>
                </FormGroup>
                <Button
                    type="submit"
                    disabled={submitDisabled}
                    className="center-horizontal"
                    onClick={this.onSubmit}
                >
                    Register
                    <div className={`loader-button ${isSubmitting ? 'loader-visible' : ''}`}/>
                </Button>
            </form>
        );
    }
}