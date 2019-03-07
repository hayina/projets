import React from 'react';
import { Field, reduxForm, arrayPush } from 'redux-form';

import {TextField} from '../forms/form-fields/fields'

const onSubmit = (formValues, dispatch) => {
    dispatch(arrayPush('projetForm', 'partners', formValues));
}

const formName = 'conventionForm';

class Convention extends React.Component {

    render() {

        const { handleSubmit } = this.props;
        const props = { component: TextField, fieldType: 'input', cssClass: '' }

        return (
            <div className="conv-container">
                <form onSubmit={ handleSubmit }>
                    <Field name="name" label="Partner" {...props} 
                        reduxForm={{ form: formName, field: "name" }}
                        autoComplete     
                    />
                    <Field name="montant" label="Montant" {...props} />
                    <Field name="signature" label="signature" 
                    autoComplete {...props} reduxForm={{ form: formName, field: "signature" }}/>
                </form >
            </div >
        )
    }

}

Convention = reduxForm({
    form: formName, 
    onSubmit
})(Convention)

export default Convention;