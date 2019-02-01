import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, arrayPush } from 'redux-form';

import TextField from '../forms/form-fields/TextField'

const onSubmit = (formValues, dispatch) => {

    console.log('--------------> dispatch(arrayPush) ...')
    dispatch(arrayPush('projetForm', 'partners', formValues));

}

class Convention extends React.Component {


    render() {

        const { handleSubmit } = this.props;

        return (
            <div className="conv-container">
                <form onSubmit={ handleSubmit }>
                    <Field name="name" component={TextField} label="Partner" cssClass="" />
                    <Field name="montant" component={TextField} label="Montant" cssClass="" />
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