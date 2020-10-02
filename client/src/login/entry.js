import React from 'react';
import ReactDom from 'react-dom';
import {MuiThemeProvider} from '@material-ui/core';
import {LoginPage} from './containers/LoginPage';
import './styles/login.less';
import {setApplicationStyle} from '../common/helpers/helpers';
import {theme} from '../common/theme/theme';

setApplicationStyle();

ReactDom.render(
    <MuiThemeProvider theme={theme}>
        <LoginPage/>
    </MuiThemeProvider>,
document.getElementById('app'));
