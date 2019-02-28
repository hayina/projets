import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import { autoCompleteMiddleware } from './middlewares/autocomplete';

const middlewares = [thunk];
const customMiddlewares = [autoCompleteMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares, ...customMiddlewares));

export const store = createStore(
    reducers, 
    enhancer
);
