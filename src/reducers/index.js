import { combineReducers } from 'redux';

// import projetFormReducer from './projetFormReducer'
import { reducer as formReducer } from 'redux-form';
import { autoCompletes } from './autoCompletes';
import { modals } from './modals';
import { externalForms, initialFormValues } from './externalForms';
import { checkList } from './checkList';


// the big store
export default combineReducers({
    form: formReducer,
    // autoCompletes,
    modals,
    externalForms,
    initialFormValues
    // checkList
})