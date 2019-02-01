import React from 'react';

import { gotError, renderErrorField } from '../formErrors';


const SimpleField = ({children, meta, label}) => {

    return (
        <div className="form-group">

            <label className="form-label">{label}</label>
            {children}
            {renderErrorField(meta)}
        </div>
    )


}

export default SimpleField;