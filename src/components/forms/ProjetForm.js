import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form'

import { toggleModal } from '../../actions'

import { required, number, emptyArray } from './validator'
import TextField from './form-fields/TextField'
import SelectField from './form-fields/SelectField'
import RadioFields from './form-fields/RadioFields'
import CheckboxFields from './form-fields/CheckboxFields'

import './forms.css';


class ProjetForm extends Component {

    componentDidMount() { }

    onSubmit(formValues) {
        console.log(formValues)
    }

    render() {

        // props from redux
        const { handleSubmit, isConvention, toggleModal, partners } = this.props;
        // const { formValuesChange, form } = this.props;

        console.log(partners)

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>

                <h1>PROJET FORMULAIRE</h1>

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


                { isConvention && (
                    <input type="button" className="show-modal show-modal-conv" value="add partners" 
                        onClick={ () => toggleModal('convention', true) }
                    /> 
                )}
                
                {   partners &&
                    partners.map((partner, i) => (
                        <div className="partner-item" key={i}>
                            <div className="partner-label">partner {i+1} :</div>
                            <div className="partner-name">{partner.name}</div>
                            <div className="partner-montant">{partner.montant}</div>
                        </div>
                    ))
                }

                

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
    isConvention: true,
    communes: [2, 3],
    partners: [],

}

const selector = formValueSelector('projetForm');

// connecting with the redux hoc
export default connect(
    // MapStateToProps
    (state) => (
        {
            initialValues,
            isConvention: selector(state, 'isConvention'),
            partners: selector(state, 'partners'),
        }
    ),
    //MapDispatchToProps
    { toggleModal }
)(ProjetForm);

