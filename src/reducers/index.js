import { combineReducers } from 'redux';

// import projetFormReducer from './projetFormReducer'
import { reducer as formReducer } from 'redux-form';
import { projetForm } from './projetForm';


// the big store
export default combineReducers({
    form: formReducer,
    projetForm,
})