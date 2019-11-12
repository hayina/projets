import React, { useEffect } from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AutoComplete from './autocomplete/AutoComplete';
import { SimpleListItem, AttachLineList } from '../SimpleList';
import { uniqueHtmlID } from '../../../helpers';

////////////// helpers

const fieldCss = (meta) => `form-control ${gotError(meta) ? 'is-invalid' : ''}`;

// const gotError = ({ touched, error, dirty }) => touched && error
const gotError = ({ touched, error, dirty }) => (dirty || touched) && error

const renderErrorField = (meta) => {
    if (gotError(meta)) {
        return (<div className="invalid-feedback">{meta.error}</div>)
    }
}

////////////// SIMPLE FIELD

export const SimpleField = ({ children, meta, label, classnames = "" }) => {

    // console.log('SimpleField RENDERING ---------------------------->')

    // const hasErors = errors !== undefined ? true : false
    return (
        <div className={`form-group simple-field-wr ${classnames}`}>
            {label && <label className={`field-label form-label simple-label`}>{label}</label>}
            <div className={`simple-data`}>{children}</div>
            {meta && renderErrorField(meta)}
        </div>
    )
}

export const SimpleField2 = ({ children, label, error }) => (

    // const hasErors = errors !== undefined ? true : false

    <div className="form-group simple-field-wr">
        <label className="field-label form-label">{label}</label>
        {children}
        {error && <div className="error-feedback">{error}</div>}
    </div>
)

export const FlexField = ({ children, meta, label }) => {

    return (
        <div className="form-group flex-field-wr">
            {label && <label className="field-label flex-label">{label}</label>}
            <div className="flex-data">
                {children}
            </div>
            {meta && renderErrorField(meta)}
        </div>
    )
}


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

export const TextField = ({ input, meta, label, fieldType = 'input', placeholder = "" }) => {

    // console.log('TextField', props);

    const fieldProps = {
        ...input, // (provided by the redux-form HOC)
        placeholder,
        className: fieldCss(meta),
    };

    let renderTextField;

    if (fieldType === 'input') {
        renderTextField = <input type="text" {...fieldProps} autoComplete="off" />
    }


    else if (fieldType === 'textarea') {
        renderTextField = <textarea {...fieldProps} rows="3" />
    }

    return (
        <SimpleField label={label} meta={meta} >
            {renderTextField}
        </SimpleField>
    )
}

////////////// FILE UPLOAD

// export const UploadFile = ({ input, label, meta, multiple = false, onDelete }) => {


//     const attachs = input.value || []

//     return (
//         <SimpleField label={label} meta={meta} >
//             <input
//                 type="file"
//                 multiple={multiple}
//                 onChange={(e) => { input.onChange([...attachs, ...e.target.files]) }}
//             />
//         </SimpleField>
//     )

// }

////////////// AUTO COMPLETE

export const AutoCompleteField = ({ input, meta, label, onSelect, url, onDelete, placeholder = "" }) => {

    return (
        <SimpleField label={label} meta={meta} >
            {input.value ?
                <div className="mtem_ls">
                    <SimpleListItem item={input.value} onDelete={onDelete} />
                </div>
                :
                <AutoComplete onSelect={onSelect} url={url} validateClass={fieldCss(meta)} placeholder={placeholder} />
            }
        </SimpleField>
    )

}



////////////// RADIO

export const RadioField = ({ input, meta, label, options=[], callback }) => {


    let selectedValue = input.value

    // if selectedValue is an object { value, label}
    if (selectedValue && selectedValue.value ) {
        selectedValue = selectedValue.value
    }


    // if( options.length === 1 ) {
    //     selectedValue = options[0].value
    //     // input.onChange(options[0].value)
    // }

    return (

        <SimpleField label={label} meta={meta} classnames="radio-line" >
            {options.map((option) => {

                const inputID = uniqueHtmlID();
                return (
                    <div className="radio-item" key={option.value}>
                        <input
                            id={`${inputID}`}
                            // style={{ display: 'none' }}
                            className=""
                            type="radio"
                            value={option.value}
                            checked={option.value === selectedValue}
                            onChange={(e) => {
                                input.onChange(option.value)
                                if (callback) callback(option.value);
                            }}
                        />
                        <label htmlFor={`${inputID}`} className="radio-label">
                            {option.label}
                        </label>
                    </div>
                )
            })}
        </SimpleField>

    )

}

