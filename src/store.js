import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
// import { autoCompleteMiddleware } from './middlewares/autocomplete';
import { apiMiddleware } from './middlewares/api';
import { loggerMiddleware } from './middlewares/logger';
import { getItemFromStorage } from './helpers';
import { loginUser } from './actions';


// import * as actionCreators from './actions/autocomplete'

const middlewares = [thunk];
const coreMiddlewares = [apiMiddleware];
const featureMiddlewares = [];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
                         || compose;

const enhancer = composeEnhancers(applyMiddleware(
    ...middlewares, ...featureMiddlewares, ...coreMiddlewares,
    loggerMiddleware
));

export const store = createStore(
    reducers,
    enhancer
);


// when the user refresh the page we need to fetch user info from the session storage and push them to the store to signin him again
let userInfo = getItemFromStorage('userInfo');
if( userInfo ) {
    store.dispatch(loginUser(JSON.parse(userInfo)))
}