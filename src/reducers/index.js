import { combineReducers } from 'redux';

// import projetFormReducer from './projetFormReducer'
import { reducer as formReducer } from 'redux-form';
import {formModalsReducer} from './projetFormReducer';
import { autocomplete } from './autocomplete';


// the big store
export default combineReducers({
    form: formReducer,
    formModals: formModalsReducer,
    autocomplete
})