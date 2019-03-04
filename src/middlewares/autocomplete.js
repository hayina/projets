import types from '../types';
import {
    setACInput, setLoader, setSuggestions, toggleSuggestionsList,
    initSuggestions, initActiveSuggestion, selectSuggestion, setActiveSuggestion
} from '../actions/autocomplete';
import { apiRequest } from './api';



// MIDDLEWARE
export const autoCompleteMiddleware = ({ dispatch, getState }) => next => action => {

    next(action);



    switch (action.type) {

        //// fetching suggestions ...
        case types.FETCH_SUGGESTIONS:

            const { term } = action;

            if (term) {
                dispatch(setACInput(term));
                dispatch(setLoader(true));
                dispatch(apiRequest({
                    url: '/get_partners', method: 'GET', params: { q: term }, feature: types.SUGGESTIONS
                }));
            }
            else {
                // dispatch(initSuggestions());
                // dispatch(toggleSuggestionsList(false));
            }
            break;

        //// calling suggestions api success ...
        case types.SUGGESTIONS_API_SUCCESS:

            if (getState().autocomplete.term) {
                dispatch(setSuggestions(action.data));
                dispatch(setLoader(false));
                dispatch(toggleSuggestionsList(true));
            }
            break;

        //// suggestions api error ...
        case types.SUGGESTIONS_API_ERROR:
            console.log(action.error);
            dispatch(setLoader(false));
            break;

        //// selecting a suggestion ...
        case types.SELECT_SUGGESTION:
            dispatch(toggleSuggestionsList(false));
            dispatch(initActiveSuggestion());
            dispatch(setACInput(action.suggestion.label));
            dispatch(initSuggestions());
            break;

        //// handling key pressed (down, up, enter) when selecting a suggestion
        case types.SUGGESTIONS_KEY_PRESSED:

            const { suggestions, activeSuggestion } = getState().autocomplete;
            //ENTER
            if (action.keyCode === 13) {
                dispatch(selectSuggestion(suggestions[activeSuggestion].label));
            }
            //UP
            else if (action.keyCode === 38) {
                if (activeSuggestion > 0) {
                    dispatch(handlingUpDownKeys(activeSuggestion - 1, suggestions, dispatch));
                }
            }
            //DOWN
            else if (action.keyCode === 40) {
                if (activeSuggestion < suggestions.length - 1) {
                    dispatch(handlingUpDownKeys(activeSuggestion + 1, suggestions, dispatch));
                }
            }
            break;
    }

}


const handlingUpDownKeys = (index, suggestions, dispatch) => {
    dispatch(setActiveSuggestion(index));
    dispatch(setACInput(suggestions[index].label));
}