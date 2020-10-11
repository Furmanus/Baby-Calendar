import React from 'react';
import {Box, Button, TextField, Typography, withStyles} from '@material-ui/core';
import {loginTranslations} from '../constants/translations';
import {registerSubmit, loginSubmit} from '../../api/api';
import {
    FORM_LOGIN_INPUT,
    FORM_NAME,
    FORM_PASSWORD_INPUT,
    FORM_REPEAT_PASSWORD_INPUT,
} from '../constants/login_form';
import {
    loginSubmitErrorCodeToComponentStateFields,
    loginSubmitErrorCodeToMessageMap,
} from '../constants/errors';
import {replaceTextVariables} from '../../common/helpers/text';
import {validateRepeatPassword, validateUserLogin, validateUserPassword} from '../helpers/validators';

const LANG = 'en';
const commonInputProps = {
    style: {
        fontSize: 16,
    }
};
const labelProps = {
    style: {
        fontSize: 16,
    },
};
const helperProps = {
    style: {
        fontSize: 10,
        marginLeft: 0,
        minHeight: 16,
        transition: 'color 0.3s ease-in-out',
    },
};
const styles = {
    textField: {
        marginBottom: 0,
    },
};

class LoginPageClass extends React.Component {
    state = {
        loginMode: true,
        loginValue: '',
        passwordValue: '',
        repeatPasswordValue: '',
        loginInputHasError: false,
        passwordInputHasError: false,
        repeatPasswordInputHasError: false,
        repeatPasswordInputHasBeenTouched: false,
    };

    renderLoginInput() {
        const {
            loginMode,
            loginValue,
            loginInputHasError,
        } = this.state;
        let helperText = loginMode ?
            loginTranslations[LANG].LoginPageLoginInputHintLoginMode :
            replaceTextVariables(loginTranslations[LANG].LoginPageLoginInputHintDefault, {
                count: loginValue.length,
            });

        if (loginInputHasError) {
            helperText = loginInputHasError;
        }

        return (
            <TextField
                id="login"
                name={FORM_LOGIN_INPUT}
                className={this.props.classes.textField}
                size="large"
                error={loginInputHasError}
                label={loginTranslations[LANG].LoginPageLoginInputLabel}
                autofocus={true}
                onFocus={this.onLoginInputFocus}
                onBlur={this.onLoginInputBlur}
                InputProps={{
                    ...commonInputProps,
                }}
                value={loginValue}
                onChange={this.onLoginValueChange}
                InputLabelProps={labelProps}
                FormHelperTextProps={helperProps}
                helperText={helperText}
                margin="normal"
                variant="outlined"
                fullWidth
            />
        );
    }

    renderPasswordInput() {
        const {
            loginMode,
            passwordValue,
            passwordInputHasError,
        } = this.state;
        let helperText = loginMode ?
            loginTranslations[LANG].LoginPagePasswordInputLabelLoginMode :
            replaceTextVariables(loginTranslations[LANG].LoginPagePasswordInputHintDefault, {
                count: passwordValue.length,
            });

        if (passwordInputHasError) {
            helperText = passwordInputHasError;
        }

        return (
            <TextField
                id="password"
                name={FORM_PASSWORD_INPUT}
                className={this.props.classes.textField}
                size="large"
                type="password"
                error={passwordInputHasError}
                label={loginTranslations[LANG].LoginPagePasswordInputLabel}
                onFocus={this.onPasswordInputFocus}
                onBlur={this.onPasswordInputBlur}
                InputProps={{
                    ...commonInputProps,
                }}
                onChange={this.onPasswordChange}
                InputLabelProps={labelProps}
                FormHelperTextProps={helperProps}
                helperText={helperText}
                margin="normal"
                variant="outlined"
                value={passwordValue}
                fullWidth
            />
        );
    }

    renderRepeatPasswordInput() {
        const {
            loginMode,
            repeatPasswordValue,
            repeatPasswordInputHasError,
        } = this.state;
        const classNames = `form-inputs-repeat-container ${loginMode ? '' : 'form-inputs-repeat-container-expanded'}`

        return (
            <Box className={classNames}>
                <TextField
                    id="repeat-password"
                    name={FORM_REPEAT_PASSWORD_INPUT}
                    className={this.props.classes.textField}
                    size="large"
                    type="password"
                    error={repeatPasswordInputHasError}
                    label={loginTranslations[LANG].LoginPagePasswordRepeatInputLabel}
                    onFocus={this.onRepeatPasswordInputFocus}
                    onBlur={this.onRepeatPasswordInputBlur}
                    InputProps={{
                        ...commonInputProps,
                    }}
                    value={repeatPasswordValue}
                    onChange={this.onRepeatPasswordChange}
                    InputLabelProps={labelProps}
                    FormHelperTextProps={helperProps}
                    helperText={loginTranslations[LANG].LoginPagePasswordRepeatInputHintDefault}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
            </Box>
        );
    }

    onLoginValueChange = (e) => {
        const {
            value,
        } = e.target;

        this.setState({
            loginValue: value,
        });
    }

