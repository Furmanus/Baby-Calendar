import React from 'react';
import ReactDom from 'react-dom';
import {LoginPage} from './containers/LoginPage';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {loginReducer} from './reducers/login_reducer';
import './styles/login.less';
import {setApplicationStyle} from '../common/helpers/helpers';

const store = createStore(loginReducer, applyMiddleware(thunk));

setApplicationStyle();

ReactDom.render(
    <Provider store={store}>
        <LoginPage/>
    </Provider>,
    document.getElementById('app')
);