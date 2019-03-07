import React from 'react';

import AutoComplete from './AutoComplete';


////////////// helpers

const fieldCss = (meta) => `form-control ${gotError(meta) ? 'is-invalid' : ''}`;

const gotError = ({ touched, error, dirty }) => {
    if( (dirty || touched) && error ) return true;
    return false;
}

const renderErrorField = (meta) => {
    if(gotError(meta)){
        return (<div className="invalid-feedback">{meta.error}</div>)
    }
}

////////////// SIMPLE FIELD

export const SimpleField = ({ children, meta, label }) => (
    <div className="form-group">
        <label className="form-label">{label}</label>
        {children}
        {renderErrorField(meta)}
    </div>
)

// props -> { input, meta }

// meta 
    // active: false
    // asyncValidating: false
    // autofilled: false
    // dirty: false
    // dispatch: ƒ ()
    // error: "Required"
    // form: "projetForm"
    // initial: "YOUSSEF PROJET"
    // invalid: true
    // pristine: true
    // submitFailed: false
    // submitting: false
    // touched: false
    // valid: false
    // visited: false
    // warning: undefined

// input 
    // name: "intitule"
    // onBlur: ƒ (event)
    // onChange: ƒ (event)
    // onDragStart: ƒ (event)
    // onDrop: ƒ (event)
    // onFocus: ƒ (event)
    // value: "..."


////////////// TEXT TEXTAREA

export const TextField = (props) => {

    const { input, meta, label, fieldType, autoComplete, reduxForm } = props;
    // console.log('TextField', props);

    const fieldProps = {
        ...input, // (provided by the redux-form HOC)
        className: fieldCss(meta),
    };

    const renderTextField = () => {

        if (fieldType === 'input') {

            if ( autoComplete ) {
                // change(form:String, field:String, value:any)
                return (
                    <AutoComplete { ...(reduxForm && {reduxForm}) } />
                )
            }

            return <input type="text" {...fieldProps} autoComplete="off" />
        }
        else if (fieldType === 'textarea') {
            return <textarea {...fieldProps} />
        }
    }

    return (
        <SimpleField label={label} meta={meta} >
            {renderTextField()}
        </SimpleField>
    )
}


////////////// CHECKBOX

export const CheckboxField = ({ input, meta, label, options }) => {

    return (

        <SimpleField label={label} meta={meta} >
            <div className={`${fieldCss(meta)}`}>
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
                                // console.log('Checkbox', newValues)
                                input.onChange(newValues); // it's like dispatch(change(newValues))
                                // change(form:String, field:String, value:any)

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
            {options.map((option) => (
                <div className="form-check" key={option.value}>
                    <input
                        className="form-check-input"
                        type="radio"
                        value={option.value}
                        checked={option.value === input.value}
                        onChange={(e) => input.onChange(option.value)}
                    />
                    <label className="form-check-label">
                        {option.label}
                    </label>
                </div>
            ))}
        </SimpleField>

    )

}


////////////// SELECT

export const SelectField = ({ input, meta, label, options }) => {

    return (
        <SimpleField label={label} meta={meta} >
            <select
                className={`${fieldCss(meta)}`}
                onChange={(e) => input.onChange(e)}
                value={input.value}
            >
                <option value=''>...</option>
                {options.map((op) => <option key={op.value} value={op.value}>{op.label}</option>)}
            </select>
        </SimpleField>
    )
}



