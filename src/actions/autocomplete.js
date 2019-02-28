import types from '../types';
import { apiServer } from '../requests';

/////////////// AUTO COMPLETE

export const fetchSuggestions = (term) => (dispatch, getState) => {


    dispatch(setACInput(term));

    if (term) {

        dispatch(setLoader(true));
        // dispatch(apiRequest('/get_partners', { q: term }, SUGGESTIONS));
        
        dispatch({ type: types.NEW_API_REQUEST });
        const seq = getState().autocomplete.apiRequestCount;

        apiServer.get('/get_partners', {
            params: { q: term }
        })
        .then((response) => {
            // ça se peut que 'term' is empty meanwhile
            if ( getState().autocomplete.term && seq === getState().autocomplete.apiRequestCount ) {
                dispatch({ type: types.REQUEST_SUCCESS, payload: response.data });
                dispatch(toggleSuggestions(true));
            }
        })
    }
    else {
        dispatch(initSuggestions());
        dispatch(toggleSuggestions(false));
    }

}

export const setACInput = term => ({ type: types.INPUT_CHANGED, payload: term });
export const setLoader = state => ({ type: types.SET_LOADER, payload: state });
export const toggleSuggestions = toggle => ({ type: types.TOGGLE_SUGGESTIONS, payload: toggle });
export const setActiveSuggestion = index => ({ type: types.SET_ACTIVE_SUGGESTION, payload: index });
export const initActiveSuggestion = () => ({ type: types.INIT_ACTIVE_SUGGESTION });
export const initSuggestions = () => ({ type: types.INIT_SUGGESTIONS });
export const clickOnSuggestion = suggestion => dispatch => dispatch(selectSuggestion(suggestion.label));

export const selectSuggestion = suggestion => dispatch => {
    dispatch(toggleSuggestions(false));
    dispatch(initActiveSuggestion());
    dispatch(setACInput(suggestion));
    dispatch(initSuggestions());
}

export const handlingUpDownKey = (index) => (dispatch, getState) => {
    dispatch(setActiveSuggestion(index));
    dispatch(setACInput(getState().autocomplete.suggestions[index].label));
}

export const handleKeyDown = (keyCode) => (dispatch, getState) => {

    const { suggestions, activeSuggestion } = getState().autocomplete;
    //ENTER
    if (keyCode === 13) {
        dispatch(selectSuggestion(suggestions[activeSuggestion].label));
    }
    //UP
    else if (keyCode === 38) {
        if (activeSuggestion > 0) {
            dispatch(handlingUpDownKey(activeSuggestion - 1));
        }
    }
    //DOWN
    else if (keyCode === 40) {
        if (activeSuggestion < suggestions.length - 1) {
            dispatch(handlingUpDownKey(activeSuggestion + 1));
        }
    }
}