import React from 'react';
import ReactDom from 'react-dom';
import {MuiThemeProvider} from '@material-ui/core';
import {LoginPage} from './containers/LoginPage';
import './styles/login.less';
import {theme} from '../common/theme/theme';

ReactDom.render(
    <MuiThemeProvider theme={theme}>
        <LoginPage/>
    </MuiThemeProvider>,
document.getElementById('app'));
