import React from 'react';

const CheckboxField = ({ input, meta, label, options }) => {

    console.log(input.value)
    

    return (

        <div className="form-group">
            <label>{label}</label>
            { options.map((option) => (
                <div className="form-check" key={option.value}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        // 
                        // {...input}
                        value={ option.value }
                        // checked={ option.value === input.value }
                        onChange={input.onChange}
                    />
                    <label className="form-check-label">
                        {option.label}
                    </label>
                </div>
            )) }
        </div>

    )

}

export default CheckboxField;