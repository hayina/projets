

export const initialState  = {
    term: '',
    suggestions: [],
    showSuggestions: false,
    activeSuggestion: -1,
    loading: false,
    errors: false
}

export const reducer = (state, action) => {

    switch (action.type) {

        case 'TOGGLE_SUGGESTIONS':
            return { ...state, showSuggestions: action.toggle };

        case 'SET_AC_INPUT':
            return { ...state, term: action.term };

        case 'AC_API_CALL':
            return { ...state, loading: true, errors: false };

        case 'AC_API_SUCCESS':
            return { ...state, loading: false, showSuggestions: true, suggestions: action.suggestions };

        case 'AC_API_ERROR':
            return { ...state, loading: false, errors: true };

        case 'SET_ACTIVE_SUGGESTION':
            return { ...state, activeSuggestion: action.activeSuggestion };

        case 'SELECT_SUGGESTION':
            return { ...state  };

        case 'UP_DOWN_KEY_PRESSED':
            return { ...initialState, activeSuggestion: action.activeSuggestion, term: action.term };

        case 'INIT_AC':
            return { ...initialState  };



        default:
            throw new Error();
    }

}