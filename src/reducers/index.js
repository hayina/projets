import { combineReducers } from 'redux';

// import projetFormReducer from './projetFormReducer'
import { reducer as formReducer } from 'redux-form';



export default combineReducers({
    form: formReducer
})