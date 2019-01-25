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

const renderTextField = (fieldType, fieldProps) => {

    if(fieldType === 'input' || !fieldType)
        return (<input {...fieldProps} />);

    if(fieldType === 'textarea')
        return (<textarea {...fieldProps} />)

}

// the component
const TextField = ({input, meta, label, fieldType}) => {

    const fieldProps = { 
        ...input, // redux input
        type: "text",
        className: `form-control ${ gotError(meta) ? 'is-invalid':'' }`,
        autoComplete: "off",
    };


    return (
        <div className="form-group">

            <label>{label}</label>
            { renderTextField(fieldType, fieldProps) }
            { renderErrorField(meta) }

        </div>
    )
}

//

export default TextField;