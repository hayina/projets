import types from '../types';

const STATE = {
    suggestions: [],
    showSuggestions: false,
    activeSuggestion: -1,
    term: '',
    loading: false,
    apiRequestCount: 0
}

export const getLoadingStatus = state => state.loading;

export const autocomplete = (state=STATE, action) => {

    switch(action.type) {

        case types.INPUT_CHANGED:
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

        default:
            return state;
    }


}