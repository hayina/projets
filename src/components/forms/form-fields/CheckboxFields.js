import React from 'react';

import SimpleField from './SimpleField';
import { gotError } from '../formErrors';

const CheckboxField = ({ input, meta, label, options }) => {    

    return (

        <SimpleField label={label} meta={meta} >
            <div className={`form-control ${ gotError(meta) ? 'is-invalid':'' }`}>
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
                            return input.onChange(newValues);
                        }}
                    />
                    <label className="form-check-label">
                        {option.label}
                    </label>
                </div>
            ))}
            </div>
        </SimpleField>

    )

}

export default CheckboxField;