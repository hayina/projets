import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import './login.css';
import { setBreadCrumb, loginUser } from '../actions';
import useAjaxFetch from './hooks/useAjaxFetch';
import { ApiError } from './helpers';
import { FooterForm } from './divers';
import { isAuthenticated } from '../reducers/login';
import { setSigninTokens, getItemFromStorage } from '../helpers';

const Login = ({ dispatch, history, from, isAuth }) => {

    console.log("History -------------------------------->", history)
    console.log("from -------------------------------->", from)

    const loginForm = 'loginForm';

    const [errMsg, setErrMsg] = useState('');
    const [apiError, setApiError] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const loginRef = useRef(null)
    const passwordRef = useRef(null)

    useEffect(() => {
        dispatch(setBreadCrumb("Login"))
    }, [])

    const onSubmit = (e) => {

        e.preventDefault()

        const login = loginRef.current.value;
        const password = passwordRef.current.value;

        setErrMsg('')
        if( !login || !password ) {
            setErrMsg('Veuiller Saisir votre login/mot de passe')
            return;
        }

        setSubmitting(true)
        setApiError(false)

        // return

        useAjaxFetch({
            url: '/login',
            method: 'POST',
            body: { login, password },
            success: (data, headers) => {

                setSubmitting(false)
                sessionStorage.removeItem("token");

                switch(data) {

                    case 0 :
                        setErrMsg('login/mot de passe incorrect')
                        
                        break;
                    case -1 :
                        setErrMsg('Ce compte est désactivé')
                        break;
                    default :
                        console.log('Success ->', data)
                        console.log('Authorization ->', headers.authorization)
                        setSigninTokens({ token: headers.authorization, userInfo: JSON.stringify(data) })
                        dispatch(loginUser(data))
                        console.log('Authorization From Storage ->', getItemFromStorage("token"))
                        // history.push(from ? from : '/projets/search')

                }
                
                
            },
            error: (err) => {
                setApiError(true)
                setSubmitting(false)
            }
        })
    }

    const inpSubmitCss = submitting ? 'inp-submitting':''
    // const waiting = submitting ? 'waiting':''
    // ${ submitting ? 'form-submitting is-submitting':'' }

    // console.log("LOGIN")

    return (
        !isAuth ?
        <form onSubmit={ onSubmit } id={loginForm} 
            className={`form-content box-sh box-br ${ submitting ? 'no-touch' : '' }`}>

                <input 
                    className={`log-i form-control ${inpSubmitCss}`} 
                    type="text" placeholder="login" ref={ loginRef } 
                    defaultValue="yous"
                />
                <input 
                    className={`log-i form-control ${inpSubmitCss}`} 
                    type="password" placeholder="password" ref={ passwordRef }  
                    defaultValue="yous"
                />
            

                <FooterForm label={"login"} callback={ onSubmit } isLoading={submitting} errors={apiError} />

                {/* <div className={`form-validation`}>
                    <button type="submit" className={`btn btn-primary submit-btn ${waiting}`}>
                        login { submitting ? '...':'' }
                    </button>
                </div> */}

                { errMsg && <div className="err-login">{errMsg}</div> }
                {/* { apiError && <ApiError cssClass="va-errors"/> } */}


        </form>
        :
        <div className="notif-warnig">Vous êtes déjà connecté :=)</div>
    )
}

export default connect(state => ({isAuth: isAuthenticated(state)}))(Login);

