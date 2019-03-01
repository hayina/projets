import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import { autoCompleteMiddleware } from './middlewares/autocomplete';
import { apiMiddleware } from './middlewares/api';
import { loggerMiddleware } from './middlewares/logger';

const middlewares = [thunk];
const coreMiddlewares = [apiMiddleware];
const featureMiddlewares = [autoCompleteMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(
    ...middlewares, ...featureMiddlewares, ...coreMiddlewares,
    loggerMiddleware
));

export const store = createStore(
    reducers,
    enhancer
);
