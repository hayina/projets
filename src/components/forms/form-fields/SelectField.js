import React from 'react';


const renderOptions = (options) => {
    return options.map((op) => <option key={op} value={op}>{op}</option>);
}

const SelectField = ({input, meta, label, options}) => {


    return (
        <div className="form-group">
            <label>{label}</label>
            <select className="form-control" {...input}>
                <option>...</option>
                {renderOptions(options)}
            </select>
        </div>
    )

}

export default SelectField;