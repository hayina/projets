import React from 'react';


const RadioField = ({ input, meta, label, valueField }) => {


    // update of the value property in radio input
    input.value = valueField;

    return (

        <div className="form-check">
            <input 
                className="form-check-input" 
                type="radio" 
                { ...input }
            />
            <label className="form-check-label">{label}</label>
        </div>

    )
        
}
        
export default RadioField;