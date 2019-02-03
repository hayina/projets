import { combineReducers } from 'redux';

// import projetFormReducer from './projetFormReducer'
import { reducer as formReducer } from 'redux-form';
import {formModalsReducer, autocompleteReducer} from './projetFormReducer';


// the big store
export default combineReducers({
    form: formReducer,
    formModals: formModalsReducer,
    suggestions: autocompleteReducer
})