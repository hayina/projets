import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, submit, change, SubmissionError, arrayPush } from 'redux-form';

import Modal from './Modal';
import { hideModal } from '../../actions';


import { required, number } from '../forms/validator'
import { TextField, AutoCompleteField, SelectField } from '../forms/form-fields/fields'


import {formName as projetForm } from '../forms/ProjetForm'


export const formName = 'conventionForm';

const onSubmit = (formValues, dispatch, { editMode, index, partners }) => {

    console.log(partners)

    if ( !editMode ) {
        if ( partners.some((el) => el.partner.value === formValues.partner.value) ) {
            throw new SubmissionError({ partner: 'Vous avez déjà ajouter ce partenaire' })
        }
        dispatch(arrayPush(projetForm, 'partners', formValues));
        // dispatch(arrayPushing('partners', formValues));
    }
    else {
        dispatch(change(projetForm, `partners[${index}]`, formValues));
        // dispatch(arrayInsert(projetForm, 'partners', index, formValues));
        // dispatch(arrayUpdating('partners', formValues, index));
    }
    dispatch(hideModal())
}

let Convention = ({ handleSubmit, dispatch, editMode, partners }) => {


    console.log('partners -> ', partners)


    return (

        <Modal
            handleValidation={ () => dispatch(submit('conventionForm')) }
            title={ `${ editMode ? 'editer' : 'ajouter' } un partenaire` }
        >
            <div className="conv-container">
                <form onSubmit={handleSubmit}>

                    <Field name="partner" label="Partenaire" component={AutoCompleteField}

                        url='/acheteurs'
                        // url='/get_partners'
                        onSelect={(suggestion) => dispatch(change(formName, 'partner', suggestion)) }
                        onDelete={() => dispatch(change(formName, 'partner', null)) }
                        validate={[required]}
                    />

                    <Field name="montant" label="Montant" component={TextField} fieldType="input"
                        validate={[required, number]}
                    />

                </form >
            </div >
        </Modal>
    )


}


Convention = reduxForm({
    form: formName,
    onSubmit
})(Convention)

// const selector = formValueSelector(formName);

export default connect(
    (state) => ({
        // partners: getExtPartners(state),
    })
)(Convention)
