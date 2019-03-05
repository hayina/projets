import React from 'react';
import { Field, reduxForm, arrayPush } from 'redux-form';

import {TextField} from '../forms/form-fields/fields'

const onSubmit = (formValues, dispatch) => {

    console.log('--------------> dispatch(arrayPush) ...')
    dispatch(arrayPush('projetForm', 'partners', formValues));

}

class Convention extends React.Component {


    render() {

        const { handleSubmit } = this.props;

        const props = { component: TextField, fieldType: 'input', cssClass: '' }

        return (
            <div className="conv-container">
                <form onSubmit={ handleSubmit }>
                    <Field name="name" component={TextField} fieldType="input" label="Partner" cssClass="" />
                    <Field name="montant" component={TextField} fieldType="input" label="Montant" cssClass="" />
                    <Field name="signed" label="signature" {...props} />
                </form >
            </div >
        )
    }

}

Convention = reduxForm({
    form: 'conventionForm', 
    onSubmit
})(Convention)


export default Convention;