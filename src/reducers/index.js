import { combineReducers } from 'redux';

// import projetFormReducer from './projetFormReducer'
import { reducer as formReducer } from 'redux-form';
import projetFormReducer from './projetFormReducer';



export default combineReducers({
    form: formReducer,
    initialValues: projetFormReducer
})