export const RadioList = ({ options, input, meta }) => {

    const inputID = uniqueHtmlID()
    
    return (

    <div className="radio-list-wr">
        {
            options.map((option, i) => {

                const isChecked = option.value === input.value
                return (
                    <div className="form-check" key={option.label}>
                        <input id={`${inputID}-${i}`} className="form-check-input" type="radio"
                            value={option.value}
                            checked={isChecked}
                            onChange={(e) => input.onChange(option.value)}
                        />
                        <label htmlFor={`${inputID}-${i}`} 
                            className={`radio-label form-check-label ${ isChecked ? 'radio-label-checked' : ''}`}>
                            {option.label}
                        </label>
                    </div>
                )
                
            
            })
        }
    </div>
)}





export const LineRadio = ({ input, label, btnText, btnOnClick }) => {

    return (
        <div className="radio-line form-group">

            <label className="field-label form-label">{label}</label>

            <SwitchSlider onChange={(e) => input.onChange(e.target.checked)} checked={input.value ? true : false} />

            {btnText && btnOnClick &&
                <input type="button" className={`btn btn-info show-modal ${input.value ? '' : 'hide'}`}
                    value={btnText} onClick={btnOnClick} />
            }

        </div>
    )
}


export const LineRadio2 = ({ label, btnText, btnOnClick }) => {

    return (
        <div className="radio-line form-group">

            <label className="field-label form-label">{label}</label>

            {btnText && btnOnClick &&
                <input type="button" className={`btn btn-info show-modal`} value={btnText} onClick={btnOnClick} />
            }

        </div>
    )
}

const SwitchSlider = (props) => (
    <label className="switch">
        <input type="checkbox" {...props} />
        <div className="slider round"></div>
    </label>
)

////////////// SELECT

export const SelectField = ({ input, meta, label, options, defaultLabel = "Choisir ...", onlyValue = true }) => {

    let selectedValue = input.value
    if (selectedValue && !onlyValue) {
        selectedValue = selectedValue.value
    }

    return (
        <SimpleField label={label} meta={meta} >
            <select
                className={`${fieldCss(meta)}`}
                onChange={(e) => {
                    // input.onChange(e.target.value)
                    // return
                    let changedValue;
                    const value = e.target.value
                    // if we want the value to be an object {value, label}
                    if (!onlyValue) {
                        const index = e.nativeEvent.target.selectedIndex;
                        changedValue = { value, label: e.nativeEvent.target[index].text }
                    } else { // we want just the value of option select
                        changedValue = value;
                    }

                    input.onChange(changedValue)
                }}
                value={selectedValue}
            >
                <option value='' disabled >{defaultLabel}</option>
                {options.map((op) => <option key={op.value} value={op.value}>{op.label}</option>)}
            </select>
        </SimpleField>
    )
}
export const SelectGrpField = ({ input, meta, label, optgroups, gOptsLabel = "..." }) => {

    const OptGroup = ({ optgroups }) => (
        optgroups.map(({ label, options }, index) => (
            <optgroup label={label} key={index}>
                {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </optgroup>
        ))
    )

    return (
        <SimpleField label={label} meta={meta} >

            <select
                className={`${fieldCss(meta)}`}
                onChange={input.onChange}
                value={input.value}
            >
                <option value='' disabled >{gOptsLabel}</option>
                <OptGroup optgroups={optgroups} />
            </select>
        </SimpleField>
    )
}

////////////// CHECKBOX

export const CheckboxField = ({ input, meta, label, options }) => {

    const checkboxVal = input.value || []
    return (

        <SimpleField label={label} meta={meta} >
            <div className={`check-control check-array`}>
                {/* <div className={ meta && `${fieldCss(meta)}` }> */}
                {options.map((option) => {
                    let checked = checkboxVal.indexOf(option.value) !== -1
                    return (
                        <div className="form-check" key={option.value}>
                            <input
                                id={option.value}
                                className="form-check-input hide"
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => {
                                    const newValues = [...checkboxVal];
                                    if (e.target.checked) { newValues.push(option.value) }
                                    else { newValues.splice(newValues.indexOf(option.value), 1) }
                                    input.onChange(newValues)
                                }}
                            />
                            <i className={`fa-${checked ? 'check-square checked fas' : 'square far'}`} />
                            <label className={`checkbox-label form-check-label ${checked ? 'checkbox-checked' : ''}`} htmlFor={option.value}>
                                {option.label}
                            </label>
                        </div>
                    )
                }

                )}
            </div>
            {/* { meta.error && <div className="error-feedback">{meta.error}</div> } */}
        </SimpleField>

    )

}

