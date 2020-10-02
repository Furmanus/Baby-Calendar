import React from 'react';
import {Box, Button, TextField, Typography} from '@material-ui/core';
import {loginTranslations} from '../constants/translations';

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
    },
};

export class LoginPage extends React.Component {
    state = {
        loginMode: true,
        loginValue: '',
        passwordValue: '',
        repeatPasswordValue: '',
    };

    renderLoginInput() {
        const {
            loginMode,
            loginValue,
        } = this.state;
        const helperText = loginMode ?
            loginTranslations[LANG].LoginPageLoginInputHintLoginMode :
            loginTranslations[LANG].LoginPageLoginInputHintDefault;

        return (
            <TextField
                id="login"
                size="large"
                label={loginTranslations[LANG].LoginPageLoginInputLabel}
                autofocus={true}
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
        } = this.state;
        const helperText = loginMode ?
            loginTranslations[LANG].LoginPagePasswordInputLabelLoginMode :
            loginTranslations[LANG].LoginPagePasswordInputHintDefault;

        return (
            <TextField
                id="password"
                size="large"
                type="password"
                label={loginTranslations[LANG].LoginPagePasswordInputLabel}
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
        } = this.state;
        const classNames = `form-inputs-repeat-container ${loginMode ? '' : 'form-inputs-repeat-container-expanded'}`

        return (
            <Box className={classNames}>
                <TextField
                    id="repeat-password"
                    size="large"
                    type="password"
                    label={loginTranslations[LANG].LoginPagePasswordRepeatInputLabel}
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

    onToggleLoginRegisterClick = () => {
        this.setState(state => ({
            ...state,
            loginMode: !state.loginMode,
            loginValue: '',
            passwordValue: '',
            repeatPasswordValue: '',
        }));
    };

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
                <form className="form">
                    <Box display="flex" flexDirection="column" width={1}>
                        {this.renderLoginInput()}
                        {this.renderPasswordInput()}
                        {this.renderRepeatPasswordInput()}
                        <Box my="16px">
                            <Button style={{fontSize: 14}} variant="contained" color="secondary" type="submit" size="large" fullWidth>
                                {loginTranslations[LANG].LoginPageLoginButton}
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
