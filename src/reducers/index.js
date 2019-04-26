import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';
import { modals } from './modals';
import { externalForms } from './externalForms';
import types from '../types';


// the big store
export default combineReducers({
    form: formReducer,
    // autoCompletes,
    modals,
    externalForms,
    initialFormValues: (state={ }, action) => action.type === types.EDIT_FORM_VALUES ? action.initialValues : state,
    // users,
    breadCrumb: (state="Bienvenue", action) => action.type === types.SET_BREAD_CRUMB ? action.payload : state,
    
    // checkList
})

// const marcheInitVals = {
//     intitule: 'marche 3',
//     delai: 15,
//     montant: 8000000,
// }

export const getInitialFormValues = (state) => state.initialFormValues;