import axios from 'axios';

import types from '../types';

const currentRequests = {};

export const apiMiddleware = ({ dispatch }) => next => async (action) => {

    next(action);

    if (action.type.includes(types.API_REQUEST)) {

        const { url, method, params, feature, race, requestType } = action.payload;

        //// for checking many concurrent requests
        const idRequest = new Date().getMilliseconds();
        currentRequests[requestType] = idRequest;

        try {

            console.log(`processing request n° --> ${idRequest}`);

            const response = await axios({
                // SETUP PARAMS
                baseURL: '/PROJETS/ajax',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                // PASSED PARAMS
                method,
                url,
                params
            });

            if (checkLastRequest(race, idRequest, requestType)) {
                dispatch(apiSuccess(response.data, feature));
            }
        } 
        
        catch (error) {
            if (checkLastRequest(race, idRequest, requestType)) {
                dispatch(apiError(error, feature));
            }
        }
    }
}

const checkLastRequest = (race, idRequest, requestType) => {
    return ( !race || idRequest === currentRequests[requestType] );
}

// request = { method, url, params, feature }
export const apiRequest = (request) => (
    { type: `${request.feature} API_REQUEST`, payload: request }
);

const apiSuccess = (data, feature) => ({ type: `${feature} API_SUCCESS`, data });
const apiError = (error, feature) => ({ type: `${feature} API_ERROR`, error });