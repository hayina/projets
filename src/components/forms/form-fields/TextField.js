import React from 'react';

import SimpleField from './SimpleField';
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
        <SimpleField label={label} meta={meta} >
            { renderTextField(fieldType, fieldProps) }
        </SimpleField>
    )
}

//

export default TextField;