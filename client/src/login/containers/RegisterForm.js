import React from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';
import {
    FormGroup,
    FormControl,
    Button,
    HelpBlock
} from 'react-bootstrap';
import {
    changeRegisterLoginInputState,
    changeRegisterPasswordInputState,
    changeRegisterRepeatPasswordInputState,
    hideRegisterFormError,
    registerUser,
    setRegisterLoginValidation,
    setRegisterPasswordValidation,
    setRegisterRepeatPasswordValidation,
    showRegisterFormError
} from '../actions/login_actions';

@connect(state => {
    return {
        isSubmitting: state.isSubmitting,
        registerFormError: state.registerFormError,
        loginValidationState: state.loginValidationState,
        passwordValidationState: state.passwordValidationState,
        repeatPasswordValidationState: state.repeatPasswordValidationState,
        loginInputState: state.loginInputState,
        passwordInputState: state.passwordInputState,
        repeatPasswordInputState: state.repeatPasswordInputState
    };
}, dispatch => {
    return {
        registerUser: data => {
            dispatch(registerUser(data));
        },
        hideRegisterFormError: () => {
            dispatch(hideRegisterFormError());
        },
        showRegisterFormError: message => {
            dispatch(showRegisterFormError(message));
        },
        setRegisterLoginValidation: state => {
            dispatch(setRegisterLoginValidation(state));
        },
        setRegisterPasswordValidation: state => {
            dispatch(setRegisterPasswordValidation(state));
        },
        setRegisterRepeatPasswordValidation: state => {
            dispatch(setRegisterRepeatPasswordValidation(state));
        },
        changeRegisterLoginInputState: value => {
            dispatch(changeRegisterLoginInputState(value));
        },
        changeRegisterPasswordInputState: value => {
            dispatch(changeRegisterPasswordInputState(value));
        },
        changeRegisterRepeatPasswordInputState: value => {
            dispatch(changeRegisterRepeatPasswordInputState(value));
        }
    };
})
export class RegisterForm extends React.Component {
    @autobind
    setLoginValidationState() {
        const {
            setRegisterLoginValidation,
            showRegisterFormError,
            loginInputState
        } = this.props;
        const isInputEmpty = loginInputState.length === 0;

        showRegisterFormError(isInputEmpty ? 'Please enter your login' : '');
        setRegisterLoginValidation(isInputEmpty ? 'error' : null);
    }
    @autobind
    setPasswordValidationState() {
        const {
            setRegisterPasswordValidation,
            showRegisterFormError,
            passwordInputState,
            repeatPasswordInputState
        } = this.props;
        const isPasswordEmpty = passwordInputState.length === 0;
        const arePasswordsEqual = passwordInputState === repeatPasswordInputState;

        if (!arePasswordsEqual) {
            showRegisterFormError('Passwords doesn\'t match');
        }
        setRegisterPasswordValidation(isPasswordEmpty || !arePasswordsEqual ? 'error' : null);
    }
    @autobind
    setRepeatPasswordValidationState() {
        const {
            setRegisterRepeatPasswordValidation,
            showRegisterFormError,
            passwordInputState,
            repeatPasswordInputState
        } = this.props;
        const isPasswordEmpty = repeatPasswordInputState.length === 0;
        const arePasswordsEqual = passwordInputState === repeatPasswordInputState;

        if (!arePasswordsEqual) {
            showRegisterFormError('Passwords doesn\'t match');
        }
        setRegisterRepeatPasswordValidation(isPasswordEmpty || !arePasswordsEqual ? 'error' : null);
    }
    @autobind
    onSubmit(e) {
        this.setLoginValidationState();
        this.setPasswordValidationState();
        this.setRepeatPasswordValidationState();

        const {
            registerUser,
            loginInputState,
            passwordInputState,
            repeatPasswordInputState
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
        const {
            changeRegisterLoginInputState
        } = this.props;

        changeRegisterLoginInputState(e.target.value);
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
        const {
            changeRegisterPasswordInputState
        } = this.props;

        changeRegisterPasswordInputState(e.target.value);
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
        const {
            changeRegisterRepeatPasswordInputState
        } = this.props;

        changeRegisterRepeatPasswordInputState(e.target.value);
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
            isSubmitting,
            registerFormError,
            loginValidationState,
            passwordValidationState,
            repeatPasswordValidationState,
            loginInputState,
            passwordInputState,
            repeatPasswordInputState
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
                    <FormControl
                        type="text"
                        value={loginInputState}
                        placeholder="Login"
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
                    <FormControl
                        type="password"
                        value={passwordInputState}
                        placeholder="Password"
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