import React from 'react'

export const ApiError = ({cssClass}) => (
    <div className={`api-error ${cssClass}`}>
        <span>Une erreur s'est produit</span> 
        <i className="fas fa-info-circle"></i>
    </div>
)