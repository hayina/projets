import React from 'react';

import AutoComplete from './autocomplete/AutoComplete';
import SelectedAC from './SelectedAC'

////////////// helpers

const fieldCss = (meta) => `form-control ${gotError(meta) ? 'is-invalid' : ''}`;

const gotError = ({ touched, error, dirty }) => {
    if ((dirty || touched) && error) return true;
    return false;
}

const renderErrorField = (meta) => {
    if (gotError(meta)) {
        return (<div className="invalid-feedback">{meta.error}</div>)
    }
}

////////////// SIMPLE FIELD

export const SimpleField = ({ children, meta, label }) => (
    <div className="form-group simple-field-wr">
        <label className="field-label form-label">{label}</label>
        { children }
        { meta && renderErrorField(meta) }
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

    const { input, meta, label, fieldType } = props;
    // console.log('TextField', props);

    const fieldProps = {
        ...input, // (provided by the redux-form HOC)
        className: fieldCss(meta),
    };

    let renderTextField;

    if (fieldType === 'input') {
        renderTextField = <input type="text" {...fieldProps} autoComplete="off" />
    }

    else if (fieldType === 'textarea') {
        renderTextField = <textarea {...fieldProps} />
    }
    

    return (
        <SimpleField label={label} meta={meta} >
            { renderTextField }
        </SimpleField>
    )
}


////////////// AUTO COMPLETE

export const AutoCompleteField = ({ input, meta, label, onSelect, url, onDelete }) => {

    // const acProps = { ...ac, meta }

    return (
        <SimpleField label={label} meta={meta} >
            { input.value ?
                <SelectedAC suggestion={input.value} onDelete={onDelete} />
                // <SelectedAC suggestion={suggestion} onDelete={onDelete} />
                :
                // <div className={`${fieldCss(meta)}`}>
                    <AutoComplete onSelect={onSelect} url={url} /> 
                // </div>
                // fieldCss(meta)
            }
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
                        <label className="checkbox-label form-check-label">
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
                        id={`${option.value}`}
                        // style={{ display: 'none' }}
                        className="form-check-input"
                        type="radio"
                        value={option.value}
                        checked={option.value === input.value}
                        onChange={(e) => input.onChange(option.value)}
                    />
                    {/* {   option.value === input.value ? 
                        <i className="fas fa-dot-circle"></i>
                        :
                        <i className="far fa-dot-circle"></i>
                    } */}
                    <label htmlFor={`${option.value}`} className="radio-label form-check-label">
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


/////////////////// TOGGLE

export const ToggleField = ({label, input}) => {

    const checked = input.value ? true:false

    return (
        <div className="form-group simple-field-wr">
            <input 
                id={`toggle-field`}
                type="checkbox"
                className="hide"
                checked={checked}
                onChange={(e) => {
                    input.onChange(e.target.checked)
                }}
            />
            <i className={
                `fa-${ checked ? 'check-square checked fas' : 'square far' }`
            } />

            <label 
                className={`form-check-label`}
                htmlFor={`toggle-field`}
            >
                {label}
            </label>
        </div>
    )
}




////////////// SIMPLE FIELD

export const TextInput = (props) => (
    <input type="text" autoComplete="off" {...props} />
)