export const SliderCheckbox = ({ input, meta, label, options, apiFetch }) => {

    return (

        <div className="radio-line form-group">

            <label className="field-label form-label">{label}</label>
            <div className={`check-control slider-check-array`}>
                {options.map((option) => {
                    let checked = input.value.indexOf(option.value) !== -1
                    return (
                        <div className="switch-item" key={option.value}>
                            <SwitchSlider
                                id={option.value}
                                onChange={(e) => {
                                    if (apiFetch && e.target.checked) apiFetch(option.value)
                                    const newValues = [...input.value];
                                    if (e.target.checked) { newValues.push(option.value) }
                                    else { newValues.splice(newValues.indexOf(option.value), 1) }
                                    console.log(newValues)
                                    input.onChange(newValues)
                                }}
                                checked={checked}
                            />
                            <label className="checkbox-label form-check-label" htmlFor={option.value}>
                                {option.label}
                            </label>
                        </div>
                    )
                }
                )}
            </div>
            {meta.error && <div className="error-feedback">{meta.error}</div>}

        </div>

    )

}


/////////////////// TOGGLE

export const ToggleField = ({ label, input, callback }) => {


    const checked = input.value ? true : false
    const inputID = uniqueHtmlID();

    return (
        <div className="form-group simple-field-wr">
            <input
                id={inputID}
                type="checkbox"
                className="hide"
                checked={checked}
                onFocus={input.onFocus}
                onChange={(e) => {
                    if (callback && e.target.checked) { callback() };
                    input.onChange(e.target.checked)
                }}
            />
            <i className={
                `_fa_check fa-${checked ? 'check-square checked fas' : 'square far'}`
            } />

            <label
                className={`field-label form-check-label`}
                // className={`form-check-label`}
                htmlFor={inputID}
            >
                {label}
            </label>
        </div>
    )
}





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

///////////////// DATE

export const DateField = ({ input, meta, label }) => {


    let dateValue = input.value || null
    // ? input.value : null
    // ? input.value : new Date()

    if (dateValue != null) {
        dateValue = new Date(dateValue)
    }

    // console.log(input.name, "--> touched", meta.touched, "dirty", meta.dirty)



    return (
        <SimpleField label={label} meta={meta} >
            <DatePicker
                className="datepicker form-control"
                dateFormat="dd/MM/yyyy"
                selected={dateValue}
                onChange={(date) => {
                    // input.onChange(date ? date.setHours(0,0,0,0) : date )
                    input.onChange(date ? date.setHours(10) : date)
                    console.log(date)
                    // console.log(new Date(date))
                    // input.onChange(formatDate(e.target.value)) 
                }}
            // onChange={ input.onChange }
            />
        </SimpleField>
    )

}

//////////

export const SpecialLine = ({ children, className = '' }) => (
    <div className={`mtem_ls ${className}`} >
        {children}
    </div>
)


///////////// LINE WITH A BUTTON ADD SOMETHING

export const LineAddButton = ({ label, callback, textButton='Ajouter', showBtn=true }) => {

    return (
        <div className="line-add-button">
            <label className="field-label form-label">{label}</label>
            {   
                showBtn && 
                <input 
                    type="button" 
                    className="btn btn-info show-modal"
                    value={textButton}
                    onClick={ callback }
                />
            }
        </div>
    )
}