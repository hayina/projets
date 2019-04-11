// import { useEffect } from 'react';
import axios from 'axios';



const useAjaxFetch = ({ url, method='GET', params, body, success, error, contentType="application/json" }) => {

    
    // useEffect(() => {
        
        console.log('USE API HOOK ---->', url, params, body)
        // let cancel = false;

        axios({
                // SETUP PARAMS
                baseURL: '/PROJETS/ajax',
                // baseURL: '/PROJET-API/api',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": contentType,
                },
                // PASSED PARAMS
                url,
                method,
                params,
                data: body,
            })
            .then(({ data }) => {
                // if( cancel ) return
                if(success) success(data);

            })
            .catch((errors) => {
                // if( cancel ) return
                console.log(errors);
                if(error) error(errors)
            })

            // return () => { cancel = true };
    // }, [])
    // }, [url, params])

}


export default useAjaxFetch;


        // useAjaxFetch({
        //     url,
        //     params: { q },
        //     success: (data) => {
        //         // if (state.term) { // it must be the current TERM and not the one been sent to the api server
        //         dispatch({
        //             type: 'AC_API_SUCCESS',
        //             suggestions: data.map((s) => ({ id: s.id, label: s.label }))
        //         });
        //         // }
        //     },
        //     error: (errors) => {
        //         dispatch({ type: 'AC_API_ERROR' });
        //     }

        // })
        