import React from 'react'
import { ApiError } from '../helpers'


export const ButtonSpinner = ({ label, isLoading=false, callback }) => (

    <button className={`btn-loader-wr btn btn-primary ${ isLoading ? 'is-submitting' : '' }`} onClick={callback}>
        <span>{ label }</span>
        { isLoading ? <div className="btn-loader"></div> : null }
    </button>
)

export const FooterForm = ({ errors, ...btnProps }) => (

    <>
        <div className={`form-validation`}>
            <ButtonSpinner { ...btnProps }/>
        </div>
        
        { errors && <ApiError cssClass="va-errors"/> }
    </>
)