import React from 'react';
import {Box, Button, TextField, Typography} from '@material-ui/core';
import {loginTranslations} from '../constants/translations';
import {AccountCircle, Lock} from '@material-ui/icons';

const LANG = 'en';
const commonInputProps = {
    style: {
        fontSize: 16,
        paddingLeft: 0,
        marginBottom: 5,
    }
};
const labelProps ={
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
const iconStyles = {
    fontSize: 32,
    marginRight: 5,
};

export class LoginPage extends React.Component {
    state = {
        loginMode: true,
    };

    renderLoginInput() {
        const {
            loginMode,
        } = this.state;
        const helperText = loginMode ?
            loginTranslations[LANG].LoginPageLoginInputHintLoginMode :
            loginTranslations[LANG].LoginPageLoginInputHintDefault;

        return (
            <Box display="flex" flexDirection="row" alignItems="center">
                <AccountCircle style={iconStyles} color="primary" />
                <TextField
                    id="login"
                    size="large"
                    label={loginTranslations[LANG].LoginPageLoginInputLabel}
                    autofocus={true}
                    InputProps={{
                        ...commonInputProps,
                    }}
                    InputLabelProps={labelProps}
                    FormHelperTextProps={helperProps}
                    helperText={helperText}
                    margin="normal"
                    fullWidth
                />
            </Box>
        );
    }

    renderPasswordInput() {
        const {
            loginMode,
        } = this.state;
        const helperText = loginMode ?
            loginTranslations[LANG].LoginPagePasswordInputLabelLoginMode :
            loginTranslations[LANG].LoginPagePasswordInputHintDefault;

        return (
            <Box display="flex" flexDirection="row" alignItems="center">
                <Lock style={iconStyles} color="primary" />
                <TextField
                    id="password"
                    size="large"
                    type="password"
                    label={loginTranslations[LANG].LoginPagePasswordInputLabel}
                    InputProps={{
                        ...commonInputProps,
                    }}
                    InputLabelProps={labelProps}
                    FormHelperTextProps={helperProps}
                    helperText={helperText}
                    margin="normal"
                    fullWidth
                />
            </Box>
        );
    }

    renderRepeatPasswordInput() {
        const {
            loginMode,
        } = this.state;
        const classNames = `form-inputs-repeat-container ${loginMode ? '' : 'form-inputs-repeat-container-expanded'}`

        return (
            <Box display="flex" flexDirection="row" alignItems="center" className={classNames}>
                <Lock style={iconStyles} color="primary" />
                <TextField
                    id="password"
                    size="large"
                    type="password"
                    label={loginTranslations[LANG].LoginPagePasswordRepeatInputLabel}
                    InputProps={{
                        ...commonInputProps,
                    }}
                    InputLabelProps={labelProps}
                    FormHelperTextProps={helperProps}
                    helperText={loginTranslations[LANG].LoginPagePasswordRepeatInputHintDefault}
                    margin="normal"
                    fullWidth
                />
            </Box>
        );
    }

    onToggleLoginRegisterClick = () => {
        this.setState(state => ({
            ...state,
            loginMode: !state.loginMode,
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
