import React from 'react';
import {Box, Button, TextField, Typography, withStyles, CircularProgress} from '@material-ui/core';
import {loginTranslations} from '../constants/translations';
import {registerSubmit, loginSubmit} from '../../api/api';
import {
    FORM_LOGIN_INPUT,
    FORM_NAME,
    FORM_PASSWORD_INPUT,
    FORM_REPEAT_PASSWORD_INPUT,
} from '../constants/login_form';
import {PasswordVisibilityAdornment} from '../components/PasswordVisibilityAdornment';
import {
    loginSubmitErrorCodeToComponentStateFields,
    loginSubmitErrorCodeToMessageMap,
} from '../constants/errors';
import {replaceTextVariables} from '../../common/helpers/text';
import {validateRepeatPassword, validateUserLogin, validateUserPassword} from '../helpers/validators';
import {redirectPath} from '../utils/utils';
import {AppLogo} from '../../common/components/AppLogo';
import {commonInputProps, helperProps, labelProps} from '../../common/helpers/form';

const LANG = 'en';
const styles = {
    textField: {
        marginBottom: 0,
    },
    main: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '50%',
        '@media (max-width: 768px)': {
            width: '75%',
        },
        '@media (max-width: 620px)': {
            width: '90%',
        },
        '@media (max-width: 480px)': {
            width: '100%',
        },
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
        showPassword: false,
        showRepeatPassword: false,
        isSubmitting: false,
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
            showPassword,
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
                type={showPassword ? "text" : "password"}
                error={passwordInputHasError}
                label={loginTranslations[LANG].LoginPagePasswordInputLabel}
                onFocus={this.onPasswordInputFocus}
                onBlur={this.onPasswordInputBlur}
                InputProps={{
                    ...commonInputProps,
                    endAdornment: (<PasswordVisibilityAdornment onClick={this.togglePasswordVisibility} isVisible={showPassword}/>),
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

    togglePasswordVisibility = () => {
        this.setState(state => ({
            ...state,
            showPassword: !state.showPassword,
        }));
    }

    renderRepeatPasswordInput() {
        const {
            loginMode,
            repeatPasswordValue,
            repeatPasswordInputHasError,
            showRepeatPassword,
        } = this.state;
        const classNames = `form-inputs-repeat-container ${loginMode ? '' : 'form-inputs-repeat-container-expanded'}`

        return (
            <Box className={classNames}>
                <TextField
                    id="repeat-password"
                    name={FORM_REPEAT_PASSWORD_INPUT}
                    className={this.props.classes.textField}
                    size="large"
                    type={showRepeatPassword ? "text" : "password"}
                    error={repeatPasswordInputHasError}
                    label={loginTranslations[LANG].LoginPagePasswordRepeatInputLabel}
                    onFocus={this.onRepeatPasswordInputFocus}
                    onBlur={this.onRepeatPasswordInputBlur}
                    InputProps={{
                        ...commonInputProps,
                        endAdornment: (
                            <PasswordVisibilityAdornment onClick={this.toggleRepeatPasswordVisibility} isVisible={showRepeatPassword}/>
                        ),
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

    toggleRepeatPasswordVisibility = () => {
        this.setState(state => ({
            ...state,
            showRepeatPassword: !state.showRepeatPassword,
        }));
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
        if (!this.state.loginMode) {
            this.validateLoginInput();
        }
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
        if (!this.state.loginMode) {
            this.validatePasswordInput();
            this.validateRepeatPasswordInput();
        }
    }

    onRepeatPasswordInputFocus = () => {
        this.setState({
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
            passwordValue,
            loginMode,
        } = this.state;

        e.preventDefault();

        this.validateForm();

        if (!this.canSubmit()) {
            return;
        }

        this.setState({
            isSubmitting: true,
        });

        try {
            if (loginMode) {
                await loginSubmit({
                    user: loginValue, password: passwordValue,
                });
            } else {
                await registerSubmit({
                    user: loginValue, password: passwordValue,
                });
            }

            redirectPath('info');
        } catch (e) {
            this.setFormError(e);
        } finally {
            this.setState({
                isSubmitting: false,
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
            showPassword: false,
            showRepeatPassword: false,
        }));
    };

    canSubmit() {
        const {
            loginInputHasError,
            passwordInputHasError,
            repeatPasswordInputHasError,
        } = this.state;

        return !loginInputHasError && !passwordInputHasError && !repeatPasswordInputHasError;
    }

    validateForm() {
        if (!this.state.loginMode) {
            this.validateLoginInput();
            this.validatePasswordInput();
            this.validateRepeatPasswordInput();
        }
    }

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
            isSubmitting,
        } = this.state;
        const {
            classes,
        } = this.props;
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
                className={classes.main}
            >
                <AppLogo/>
                <form name={FORM_NAME} className="form" onSubmit={this.onFormSubmit}>
                    <Box display="flex" flexDirection="column" width={1}>
                        {this.renderLoginInput()}
                        {this.renderPasswordInput()}
                        {this.renderRepeatPasswordInput()}
                        <Box mb="16px" mt={loginMode ? '8px' : '16px'}>
                            <Button
                                style={{fontSize: 14}}
                                variant="contained"
                                color="secondary"
                                type="submit"
                                size="large"
                                disabled={isSubmitting}
                                fullWidth
                            >
                                {loginButtonText}
                                {
                                    isSubmitting && <CircularProgress style={{width: '20px', height: '20px', position: 'absolute', right: '15px'}}/>
                                }
                            </Button>
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="space-evenly" alignItems="center">
                            <Typography>
                                {loginRegisterText}
                            </Typography>
                            <Button
                                variant="contained"
                                type="button"
                                size="medium"
                                onClick={this.onToggleLoginRegisterClick}
                                disabled={isSubmitting}
                            >
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
