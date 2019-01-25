import React from 'react';

// helper functions
const gotError = ({touched, error}) => {

    if(touched && error) return true;
    return false;
}

const renderErrorField = (meta) => {

    if(gotError(meta))
        return (
            <div className="invalid-feedback">{meta.error}</div>
        )
}

// the component
const TextareaField = ({input, label, meta}) => {

    return (
        <div className="form-group">
            <label>{label}</label>
            <textarea 
                type="text" 
                className={`form-control ${ gotError(meta) ? 'is-invalid':''}`}
                autoComplete="off"
                {...input}
            />
            { renderErrorField(meta) }
            
        </div>
    )
}

//

export default TextareaField;