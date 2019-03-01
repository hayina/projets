import types from '../types';
import { setACInput, setLoader, setSuggestions, toggleSuggestionsList, 
            initSuggestions, initActiveSuggestion } from '../actions/autocomplete'
import { apiRequest } from './api'



// MIDDLEWARE
export const autoCompleteMiddleware = ({ dispatch, getState }) => next => action => {

    next(action);



    switch (action.type) {
        
        // fetching suggestions ...
        case types.FETCH_SUGGESTIONS:

            
            const { term } = action;
            console.log('FETCH_SUGGESTIONS', term);

            dispatch(setACInput(term));
            
            if (term) {
                dispatch(setLoader(true));
                dispatch(apiRequest({
                    url: '/get_partners', method: 'GET', params: { q: term }, feature: types.SUGGESTIONS
                }));
            }
            else {
                dispatch(initSuggestions());
                dispatch(toggleSuggestionsList(false));
            }
            break;

        // calling suggestions api success ...
        case types.SUGGESTIONS_API_SUCCESS:

            if (getState().autocomplete.term) {
                dispatch(setSuggestions(action.data));
                dispatch(setLoader(false));
                dispatch(toggleSuggestionsList(true));
            }
            break;

        // suggestions api error ...
        case types.SUGGESTIONS_API_ERROR:
            console.log(action.error);
            dispatch(setLoader(false));
            break;

        // selecting a suggestion ...
        case types.SELECT_SUGGESTION:
            dispatch(toggleSuggestionsList(false));
            dispatch(initActiveSuggestion());
            dispatch(setACInput(action.suggestion.label));
            dispatch(initSuggestions());
            break;
    }

}