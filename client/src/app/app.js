import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {appReducer as mainReducer} from './common/reducers/app_reducer';
import './styles/app.less';
import {AppPage} from './common/containers/AppPage';
import {BrowserRouter} from 'react-router-dom';
import {routes} from './routes';

const rootReducer = combineReducers({
    main: mainReducer,
    ...(routes.reduce((result, route) => {
        result[route.name] = route.reducer;

        return result;
    }, {})),
});
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <AppPage/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
