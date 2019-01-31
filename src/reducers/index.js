import { combineReducers } from 'redux';

// import projetFormReducer from './projetFormReducer'
import { reducer as formReducer } from 'redux-form';
import {formModalsReducer} from './projetFormReducer';



export default combineReducers({
    form: formReducer,
    formModals: formModalsReducer
})