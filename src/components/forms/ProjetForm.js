import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

import * as actions from '../../actions'

import { required, number } from './validator'
import TextField from './form-fields/TextField'
import SelectField from './form-fields/SelectField'
import RadioFields from './form-fields/RadioFields'


class ProjetForm extends Component {

    componentDidMount() {
        // initialize the form

        //this.props.initFormValues();
    }

    onSubmit(formValues) {
        console.log(formValues)
    }

    render() {

        // props from redux
        const { handleSubmit, initialValues } = this.props;
        // const { formValuesChange, form } = this.props;

        // console.log(`initialValues -> `, initialValues)

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>

                <Field
                    name="intitule"
                    component={TextField}
                    label="intitulé"
                    fieldType="textarea"
                    validate={[required]}
                />

                <Field
                    name="montant"
                    component={TextField}
                    label="montant"
                    fieldType="input"
                    validate={[required, number]}
                />


                <Field
                    name="isConvention"
                    component={RadioFields}
                    label="conventionné"
                    options={[{label: 'non', value: 'non'}, {label: 'oui', value: 'oui'}]}
                />



                <Field
                    name="secteur"
                    component={SelectField}
                    label="commune"
                    options={['santé', 'education', 'eau potable', 'électricité', 'routes & voiries', 'autres']}
                    validate={[required]}
                />

                <button type="submit" className="btn btn-primary">Submit</button>

            </form>
        )
    }
}


// connecting with the redux-form hoc
ProjetForm = reduxForm({
    form: 'projetForm'
})(ProjetForm)


//setting initial values

const initialValues = {

    intitule: 'YOUSSEF PROJET',
    montant: 300000,
    secteur: 'santé',
    isConvention: 'non'

}

// connecting with the redux hoc
export default connect(
    // MapStateToProps
    () => ({
        initialValues,
    }),
    //MapDispatchToProps
    // {
    //     initFormValues: actions.initFormValues
    // }
)
    (ProjetForm);
