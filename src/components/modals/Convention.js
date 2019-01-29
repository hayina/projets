import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import TextField from '../forms/form-fields/TextField'

class Convention extends React.Component {


    onSubmit(formValues) {
        console.log(formValues);
    }

    render() {

        const { handleSubmit } = this.props;

        return (
            <div className="conv-container">
                <form onSubmit={ handleSubmit(this.onSubmit) }>
                    <Field name="partner" component={TextField} label="Partner" cssClass="" />
                    <Field name="montant" component={TextField} label="Montant" cssClass="" />
                </form >
            </div >
        )
    }

}

Convention = reduxForm({
    form: 'conventionForm'
})(Convention)


export default Convention;