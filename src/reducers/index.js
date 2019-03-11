import { combineReducers } from 'redux';

// import projetFormReducer from './projetFormReducer'
import { reducer as formReducer } from 'redux-form';
import { autoCompletes } from './autoCompletes';
import { modals } from './modals';


// the big store
export default combineReducers({
    form: formReducer,
    autoCompletes,
    modals,
})