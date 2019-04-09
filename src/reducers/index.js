import { combineReducers } from 'redux';

// import projetFormReducer from './projetFormReducer'
import { reducer as formReducer } from 'redux-form';
import { users } from './users';
import { modals } from './modals';
import { externalForms, initialFormValues } from './externalForms';


// the big store
export default combineReducers({
    form: formReducer,
    // autoCompletes,
    modals,
    externalForms,
    initialFormValues,
    users
    // checkList
})