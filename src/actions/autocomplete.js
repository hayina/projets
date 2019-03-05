import types from '../types';

/////////////// AUTO COMPLETE

export const inputChanged = term => ({ type: types.AC_INPUT_CHANGED, term })
export const inputFocused = term => ({ type: types.AC_INPUT_FOCUSED, term })
export const fetchSuggestions = term => ({ type: types.FETCH_SUGGESTIONS, term })
export const setACInput = term => ({ type: types.INPUT_CHANGED, term });
export const setLoader = state => ({ type: types.SET_LOADER, state });
export const toggleSuggestionsList = toggle => ({ type: types.TOGGLE_SUGGESTIONS, toggle });
export const handleKeyPressed = keyCode => ({ type: types.SUGGESTIONS_KEY_PRESSED, keyCode });
export const setActiveSuggestion = index => ({ type: types.SET_ACTIVE_SUGGESTION, index });
export const initActiveSuggestion = () => ({ type: types.INIT_ACTIVE_SUGGESTION });
export const initSuggestions = () => ({ type: types.INIT_SUGGESTIONS });
export const setSuggestions = suggestions => ({ type: types.SET_SUGGESTIONS, suggestions });
export const selectSuggestion = suggestion => ({ type: types.SELECT_SUGGESTION, suggestion });
export const outsideClick = () => ({ type: types.AC_OUTSIDE_CLICK });

