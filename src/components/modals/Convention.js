import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, arrayPush } from 'redux-form';

import TextField from '../forms/form-fields/TextField'

const onSubmit = (formValues, dispatch) => {
    console.log('onSubmit Convention ...');
    console.log(formValues);

    const partners = [];
    partners.push(formValues);

    dispatch(arrayPush('projetForm', 'partners', partners));

    

    // Object.entries(formValues).forEach(([field, value]) => {
    //     console.log(field);          // the name of the current key.
    //     console.log(value);          // the value of the current key.
        

    // });

    // dispatch(arrayPush());

}

class Convention extends React.Component {


    render() {

        const { handleSubmit } = this.props;

        return (
            <div className="conv-container">
                <form onSubmit={ handleSubmit }>
                    <Field name="partner" component={TextField} label="Partner" cssClass="" />
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