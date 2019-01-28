import React from 'react';

import { gotError, renderErrorField } from '../formErrors';


const renderTextField = (fieldType, fieldProps) => {

    if(fieldType === 'input' || !fieldType)
        return (<input {...fieldProps} />);

    if(fieldType === 'textarea')
        return (<textarea {...fieldProps} />)

}

// the component
const TextField = ({input, meta, label, fieldType}) => {

    const fieldProps = { 
        ...input, // redux input (provided by the redux form HOC)
        type: "text",
        className: `form-control ${ gotError(meta) ? 'is-invalid':'' }`,
        autoComplete: "off",
    };


    return (
        <div className="form-group">

            <label className="form-label">{label}</label>
            { renderTextField(fieldType, fieldProps) }
            { renderErrorField(meta) }

        </div>
    )
}

//

export default TextField;