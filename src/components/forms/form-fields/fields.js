import React, { useEffect } from 'react';
import { change } from 'redux-form'

import AutoComplete from './autocomplete/AutoComplete';
import SelectedAC from './SelectedAC'
import { SimpleListItem } from '../SimpleList';

////////////// helpers

const fieldCss = (meta) => `form-control ${ gotError(meta) ? 'is-invalid' : '' }`;

const gotError = ({ touched, error, dirty }) => touched && error
// const gotError = ({ touched, error, dirty }) => (dirty || touched) && error

const renderErrorField = (meta) => {
    if (gotError(meta)) {
        return (<div className="invalid-feedback">{meta.error}</div>)
    }
}

////////////// SIMPLE FIELD

export const SimpleField = ({ children, meta, label, errors }) => {

    // console.log('SimpleField RENDERING ---------------------------->')

    // const hasErors = errors !== undefined ? true : false
    return (
        <div className="form-group simple-field-wr">
            { label && <label className="field-label form-label">{label}</label> }
            { children }
            { meta && renderErrorField(meta) }
        </div>
    )
}

export const SimpleField2 = ({ children, label, error }) => (

    // const hasErors = errors !== undefined ? true : false

    <div className="form-group simple-field-wr">
        <label className="field-label form-label">{label}</label>
        { children }
        { error && <div className="error-feedback">{error}</div> }
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
                // <React.Fragment>
                // <SelectedAC suggestion={input.value} onDelete={onDelete} />
                <SimpleListItem item={input.value} onDelete= {onDelete} />
                // </React.Fragment>
                :
                // <div className={`${fieldCss(meta)}`}>
                    <AutoComplete onSelect={onSelect} url={url} validateClass={fieldCss(meta)}/> 
                // </div>
                // fieldCss(meta)
            }
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

export const RadioList = ({options, input}) => 
    options.map((option) => (
        <div className="form-check" key={option.label}>
            <input id={option.label} className="form-check-input" type="radio"
                value={option.value}
                checked={option.value === input.value}
                onChange={(e) => input.onChange(option.value)}
            />
            <label htmlFor={option.label} className="radio-label form-check-label">
                {option.label}
            </label>
        </div>
    ))


export const LineRadio = ({input, label, btnText, btnOnClick}) => {

    return (
        <div className="radio-line form-group">
            
            <label className="field-label form-label">{label}</label>

            <SwitchSlider onChange={ (e) => input.onChange(e.target.checked) } checked={input.value ? true:false} />

            { btnText && btnOnClick && 
                <input type="button" className={`btn btn-info show-modal ${input.value ? '':'op-hide'}`} 
                    value={btnText} onClick={btnOnClick} />
            }
            
        </div>
    )
}

const SwitchSlider = (props) => (
    <label className="switch">
        <input type="checkbox" name="cloture" {...props} />
        <div className="slider round"></div>
    </label>
)

////////////// SELECT

export const SelectField = ({ input, meta, label, options, defaultLabel="..." }) => {

    // console.log('SelectField -> ', options)
    return (
        <SimpleField label={label} meta={meta} >
            <select
                className={`${fieldCss(meta)}`}
                onChange={input.onChange}
                value={input.value}
            >
                <option value='' disabled >{defaultLabel}</option>
                {options.map((op) => <option key={op.value} value={op.value}>{op.label}</option>)}
            </select>
        </SimpleField>
    )
}
export const SelectGrpField = ({ input, meta, label, optgroups, gOptsLabel="..." }) => {

    // console.log('SelectField -> ', options)
    return (
        <SimpleField label={label} meta={meta} >

            <select
                className={`${fieldCss(meta)}`}
                onChange={input.onChange}
                value={input.value}
            >
                <option value='' disabled >{gOptsLabel}</option>
                {   
                    optgroups.map(({label, options}, index) => (
                        <optgroup label={label} key={index}>
                            { options.map(({value, label}) => <option key={value} value={value}>{label}</option>) }
                        </optgroup>
                    )) 
                }
            </select>
        </SimpleField>
    )
}

////////////// CHECKBOX

export const CheckboxField = ({ input, meta, label, options }) => {

    return (

        <SimpleField label={label} meta={meta} >
            <div className={ `check-control check-array` }>
            {/* <div className={ meta && `${fieldCss(meta)}` }> */}
                { options.map((option) => {
                    let checked = input.value.indexOf(option.value) !== -1
                    return (
                    <div className="form-check" key={option.value}>
                        <input
                            id={option.value}
                            className="form-check-input hide"
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {
                                const newValues = [...input.value];
                                if (e.target.checked) { newValues.push(option.value) } 
                                else { newValues.splice(newValues.indexOf(option.value), 1) }
                                input.onChange(newValues)
                            }}
                        />
                        <i className={ `fa-${ checked ? 'check-square checked fas' : 'square far' }` }/>
                        <label className="checkbox-label form-check-label" htmlFor={option.value}>
                            {option.label}
                        </label>
                    </div>
                )}
                
                )}
            </div>
            { meta.error && <div className="error-feedback">{meta.error}</div> }
        </SimpleField>

    )

}

export const SliderCheckbox = ({ input, meta, label, options }) => {

    return (

        <div className="radio-line form-group">
            
            <label className="field-label form-label">{label}</label>
            <div className={ `check-control slider-check-array` }>
                { options.map((option) => {
                    let checked = input.value.indexOf(option.value) !== -1
                    return (
                    <div className="switch-item" key={option.value}>
                        <SwitchSlider 
                            id={option.value}
                            onChange={(e) => {
                                const newValues = [...input.value];
                                if (e.target.checked) { newValues.push(option.value) } 
                                else { newValues.splice(newValues.indexOf(option.value), 1) }
                                input.onChange(newValues)
                            }} 
                            checked={checked} 
                        />
                        <label className="checkbox-label form-check-label" htmlFor={option.value}>
                            {option.label}
                        </label>
                    </div>
                    )}
                )}
            </div>
            { meta.error && <div className="error-feedback">{meta.error}</div> }

        </div>

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
                onFocus={ input.onFocus }
                onChange={ (e) => input.onChange(e.target.checked) }
            />
            <i className={
                `_fa_check fa-${ checked ? 'check-square checked fas' : 'square far' }`
            } />

            <label 
                className={`field-label form-check-label`}
                // className={`form-check-label`}
                htmlFor={`toggle-field`}
            >
                {label}
            </label>
        </div>
    )
}




////////////// SIMPLE FIELD

export const TextInput = ({ input, meta, placeholder='', type='text', autoComplete='off' }) => (
    <div className="in_wr">
        <input 
            type={type} placeholder={placeholder} autoComplete={autoComplete}  
            className={`form-control ${ meta.error ? 'has-errors' : '' }`} 
            { ...input } 
        />
        { meta.error && <div className="error-feedback">{meta.error}</div> }
    </div>
)
////////////// Empty Field

export const EmptyField = ({ input, meta, arrayValues }) => {
    
    console.log('EmptyField Rendering ..................')
    
    useEffect(() => {
        console.log('useEffect EmptyField ... >>>>>>')
        input.onChange(arrayValues)
    }, [arrayValues])
    

    return (
        <React.Fragment>
        {
            meta.touched && meta.error && 
            <div className="error-feedback">{meta.error}</div>
        }
        </React.Fragment>
    )

}