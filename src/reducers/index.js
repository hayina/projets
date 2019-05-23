import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';
import { modals } from './modals';
import { login } from './login';
import types from '../types';


// the big store
export default combineReducers({
    form: formReducer,
    modals,
    login,
    breadCrumb: (state="Bienvenue", action) => action.type === types.SET_BREAD_CRUMB ? action.payload : state,
})
