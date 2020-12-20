import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {appReducer as mainReducer} from './common/reducers/app_reducer';
import './styles/app.less';
import {AppPage} from './common/containers/AppPage';
import {BrowserRouter} from 'react-router-dom';
import logger from 'redux-logger';
import {routes} from './routes';

const rootReducer = combineReducers({
    main: mainReducer,
    ...(routes.reduce((result, route) => {
        if (route.reducer) {
            result[route.name] = route.reducer;
        }

        return result;
    }, {})),
});
const middlewares = [thunk, logger]; // TODO conditionally add logger middleware only for development mode
const store = createStore(rootReducer, applyMiddleware(...middlewares));

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <AppPage/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
