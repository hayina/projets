import React from 'react';

import SimpleField from './SimpleField';
import { gotError } from '../formErrors';


////////////// TEXT TEXTAREA
export const TextField = ({input, meta, label, fieldType}) => {

    const fieldProps = { 
        ...input, // redux input (provided by the redux form HOC)
        type: "text",
        className: `form-control ${ gotError(meta) ? 'is-invalid':'' }`,
        autoComplete: "off",
    };

    const renderTextField = () => {
        if(fieldType === 'input')
            return (<input {...fieldProps} />);
        else if(fieldType === 'textarea')
            return (<textarea {...fieldProps} />)
    }

    return (
        <SimpleField label={label} meta={meta} >
            { renderTextField(fieldType, fieldProps) }
        </SimpleField>
    )
}

////////////// CHECKBOX
export const CheckboxField = ({ input, meta, label, options }) => {    

    return (

        <SimpleField label={label} meta={meta} >
            <div className={`form-control ${ gotError(meta) ? 'is-invalid':'' }`}>
            {options.map((option) => (
                <div className="form-check" key={option.value}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={input.value.indexOf(option.value) !== -1}
                        //
                        onChange={(e) => {
                            const newValues = [...input.value];
                            if (e.target.checked) {
                                newValues.push(option.value);
                            } else {
                                newValues.splice(newValues.indexOf(option.value), 1);
                            }
                            return input.onChange(newValues);
                        }}
                    />
                    <label className="form-check-label">
                        {option.label}
                    </label>
                </div>
            ))}
            </div>
        </SimpleField>

    )

}

////////////// RADIO
export const RadioField = ({ input, meta, label, options }) => {

    return (

        <SimpleField label={label} meta={meta} >
            { options.map((option) => (
                <div className="form-check" key={option.value}>
                    <input
                        className="form-check-input"
                        type="radio"
                        value={ option.value }
                        checked={ option.value === input.value }
                        onChange={(e) => input.onChange(option.value)}
                    />
                    <label className="form-check-label">
                        {option.label}
                    </label>
                </div>
            )) }
        </SimpleField>

    )

}


////////////// SELECT
export const SelectField = ({ input, meta, label, options }) => {

    return (
        <SimpleField label={label} meta={meta} >
            <select 
                className={`form-control ${gotError(meta) ? 'is-invalid' : ''}`}
                onChange={(e) => input.onChange(e)}
                value={input.value}
            >
                <option value=''>...</option>
                {options.map((op) => <option key={op.value} value={op.value}>{op.label}</option>)}
            </select>
        </SimpleField>
    )
}



