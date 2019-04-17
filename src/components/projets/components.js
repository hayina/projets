import React from 'react'
import { fieldType } from '../../types';


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