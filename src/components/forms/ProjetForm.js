import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form'

import { showModal } from '../../actions'
import { modalTypes } from '../modals/ModalRoot'
import { required, number, emptyArray } from './validator'
import { TextField, CheckboxField, RadioField, SelectField } from './form-fields/fields'
import { getExtPartners } from '../../reducers/externalForms';
import { arrayDeleting } from '../../actions';

import './forms.css';


let ProjetForm = ({ handleSubmit, isConvention, partners, dispatch }) => {



    const onSubmit = (formValues) => {
        console.log(formValues)
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)}>

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
                component={RadioField}
                label="conventionné"
                options={[{ label: 'oui', value: true }, { label: 'non', value: false }]}
            />


            {isConvention && (
                <input type="button" className="btn btn-info show-modal show-modal-conv" value="ajouter un partenaire"
                    onClick={() => dispatch(showModal(modalTypes.ADD_CONVENTION))}
                />
            )}

            {partners && (
                <div className="form-group">
                    {partners.map(({partner, montant}, i) => (
                        <div className="partner-item" key={partner.id}>
                            {/* <div className="form-label partner-label">partenaire {i + 1} :</div> */}
                            <div className="partner-info">
                            
                                <i className="fa delete-item-list" 
                                    onClick={ () => dispatch(arrayDeleting('partners', i)) }></i>

                                <i className="fa delete-item-list" 
                                    onClick={ () => {
                                        dispatch(showModal(modalTypes.ADD_CONVENTION, partners[i]))
                                }}></i>

                                <div className="partner-name">{i + 1}. {partner.label}</div>
                                <div className="partner-montant">{montant} DH</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Field
                name="secteur"
                component={SelectField}
                label="secteur"
                options={[{ label: 'santé', value: 1 }, { label: 'education', value: 2 }, { label: 'eau potable', value: 3 }]}
                validate={[required]}
            />

            <Field
                name="communes"
                component={CheckboxField}
                label="communes"
                options={[{ label: 'taourirt', value: 1 }, { label: 'el aioun', value: 2 },
                { label: 'debdou', value: 3 }]}
                validate={[emptyArray]}
            />

            <button type="submit" className="btn btn-primary">Submit</button>

        </form>
    )

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
            partners: getExtPartners(state),
        }
    ),
)(ProjetForm);


