import React from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';
import {
    FormGroup,
    FormControl,
    HelpBlock,
    Button
} from 'react-bootstrap';
import {
    changeLoginInputErrorHint,
    changeLoginInputErrorState,
    changeLoginInputValue,
    changeLoginPasswordInputErrorHint,
    changeLoginPasswordInputErrorState,
    changeLoginPasswordInputValue,
    loginSubmit
} from '../actions/login_actions';

@connect(state => {
    return {
        loginInputValue: state.loginInputValue,
        loginPasswordValue: state.loginPasswordValue,
        loginInputErrorState: state.loginInputErrorState,
        loginInputPasswordErrorState: state.loginInputPasswordErrorState,
        loginInputErrorHint: state.loginInputErrorHint,
        loginPasswordErrorHint: state.loginPasswordErrorHint,
        isSubmitting: state.isSubmitting
    };
}, dispatch => {
    return {
        changeLoginInputValue: value => {
            dispatch(changeLoginInputValue(value));
        },
        changeLoginPasswordInputValue: value => {
            dispatch(changeLoginPasswordInputValue(value));
        },
        changeLoginInputErrorState: status => {
            dispatch(changeLoginInputErrorState(status));
        },
        changeLoginPasswordInputErrorState: status => {
            dispatch(changeLoginPasswordInputErrorState(status));
        },
        changeLoginInputErrorHint: hint => {
            dispatch(changeLoginInputErrorHint(hint));
        },
        changeLoginPasswordInputErrorHint: hint => {
            dispatch(changeLoginPasswordInputErrorHint(hint));
        },
        loginSubmit: data => {
            dispatch(loginSubmit(data));
        }
    };
})
export class LoginForm extends React.Component {
    @autobind
    onLoginInputValueChange(ev) {
        const {
            changeLoginInputValue
        } = this.props;

        changeLoginInputValue(ev.target.value);
    }
    @autobind
    onLoginPasswordInputChange(ev) {
        const {
            changeLoginPasswordInputValue
        } = this.props;

        changeLoginPasswordInputValue(ev.target.value);
    }
    @autobind
    getLoginInputValidationState() {
        const {
            loginInputValue,
            changeLoginInputErrorHint
        } = this.props;
        const emptyInput = 0 === loginInputValue.length;

        if (emptyInput) {
            changeLoginInputErrorHint('Enter your login');
        } else {
            changeLoginInputErrorHint('');
        }
        return emptyInput ? 'error' : null;
    }
    @autobind
    getLoginPasswordInputValidationState() {
        const {
            loginPasswordValue,
            changeLoginPasswordInputErrorHint
        } = this.props;

        if (0 === loginPasswordValue.length) {
            changeLoginPasswordInputErrorHint('Enter your password')
        }
        return loginPasswordValue.length > 0 ? null : 'error';
    }
    @autobind
    onLoginInputFocus() {
        const {
            changeLoginInputErrorState,
            changeLoginInputErrorHint
        } = this.props;

        changeLoginInputErrorHint('');
        changeLoginInputErrorState(null);
    }
    @autobind
    onLoginInputBlur() {
        const {
            changeLoginInputErrorState
        } = this.props;

        changeLoginInputErrorState(this.getLoginInputValidationState());
    }
    @autobind
    onLoginPasswordInputFocus() {
        const {
            changeLoginPasswordInputErrorState,
            changeLoginPasswordInputErrorHint
        } = this.props;

        changeLoginPasswordInputErrorHint('');
        changeLoginPasswordInputErrorState(null);
    }
    @autobind
    onLoginPasswordInputBlur() {
        const {
            changeLoginPasswordInputErrorState,
        } = this.props;

        changeLoginPasswordInputErrorState(this.getLoginPasswordInputValidationState());
    }
    @autobind
    onSubmit(ev) {
        const {
            loginInputValue,
            loginPasswordValue,
            loginSubmit
        } = this.props;

        ev.preventDefault();
        loginSubmit({
            user: loginInputValue,
            password: loginPasswordValue
        });
    }

    render() {
        const {
            loginInputValue,
            loginPasswordValue,
            loginInputErrorState,
            loginInputPasswordErrorState,
            loginInputErrorHint,
            loginPasswordErrorHint,
            isSubmitting
        } = this.props;
        const submitDisabled = (
            'error' === loginInputErrorState ||
            'error' === loginInputPasswordErrorState ||
            isSubmitting
        );

        return (
            <form className="form-container" onSubmit={this.onSubmit}>
                <FormGroup
                    controlId="loginInput"
                    validationState={loginInputErrorState}
                    className="form-group"
                >
                    <FormControl
                        type="text"
                        value={loginInputValue}
                        placeholder="Login"
                        onChange={this.onLoginInputValueChange}
                        onFocus={this.onLoginInputFocus}
                        onBlur={this.onLoginInputBlur}
                    />
                    <FormControl.Feedback/>
                    <HelpBlock className="form-hint">{loginInputErrorHint}</HelpBlock>
                </FormGroup>
                <FormGroup
                    controlId="loginPassword"
                    validationState={loginInputPasswordErrorState}
                    bsClass="form-group"
                >
                    <FormControl
                        type="password"
                        value={loginPasswordValue}
                        placeholder="Password"
                        onChange={this.onLoginPasswordInputChange}
                        onFocus={this.onLoginPasswordInputFocus}
                        onBlur={this.onLoginPasswordInputBlur}
                    />
                    <FormControl.Feedback/>
                    <HelpBlock className="form-hint">{loginPasswordErrorHint}</HelpBlock>
                </FormGroup>
                <Button
                    type="submit"
                    disabled={submitDisabled}
                    className="center-horizontal"
                    onClick={this.onSubmit}
                >
                    Login
                    <div className={`loader-button ${isSubmitting ? 'loader-visible' : ''}`}/>
                </Button>
            </form>
        );
    }
}