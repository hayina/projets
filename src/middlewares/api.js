import axios from 'axios';

import types from '../types';

export const apiMiddleware = ({ dispatch }) => next => action => {

    next(action);

    if (action.type.includes(types.API_REQUEST)) {

        const { url, method, params, feature } = action.payload;

        axios({
            // SETUP PARAMS
            baseURL: '/PROJETS/ajax',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            // PASSED PARAMS
            method,
            url, 
            params 
        })
        .then((data) => {
            dispatch(apiSuccess(data, feature));
        })
        .catch((error) => {
            dispatch(apiError(error, feature));
        })


    }


}


// request = { method, url, params, feature }
export const apiRequest = (request) => (
    { type: `${ request.feature } API_REQUEST`, payload: request }
);
const apiSuccess = (data, feature) => ({ type: `${feature} API_SUCCESS`, data });
const apiError = (error, feature) => ({ type: `${feature} API_ERROR`, error });