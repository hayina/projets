import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, submit, change, SubmissionError, formValueSelector } from 'redux-form';

import { required, number } from '../forms/validator'
import Modal from './Modal';
import { TextField, AutoCompleteField } from '../forms/form-fields/fields'
import { arrayPushing, arrayUpdating } from '../../actions';
import { getExtPartners } from '../../reducers/externalForms';


export const formName = 'conventionForm';

const onSubmit = (formValues, dispatch, { editMode, index, partnerValue, partners }) => {
    // console.log('projetForm', formValues)

    if (!editMode) {
        if (partners.some((el) => el.partner.id === partnerValue.id)) {
    
            throw new SubmissionError({
                partner: 'Vous avez déjà ajouter ce partenaire',
                // _error: 'Login failed!'
            })
    
        }
        dispatch(arrayPushing('partners', formValues));
    }
    else {
        dispatch(arrayUpdating('partners', formValues, index));
    }



}

let Convention = ({ handleSubmit, dispatch, partnerValue, partners, editMode, index }) => {

    console.log('editMode', editMode)
    console.log('index', index)
    return (

        <Modal
            handleValidation={() => dispatch(submit('conventionForm'))}
            title="ajouter un partenaire"
            modalName='convention'
        >
            <div className="conv-container">
                <form onSubmit={handleSubmit}>


                    <Field name="partner" label="Partenaire" component={AutoCompleteField}
                        onSelect={(suggestion) => {
                            dispatch(change(formName, 'partner', suggestion));
                        }}
                        onDelete={() => {
                            dispatch(change(formName, 'partner', null))
                        }}
                        suggestion={partnerValue}
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

const selector = formValueSelector(formName);

export default connect(
    (state) => ({
        partnerValue: selector(state, 'partner'),
        partners: getExtPartners(state),
    })
)(Convention)
