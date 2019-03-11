import types from '../types';
// import { change } from 'redux-form';

/////////////// AUTO COMPLETE

export const setReduxForm = (reduxForm) => ({ type: types.SET_REDUX_FORM, reduxForm });
export const onSelectAC = (suggestion, name) => ({ type: types.AC_SELECT, payload: { suggestion, name } });
export const onInitAC = (name) => ({ type: types.AC_INIT, name });

// export const onSelectAC = (suggestion, name) => (dispatch, getState) => {


// }

// export const inputChanged = term => ({ type: types.AC_INPUT_CHANGED, term })
// export const inputFocused = term => ({ type: types.AC_INPUT_FOCUSED, term })
// export const fetchSuggestions = term => ({ type: types.FETCH_SUGGESTIONS, term })
// export const setLoader = state => ({ type: types.SET_LOADER, state });
// export const setErrors = (state) => ({ type: types.SUGGESTIONS_SET_ERRORS, state });

// export const toggleSuggestionsList = toggle => ({ type: types.TOGGLE_SUGGESTIONS, toggle });
// export const handleKeyPressed = keyCode => ({ type: types.SUGGESTIONS_KEY_PRESSED, keyCode });
// export const setActiveSuggestion = index => ({ type: types.SET_ACTIVE_SUGGESTION, index });
// export const initActiveSuggestion = () => ({ type: types.INIT_ACTIVE_SUGGESTION });
// export const initSuggestions = () => ({ type: types.INIT_SUGGESTIONS });
// export const setSuggestions = suggestions => ({ type: types.SET_SUGGESTIONS, suggestions });
// export const selectSuggestion = suggestion => ({ type: types.SELECT_SUGGESTION, suggestion });
// export const outsideClick = () => ({ type: types.AC_OUTSIDE_CLICK });

// export const autoCompleteInit = () => ({ type: types.AC_INIT });
// export const autoCompleteDestroy = () => ({ type: types.AC_DESTROY });

// THUNK

// export const setACInput = term => ({ type: types.SET_AC_INPUT, term });
// export const preSetACInput = term => ({ type: types.PRE_SET_AC_INPUT, term });

// export const setACInput = term => (dispatch, getState) => {

//     const { isReduxForm, reduxForm } = getState().autocomplete;

//     if( isReduxForm ){
//         dispatch(change(reduxForm.form, reduxForm.field, term));
//     }

//     dispatch({ type: types.SET_AC_INPUT, term });
// }

