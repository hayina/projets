import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, submit, change, SubmissionError, formValueSelector } from 'redux-form';

import Modal from './Modal';
import { hideModal } from '../../actions';
// import { modalTypes } from '../modals/ModalRoot';

import { required, number } from '../forms/validator'
import { TextField, AutoCompleteField } from '../forms/form-fields/fields'
import { arrayPushing, arrayUpdating } from '../../actions';
import { getExtPartners } from '../../reducers/externalForms';


export const formName = 'conventionForm';

const onSubmit = (formValues, dispatch, { editMode, index, partners }) => {

    if (!editMode) {
        if ( partners.some((el) => el.partner.value === formValues.partner.value) ) {
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

let Convention = ({ handleSubmit, dispatch, editMode }) => {

    console.log('----> Convention Rendering .........................')
    return (

        <Modal
            handleValidation={() => {
                dispatch(submit('conventionForm'));
                // dispatch(hideModal());
                // dispatch(submit('conventionForm')).then(
                //     () => dispatch(hideModal())
                // );
            }}
            title={ `${ editMode ? 'editer' : 'ajouter' } un partenaire` }
            // modalName='convention'
        >
            <div className="conv-container">
                <form onSubmit={handleSubmit}>

                    <Field name="partner" label="Partenaire" component={AutoCompleteField}

                        // url='/partners'
                        url='/get_partners'
                        onSelect={(suggestion) => {
                            dispatch(change(formName, 'partner', suggestion));
                        }}
                        onDelete={() => {
                            dispatch(change(formName, 'partner', null))
                        }}
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
        partners: getExtPartners(state),
    })
)(Convention)
