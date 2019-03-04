import types from '../types';

/////////////// AUTO COMPLETE

// export const fetchSuggestions = (term) => (dispatch, getState) => {


//     dispatch(setACInput(term));

//     if (term) {

//         dispatch(setLoader(true));
//         // dispatch(apiRequest({
//         //     url:'/get_partners', method: 'GET', params: { q: term }, feature: SUGGESTIONS
//         // }));
        
//         dispatch({ type: types.NEW_API_REQUEST });
//         const seq = getState().autocomplete.apiRequestCount;

//         apiServer.get('/get_partners', {
//             params: { q: term }
//         })
//         .then((response) => {
//             // ça se peut que 'term' is empty meanwhile
//             if ( getState().autocomplete.term && seq === getState().autocomplete.apiRequestCount ) {
//                 dispatch({ type: types.REQUEST_SUCCESS, payload: response.data });
//                 dispatch(toggleSuggestionsList(true));
//             }
//         })
//     }
//     else {
//         dispatch(initSuggestions());
//         dispatch(toggleSuggestionsList(false));
//     }

// }

export const fetchSuggestions = (term) => ({ type: types.FETCH_SUGGESTIONS, term })
export const setACInput = term => ({ type: types.INPUT_CHANGED, term });
export const setLoader = state => ({ type: types.SET_LOADER, state });
export const toggleSuggestionsList = toggle => ({ type: types.TOGGLE_SUGGESTIONS, toggle });
export const handleKeyPressed = keyCode => ({ type: types.SUGGESTIONS_KEY_PRESSED, keyCode });
export const setActiveSuggestion = index => ({ type: types.SET_ACTIVE_SUGGESTION, index });
export const initActiveSuggestion = () => ({ type: types.INIT_ACTIVE_SUGGESTION });
export const initSuggestions = () => ({ type: types.INIT_SUGGESTIONS });
export const setSuggestions = suggestions => ({ type: types.SET_SUGGESTIONS, suggestions });
export const selectSuggestion = suggestion => ({ type: types.SELECT_SUGGESTION, suggestion });

// export const selectSuggestion = suggestion => dispatch => {
//     dispatch(toggleSuggestionsList(false));
//     dispatch(initActiveSuggestion());
//     dispatch(setACInput(suggestion.label));
//     dispatch(initSuggestions());
// }

// export const handlingUpDownKey = (index) => (dispatch, getState) => {
//     dispatch(setActiveSuggestion(index));
//     dispatch(setACInput(getState().autocomplete.suggestions[index].label));
// }

// export const handleKeyDown = (keyCode) => (dispatch, getState) => {

//     const { suggestions, activeSuggestion } = getState().autocomplete;
//     //ENTER
//     if (keyCode === 13) {
//         dispatch(selectSuggestion(suggestions[activeSuggestion].label));
//     }
//     //UP
//     else if (keyCode === 38) {
//         if (activeSuggestion > 0) {
//             dispatch(handlingUpDownKey(activeSuggestion - 1));
//         }
//     }
//     //DOWN
//     else if (keyCode === 40) {
//         if (activeSuggestion < suggestions.length - 1) {
//             dispatch(handlingUpDownKey(activeSuggestion + 1));
//         }
//     }
// }