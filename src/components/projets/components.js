import React from 'react'
import { fieldType } from '../../types';
import { uniqueHtmlID } from '../../helpers';


export const CretereItem = ({ label, fType=fieldType.TEXT, options=[] }) => {
    
    function renderField(){

        // eslint-disable-next-line default-case
        switch (fType) {

            case fieldType.TEXT:
                return <input className="cr-input" type="text" />

            case fieldType.SELECT:
                return (
                    <select className="cr-input">
                        <option value=''>...</option>
                        {options.map((op) => <option key={op.value} value={op.value}>{op.label}</option>)}
                    </select>
                )
        }

    }
    
    return (
        <div className="cr-item">
            <label className="cr-label db_2">{label}</label>
            { renderField() }
        </div>
    )
}


export const Select = ({options, defaultOption="...", input}) => {

    return (
        <select className="cr-input" { ...input }>
            <option value='' disabled >{defaultOption}</option>
            {options.map((op) => <option key={op.value} value={op.value}>{op.label}</option>)}
        </select>
    )
}

export const Radio = ({options, input, all=false}) => {

    const RadioItem = ({option}) => {
        const inputID = uniqueHtmlID();
        return (
            <div className="radio-item">
                <input id={inputID} type="radio"
                    value={ option.value }
                    onChange= { (e) => input.onChange(option.value) }
                    checked={option.value === input.value}
                />
                <label htmlFor={inputID}>{option.label}</label>
            </div>
        )
    }
    
    return (
        <React.Fragment>
            { all && <RadioItem option={{ value: 0, label: 'TOUT'}} /> }
            { options.map((op) => <RadioItem option={op} key={op.value} />) }
        </React.Fragment>    
    )
}

export const Input = ({input, placeholder, type="text"}) => {

    return (
        <input className="cr-input" type={type} placeholder={placeholder} { ...input } />  
    )
}