    onPasswordChange = (e) => {
        const {
            value,
        } = e.target;

        this.setState({
            passwordValue: value,
        });
    }

    onRepeatPasswordChange = (e) => {
        const {
            value,
        } = e.target;

        this.setState({
            repeatPasswordValue: value,
        });
    }

    onLoginInputFocus = () => {
        const {
            loginMode,
        } = this.state;

        this.setState(state => ({
            ...state,
            loginInputHasError: false,
            passwordInputHasError: loginMode ? false : state.passwordInputHasError,
        }));
    }

    onLoginInputBlur = () => {
        this.validateLoginInput();
    }

    onPasswordInputFocus = () => {
        const {
            loginMode,
        } = this.props;

        this.setState(state => ({
            ...state,
            loginInputHasError: loginMode ? false : state.loginInputHasError,
            passwordInputHasError: false,
        }));
    }

    onPasswordInputBlur = () => {
        this.validatePasswordInput();
        this.validateRepeatPasswordInput();
    }

    onRepeatPasswordInputFocus = () => {
        this.setState({
            passwordInputHasError: false,
            repeatPasswordInputHasError: false,
            repeatPasswordInputHasBeenTouched: true,
        });
    }

    onRepeatPasswordInputBlur = () => {
        this.validateRepeatPasswordInput();
    }

    onFormSubmit = async (e) => {
        const {
            loginValue,
            repeatPasswordValue,
            passwordValue,
            loginMode,
        } = this.state;

        e.preventDefault();

        if (!loginMode && repeatPasswordValue !== passwordValue) {
            return;
        }

        if (loginMode) {
            try {
                await loginSubmit({
                    user: loginValue, password: passwordValue,
                });
            } catch (e) {
                this.setFormError(e);
            }
        } else {
            await registerSubmit({
                user: loginValue,
                password: passwordValue,
            });
        }
    }

    setFormError(e) {
        if (e.code) {
            const fieldsWithErrors = loginSubmitErrorCodeToComponentStateFields[e.code];

            if (fieldsWithErrors.length) {
                const newState = fieldsWithErrors.reduce((result, current) => {
                    result[current] = loginSubmitErrorCodeToMessageMap[e.code];

                    return result;
                }, {});

                this.setState(newState);
            }
        }
    }

    onToggleLoginRegisterClick = () => {
        this.setState(state => ({
            ...state,
            loginMode: !state.loginMode,
            loginValue: '',
            passwordValue: '',
            repeatPasswordValue: '',
            loginInputHasError: false,
            passwordInputHasError: false,
            repeatPasswordInputHasError: false,
        }));
    };

    validateLoginInput() {
        const {
            loginValue,
        } = this.state;

        this.setState({
            loginInputHasError: validateUserLogin(loginValue),
        });
    }

    validatePasswordInput() {
        const {
            passwordValue,
        } = this.state;

        this.setState({
            passwordInputHasError: validateUserPassword(passwordValue),
        });
    }

    validateRepeatPasswordInput(validateOnSubmit) {
        const {
            passwordValue,
            repeatPasswordValue,
            repeatPasswordInputHasBeenTouched,
        } = this.state;

        if (validateOnSubmit || repeatPasswordInputHasBeenTouched) {
            this.setState({
                repeatPasswordInputHasError: validateRepeatPassword(repeatPasswordValue, passwordValue),
            });
        }
    }

    render() {
        const {
            loginMode,
        } = this.state;
        const loginHeaderText = loginMode ?
            loginTranslations[LANG].LoginPageHeaderLogin :
            loginTranslations[LANG].LoginPageHeaderRegister;
        const loginRegisterText = loginMode ?
            loginTranslations[LANG].LoginPageRegisterAccountText :
            loginTranslations[LANG].LoginPageAlreadyHaveAccountText;
        const loginRegisterButtonText = loginMode ?
            loginTranslations[LANG].LoginPageRegisterButtonText :
            loginTranslations[LANG].LoginPageAlreadyHaveAccountButtonText;
        const loginButtonText = loginMode ?
            loginTranslations[LANG].LoginPageLoginButton :
            loginTranslations[LANG].LoginPageRegisterButton;

        return (
            <Box
                component="main"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width="50%"
            >
                <Typography component="h1" variant="h2">
                    {loginHeaderText}
                </Typography>
                <form name={FORM_NAME} className="form" onSubmit={this.onFormSubmit}>
                    <Box display="flex" flexDirection="column" width={1}>
                        {this.renderLoginInput()}
                        {this.renderPasswordInput()}
                        {this.renderRepeatPasswordInput()}
                        <Box mb="16px" mt="8px">
                            <Button style={{fontSize: 14}} variant="contained" color="secondary" type="submit" size="large" fullWidth>
                                {loginButtonText}
                            </Button>
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="space-evenly" alignItems="center">
                            <Typography>
                                {loginRegisterText}
                            </Typography>
                            <Button variant="contained" type="button" size="medium" onClick={this.onToggleLoginRegisterClick}>
                                {loginRegisterButtonText}
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        );
    }
}

export const LoginPage = withStyles(styles)(LoginPageClass);
