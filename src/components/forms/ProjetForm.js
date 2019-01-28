import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form'

import * as actions from '../../actions'

import { required, number, emptyArray } from './validator'
import TextField from './form-fields/TextField'
import SelectField from './form-fields/SelectField'
import RadioFields from './form-fields/RadioFields'
import CheckboxFields from './form-fields/CheckboxFields'

import './forms.css';


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
        const { handleSubmit, isConvention } = this.props;
        // const { formValuesChange, form } = this.props;

        console.log(this.props)

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
                    options={[{ label: 'non', value: false }, { label: 'oui', value: true }]}
                />

                
                {isConvention ? (<h1>convention !!!</h1>) : undefined}


                <Field
                    name="secteur"
                    component={SelectField}
                    label="secteur"
                    options={[{ label: 'santé', value: 1 }, { label: 'education', value: 2 }, { label: 'eau potable', value: 3 }]}
                    validate={[required]}
                />

                <Field
                    name="communes"
                    component={CheckboxFields}
                    label="communes"
                    options={[{ label: 'taourirt', value: 1 }, { label: 'el aioun', value: 2 },
                    { label: 'debdou', value: 3 }]}
                    validate={[emptyArray]}
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
    secteur: 1,
    isConvention: false,
    communes: [2, 3]

}

const selector = formValueSelector('projetForm');

// connecting with the redux hoc
export default connect(
    // MapStateToProps
    (state) => {
        const isConvention = selector(state, 'isConvention')
        return {
            initialValues,
            isConvention
        }
    },
    //MapDispatchToProps
    // {
    //     initFormValues: actions.initFormValues
    // }
)(ProjetForm);

