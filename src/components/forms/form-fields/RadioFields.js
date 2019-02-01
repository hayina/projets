import React from 'react';

import SimpleField from './SimpleField';

const RadioField = ({ input, meta, label, options }) => {

    return (

        <SimpleField label={label} meta={meta} >
            { options.map((option) => (
                <div className="form-check" key={option.value}>
                    <input
                        className="form-check-input"
                        type="radio"
                        value={ option.value }
                        checked={ option.value === input.value }
                        onChange={(e) => input.onChange(option.value)}
                    />
                    <label className="form-check-label">
                        {option.label}
                    </label>
                </div>
            )) }
        </SimpleField>

    )

}

export default RadioField;