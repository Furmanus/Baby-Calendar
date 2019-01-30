import React from 'react';
import ReactDom from 'react-dom';
import {AppPage} from './containers/AppPage';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {appReducer} from './reducers/app_reducer';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './styles/app.less';
import {setApplicationStyle} from '../common/helpers/helpers';

const store = createStore(appReducer, applyMiddleware(thunk));

setApplicationStyle();

ReactDom.render(
    <Provider store={store}>
        <AppPage/>
    </Provider>,
    document.getElementById('app')
);