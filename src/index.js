import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import * as Sentry from '@sentry/browser';
import { BrowserRouter } from 'react-router-dom';
// Performance Tracking
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
Sentry.init({
    dsn:
        'https://3ddbf859acc94b65939ec5e6602f374f@o382984.ingest.sentry.io/5212637',
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
