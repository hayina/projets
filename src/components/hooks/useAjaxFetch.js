import { useEffect } from 'react';
import axios from 'axios';



const useAjaxFetch = ({ url, method='GET', params, success, error }) => {

    
    useEffect(() => {
        
        console.log('USE API HOOK ---->', url, params)
        let cancel = false;

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
                success(data);

            })
            .catch((errors) => {
                if( cancel ) return
                console.log(errors);
                error(errors)
            })

            return () => { cancel = true };
    }, [])
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
        