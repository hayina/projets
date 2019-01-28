import React from 'react';

import { gotError, renderErrorField } from '../formErrors';

const renderOptions = (options) => {
    return options.map((op) => <option key={op.value} value={op.value}>{op.label}</option>);
}

const SelectField = ({ input, meta, label, options }) => {


    return (
        <div className="form-group">
            <label>{label}</label>
            <select className={`form-control ${gotError(meta) ? 'is-invalid' : ''}`}
                
                onChange={(e) => input.onChange(e)}
                value={input.value}
            // {...input}
            >
                <option value=''>...</option>
                {renderOptions(options)}
            </select>
            {renderErrorField(meta)}
        </div>
    )

}

export default SelectField;