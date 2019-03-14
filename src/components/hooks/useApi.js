import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';


const initialState = {
    data: undefined,
    loading: false,
    error: false,
}

const reducer = (state, action) => {

    switch (action.type) {

        case 'API_REQUEST':
            return { ...initialState, loading: true }

        case 'API_SUCCESS':
            return { ...state, data: action.data }

        case 'API_ERROR':
            return { ...state, error: true }

    }
}

const useApi = ({ url, method, params, feature }) => {

    console.log('USE API HOOK ---->', url)
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {

        dispatch({ type: 'API_REQUEST' });

        axios({
                // SETUP PARAMS
                baseURL: '/PROJETS/ajax',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "X-Requested-With": "XMLHttpRequest",

                },
                // PASSED PARAMS
                url,
                method,
                params
            })
            .then((response) => {

                dispatch({ type: 'API_SUCCESS', data: response.data })

            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: 'API_ERROR' })
            })
    }, [])


    return { ...state }
}


export default useApi;