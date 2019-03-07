import types from '../types';

const STATE = {
    suggestions: [],
    showSuggestions: false,
    activeSuggestion: -1,
    term: '',
    loading: false,
    errors: false
}

export const getLoadingStatus = state => state.loading;
export const getErrorsStatus = state => state.errors;

export const autocomplete = (state=STATE, action) => {

    switch(action.type) {

        case types.SET_AC_INPUT:
            return { ...state, term: action.term };

        case types.SET_LOADER:
            return { ...state, loading: action.state };

        case types.TOGGLE_SUGGESTIONS:
            return { ...state, showSuggestions: action.toggle };

        case types.SET_ACTIVE_SUGGESTION:
            return { ...state, activeSuggestion: action.index };

        case types.INIT_ACTIVE_SUGGESTION:
            return { ...state, activeSuggestion: -1 };

        case types.INIT_SUGGESTIONS:
            return { ...state, suggestions: [] };

        case types.SET_SUGGESTIONS:
            return { ...state, suggestions: action.suggestions };

        case types.SUGGESTIONS_SET_ERRORS:
            return { ...state, suggestions: action.suggestions };

        default:
            return state;
    }


}