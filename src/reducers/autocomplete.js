import { REQUEST_PENDING, REQUEST_SUCCESS } from '../types';

const STATE = {
    suggestions: [],
    showSuggestions: false,
    activeSuggestion: -1,
    term: '',
    pending: false
}

export const autocomplete = (state=STATE, action) => {

    switch(action.type) {

        case REQUEST_PENDING:
            return { ...state, pending: true };
        case REQUEST_SUCCESS:
            return { ...state, pending: true, suggestions: action.payload.data };
        case TOGGLE_SUGGESTIONS:
            return { ...state, showSuggestions: action.payload };


        default:
            return state;
    }


}