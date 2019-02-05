import { REQUEST_PENDING, REQUEST_SUCCESS, TOGGLE_SUGGESTIONS } from '../types';
import { apiServer } from '../requests';


/////////////// MODALS

export const toggleModal = (modalName, modalToggle) => ({
    type: 'TOGGLE_MODAL',
    payload: { modalName, modalToggle }
})

/////////////// AUTO COMPLETE

export const loadACSuggestion = (term) => async (dispatch, getState) => {

        dispatch({ type: REQUEST_PENDING });
    
        const response = await apiServer.get('/get_partners', {
            params: { q: term }
        })

        dispatch({ type: REQUEST_SUCCESS, payload: response.data });
        dispatch({ type: TOGGLE_SUGGESTIONS, payload: true });

}
