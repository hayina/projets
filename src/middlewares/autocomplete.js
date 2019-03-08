import types from '../types';
import {
    setLoader, setSuggestions, toggleSuggestionsList, setErrors
} from '../actions/autocomplete';


// let lastTime;

// MIDDLEWARE
export const autoCompleteMiddleware = ({ dispatch, getState }) => next => action => {

    next(action);

    switch (action.type) {



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





        default: break;

    }

}


