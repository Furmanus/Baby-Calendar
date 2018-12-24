import React from 'react';
import ReactDom from 'react-dom';
import {LoginPage} from './containers/LoginPage';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {loginReducer} from './reducers/login_reducer';
import './styles/login.less';

const store = createStore(loginReducer, applyMiddleware(thunk));

ReactDom.render(
    <Provider store={store}>
        <LoginPage/>
    </Provider>,
    document.getElementById('app')
);