import React from 'react';

import SimpleField from './SimpleField';
import { gotError, renderErrorField } from '../formErrors';

const renderOptions = (options) => {
    return options.map((op) => <option key={op.value} value={op.value}>{op.label}</option>);
}

const SelectField = ({ input, meta, label, options }) => {


    return (
        <SimpleField label={label} meta={meta} >
            <select className={`form-control ${gotError(meta) ? 'is-invalid' : ''}`}
                onChange={(e) => input.onChange(e)}
                value={input.value}
            >
                <option value=''>...</option>
                {renderOptions(options)}
            </select>
        </SimpleField>
    )

}

export default SelectField;