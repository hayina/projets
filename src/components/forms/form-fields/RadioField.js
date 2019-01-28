import React from 'react';


const RadioField = ({ input, meta, label, valueField }) => {


    // console.log(input.value);

    // update of the value property in radio input
    // input.value = valueField;

    return (

        <div className="form-check">
            <input 
                className="form-check-input" 
                type="radio" 
                // checked={ valueField ===  }
                { ...input }
            />
            <label className="form-check-label">{label}</label>
        </div>

    )
        
}
        
export default RadioField;