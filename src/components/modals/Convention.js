import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, submit, change, SubmissionError, arrayPush, formValueSelector } from 'redux-form';

import Modal from './Modal';
import { hideModal } from '../../actions';


import { required, number } from '../forms/validator'
import { TextField, AutoCompleteField, RadioField } from '../forms/form-fields/fields'


import {formName as projetForm } from '../forms/ProjetForm'
import { CONTRIBUTION_PARTNERS } from '../../types';


export const formName = 'conventionForm';

const onSubmit = (formValues, dispatch, { editMode, index, partners }) => {

    console.log(partners)

    if ( !editMode ) {
        if ( partners.some((el) => el.partner.value === formValues.partner.value) ) {
            throw new SubmissionError({ partner: 'Vous avez déjà ajouter ce partenaire' })
        }
        dispatch(arrayPush(projetForm, 'partners', formValues));
    }
    else {
        dispatch(change(projetForm, `partners[${index}]`, formValues));
    }
    dispatch(hideModal())
}

let Convention = ({ handleSubmit, dispatch, editMode, contribution }) => {


    return (

        <Modal
            handleValidation={ () => dispatch(submit('conventionForm')) }
            title={ `${ editMode ? 'editer' : 'ajouter' } un partenaire` }
        >
            <div className="conv-container" id="convention-modal">
                <form onSubmit={handleSubmit}>

                    <Field name="partner" label="Partenaire" component={AutoCompleteField}
                        url='/acheteurs'
                        onSelect={(suggestion) => dispatch(change(formName, 'partner', suggestion))}
                        onDelete={() => dispatch(change(formName, 'partner', null))}
                        validate={[required]}
                    />

                    <Field name="contribution" component={RadioField} label="Contribution" 
                        options={[{ value:1, label: 'Financière' }, { value:2, label: 'Autres'}]}
                        validate={[required]}
                    />

                    {
                        contribution === CONTRIBUTION_PARTNERS.FINANCIERE &&
                        <Field name="montant" placeholder="Montant" component={TextField} fieldType="input"
                            validate={[required]}
                        />
                    }
                    {
                        contribution === CONTRIBUTION_PARTNERS.AUTRES &&
                        <Field name="commentaire" placeholder="..." component={TextField} fieldType="textarea" />
                    }



                </form >
            </div >
        </Modal>
    )


}


Convention = reduxForm({
    form: formName,
    onSubmit
})(Convention)

const selector = formValueSelector(formName);

export default connect(
    (state) => ({
        contribution: selector(state, 'contribution'),
    })
)(Convention)
