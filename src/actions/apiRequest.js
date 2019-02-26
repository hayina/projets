import types from '../types';
import { apiServer } from '../requests';


export const apiRequest = ({ url, params, feature }) => (dispatch) => {

    apiServer.get(url, { params })
        .then((data) => {
            dispatch(apiSuccess(data, feature));
        })
        .catch((error) => {
            dispatch(apiError(error, feature));
        })

}

export const apiSuccess = (data, feature) => (dispatch) => {
    dispatch({
        type: `${feature} ${API_SUCCESS}`,
        
    })
}