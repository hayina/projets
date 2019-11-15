import React from 'react'

export const ApiError = ({ cssClass }) => (
    <div className={`api-error ${cssClass}`}>
        <span>Une erreur s'est produit</span>
        <i className="fas fa-info-circle"></i>
    </div>
)

export const SepLine = () => <div className="sep-line-tiny"></div>

export const SpinnerWh = () => (
    <svg className="svg-spinner" viewBox="0 0 44 44">
        <circle className="path" cx="22" cy="22" r="20" fill="none" strokeWidth="4"></circle>
    </svg>
)