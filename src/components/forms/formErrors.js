import React from 'react';

// helper functions
export const gotError = ({touched, error, dirty}) => {

    if( (dirty || touched) && error ) return true;
    // if(error) return true;
    return false;
}

export const renderErrorField = (meta) => {

    if(gotError(meta)){
        return (
            <div className="invalid-feedback">{meta.error}</div>
        )
    }
}


export const renderCssClass = (meta) => {

    return `form-control ${ gotError(meta) ? 'is-invalid':'' }`;
}