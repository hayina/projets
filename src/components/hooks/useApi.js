import { useEffect, useReducer } from 'react';
import axios from 'axios';


const initialState = {
    // data: undefined,
    loading: false,
    errors: false,
}

const reducer = (state, action) => {

    switch (action.type) {

        case 'API_REQUEST':
            return { ...initialState, loading: true }

        case 'API_SUCCESS':
            return { ...initialState, data: action.data }

        case 'API_ERROR':
            return { ...initialState, errors: true }

        default:
            throw new Error();
    }
}

const useApi = ({ url, method='GET', params, success, initialData }) => {

    console.log('USE API HOOK ---->', url)
    const [state, dispatch] = useReducer(reducer, { ...initialState, data: initialData });

    useEffect(() => {

        let cancel = false;

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
            .then(({ data }) => {
                if( cancel ) return
                dispatch({ type: 'API_SUCCESS', data });
                success(data);

            })
            .catch((error) => {
                if( cancel ) return
                console.log(error);
                dispatch({ type: 'API_ERROR' })
            })

            return () => { cancel = true };
    }, [])


    return { ...state }
}


export default useApi;