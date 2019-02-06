import types from '../types';

const STATE = {
    suggestions: [],
    showSuggestions: false,
    activeSuggestion: -1,
    term: '',
    pending: false,
    apiRequestCount: 0
}

export const autocomplete = (state=STATE, action) => {

    switch(action.type) {

        case types.INPUT_CHANGED:
            return { ...state, term: action.payload };
        case types.REQUEST_PENDING:
            return { ...state, pending: true };
        case types.NEW_API_REQUEST:
            return { ...state, apiRequestCount: state.apiRequestCount+1 };
        case types.REQUEST_SUCCESS:
            return { ...state, pending: true, suggestions: action.payload };
        case types.TOGGLE_SUGGESTIONS:
            return { ...state, showSuggestions: action.payload };
        case types.SET_ACTIVE_SUGGESTION:
            return { ...state, activeSuggestion: action.payload };
        case types.INIT_ACTIVE_SUGGESTION:
            return { ...state, activeSuggestion: -1 };
        case types.INIT_SUGGESTIONS:
            return { ...state, suggestions: [] };


        default:
            return state;
    }


}