import types from '../types';
import {
    setACInput, setLoader, setSuggestions, toggleSuggestionsList, fetchSuggestions, autoCompleteInit, autoCompleteDestroy,
    initSuggestions, initActiveSuggestion, selectSuggestion, setActiveSuggestion, setErrors
} from '../actions/autocomplete';
import { apiRequest } from './api';

// let lastTime;

// MIDDLEWARE
export const autoCompleteMiddleware = ({ dispatch, getState }) => next => action => {

    next(action);

    const { term } = action;
    const { suggestions, showSuggestions, activeSuggestion, errors } = getState().autocomplete;

    switch (action.type) {

        case types.AC_INIT:

            break;


        case types.AC_DESTROY:

            break;

        case types.AC_INPUT_CHANGED:

            // DEBOUNCE
            // const currentTime = Date.now();
            // if (!lastTime)
            //     lastTime = currentTime;
            // console.log(`Time elapsed is (${currentTime - lastTime}) ms`)
            // lastTime = currentTime;

            dispatch(setACInput(term));
            if (term) {
                dispatch(fetchSuggestions(term));
            }
            else {
                dispatch(initSuggestions());
                dispatch(setLoader(false));
                dispatch(toggleSuggestionsList(false));
            }
            break;

        case types.AC_INPUT_FOCUSED:

            if ( term && !errors ) {
                dispatch(toggleSuggestionsList(true));
                //     dispatch(fetchSuggestions(term));
            }
            break;

        case types.AC_OUTSIDE_CLICK:
            if (showSuggestions) {
                dispatch(toggleSuggestionsList(false));
            }
            break;

        //// fetching suggestions ...
        case types.FETCH_SUGGESTIONS:

            dispatch(setLoader(true));
            dispatch(setErrors(false));
            dispatch(apiRequest({
                url: '/get_partners', method: 'GET', params: { q: term },
                feature: types.SUGGESTIONS,
                race: true, requestType: 'AUTO_COMPLETE_INPUT'
            }));
            break;

        //// calling suggestions api success ...
        case types.SUGGESTIONS_API_SUCCESS:

            if (getState().autocomplete.term) {

                const suggestions = action.data.map((s) => ({ id: s.id, label: s.label }));

                dispatch(setSuggestions(suggestions));
                dispatch(setLoader(false));
                dispatch(toggleSuggestionsList(true));
            }
            break;

        //// suggestions api error ...
        case types.SUGGESTIONS_API_ERROR:
            console.log(action.error);
            dispatch(setLoader(false));
            dispatch(setErrors(true));
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

            //ENTER
            if (action.keyCode === 13) {
                dispatch(selectSuggestion(suggestions[activeSuggestion]));
            }
            //UP
            else if (action.keyCode === 38) {
                if (activeSuggestion > 0) {
                    handlingUpDownKeys(activeSuggestion - 1, suggestions, dispatch);
                }
            }
            //DOWN
            else if (action.keyCode === 40) {
                if (activeSuggestion < suggestions.length - 1) {
                    handlingUpDownKeys(activeSuggestion + 1, suggestions, dispatch);
                }
            }
            break;

        default: break;

    }

}


const handlingUpDownKeys = (index, suggestions, dispatch) => {
    dispatch(setActiveSuggestion(index));
    dispatch(setACInput(suggestions[index].label));
}