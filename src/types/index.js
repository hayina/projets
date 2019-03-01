
const SUGGESTIONS = '[Suggestions]';

const types = {

    SET_LOADER: '[ui] set loader',
    NEW_API_REQUEST: '[api] new api request ...',
    REQUEST_SUCCESS: '[api] success request',
    TOGGLE_SUGGESTIONS: '[ui] show/hide suggestions list',
    INPUT_CHANGED: '[ui] autocomplete input changed',
    SET_ACTIVE_SUGGESTION: '[ui] setting the active suggestion',
    INIT_ACTIVE_SUGGESTION: '[ui] init the active suggestion',
    INIT_SUGGESTIONS: '[ui] init/empty suggestions',



    SUGGESTIONS: `${SUGGESTIONS}`,
    SET_SUGGESTIONS: `${SUGGESTIONS} SET`,
    FETCH_SUGGESTIONS: `${SUGGESTIONS} FETCH`,
    SELECT_SUGGESTION: `${SUGGESTIONS} SELECT`,
    SUGGESTIONS_API_REQUEST: `${SUGGESTIONS} API_REQUEST`,
    SUGGESTIONS_API_SUCCESS: `${SUGGESTIONS} API_SUCCESS`,
    SUGGESTIONS_API_ERROR: `${SUGGESTIONS} API_ERROR`,
    
    API_REQUEST: 'API_REQUEST',
    API_SUCCESS: 'API_SUCCESS',
    API_ERROR: 'API_ERROR',
}


export default types;