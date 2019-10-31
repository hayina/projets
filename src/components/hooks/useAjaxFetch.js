import axios from 'axios';

import { logoutUser } from '../../actions';
import { store } from '../../store';


const useAjaxFetch = ({ 
            always, url, method='GET', params, body, success, error, 
            contentType="application/json",
            // redirect=false, history, 
            setForbbiden

         }) => {

    axios({
            // SETUP PARAMS
            baseURL: '/PROJET-API/api',
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
            if(success) success(data);
        })
        .catch((errors) => {

            console.log(errors);
            if(error) error(errors)

            if(errors.response.status === 401) {
                localStorage.removeItem("userInfo");
                store.dispatch(logoutUser())
                console.log("UnAutorized");
            } else if(errors.response.status === 403){
                console.log("Forbidden");

                if(setForbbiden) setForbbiden(true)
                // if(redirect) {
                //     // console.log("history", history);
                //     // console.log("history.location", history.location);
                //     // console.log("history.location.pathname", history.location.pathname);
                //     history.push('/forbidden')
                // }
            }
        })
        .then(() => {
            if(always) always();
        })
}


export default useAjaxFetch;

