// import { useEffect } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'


import { withRouter } from "react-router-dom";
import { logoutUser } from '../../actions';
import { store } from '../../store';


const useAjaxFetch = ({ history, dispatch, url, method='GET', params, body, success, error, contentType="application/json" }) => {

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
            }
        })
}


export default useAjaxFetch;

