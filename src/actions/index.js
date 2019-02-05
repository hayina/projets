import { REQUEST_PENDING, REQUEST_SUCCESS } from '../types';
import { apiServer } from '../requests';


/////////////// MODALS

export const toggleModal = (modalName, modalToggle) => ({
    type: 'TOGGLE_MODAL',
    payload: { modalName, modalToggle }
})

/////////////// AUTO COMPLETE

export const loadACSuggestion = async (term, dispatch) => {


    dispatch({ type: REQUEST_PENDING });

    const response = await apiServer.get('/get_partners', {
        params: { term }
    })

    return { type: REQUEST_SUCCESS, payload: response.data };

}
