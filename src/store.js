import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
// import { autoCompleteMiddleware } from './middlewares/autocomplete';
import { apiMiddleware } from './middlewares/api';
import { projetFormMiddleware } from './middlewares/projetForm';
import { loggerMiddleware } from './middlewares/logger';

import * as actionCreators from './actions/autocomplete'

const middlewares = [thunk];
const coreMiddlewares = [apiMiddleware];
const featureMiddlewares = [projetFormMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionCreators, serialize: true, trace: true })
                         || compose;

const enhancer = composeEnhancers(applyMiddleware(
    ...middlewares, ...featureMiddlewares, ...coreMiddlewares,
    loggerMiddleware
));

export const store = createStore(
    reducers,
    enhancer
);
