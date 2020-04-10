/* eslint-disable no-unused-vars */
import axios from 'axios';

import { logoutUser, hideModal } from '../../actions';
import { store } from '../../store';
import { getItemFromStorage, deleteSigninTokens, logoutAndClean } from '../../helpers';


const useAjaxFetch = ({ 
            always, url, method='GET', params, body, success, error, 
            contentType="application/json", jwtToken=true,
            // redirect=false, history, 
            setForbbiden

         }) => {

            let authorization = "N/A"
            if(jwtToken) {
                authorization = getItemFromStorage("token")
            }



    axios({
            // SETUP PARAMS
            baseURL: '/PROJET-API/api',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": contentType,
                "Authorization": authorization
            },
            // PASSED PARAMS
            url,
            method,
            params,
            data: body,
        })
        .then(({ data, headers }) => {
            if(success) {
                success(data, headers);
            }
        })
        .catch((errors) => {

            console.log(errors);
            if(error) error(errors)

            if(errors.response.status === 401 ) { // errors.response.status === 404
                // localStorage.removeItem("userInfo");
                logoutAndClean()
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

