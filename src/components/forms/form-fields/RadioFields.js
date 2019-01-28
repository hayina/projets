import React from 'react';


const renderRadios = (options) => {


}

const RadioField = ({ input, meta, label, options }) => {


    
    const { value, onChange } = input;
    // console.log(input.value);
    
    // update of the value property in radio input
    // input.value = valueField;

    return (

        <div className="form-group">
            <label>{label}</label>
            { options.map((option) => (
                <div className="form-check" key={option.value}>
                    <input
                        className="form-check-input"
                        type="radio"
                        // 
                        // {...input}
                        value={ option.value }
                        checked={ option.value === value }
                        onChange={onChange}
                    />
                    <label className="form-check-label">
                        {option.label}
                    </label>
                </div>
            )) }
        </div>

    )

}

export default RadioField;