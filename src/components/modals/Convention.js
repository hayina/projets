import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, submit, change, SubmissionError } from 'redux-form';

import Modal from './Modal';
import { hideModal } from '../../actions';


import { required, number } from '../forms/validator'
import { TextField, AutoCompleteField, SelectField } from '../forms/form-fields/fields'
import { arrayPushing, arrayUpdating } from '../../actions';
import { getExtPartners } from '../../reducers/externalForms';
import { asyncFunc } from '../../helpers'
import useAjaxFetch from '../hooks/useAjaxFetch';


export const formName = 'conventionForm';

const onSubmit = (formValues, dispatch, { editMode, index, partners }) => {

    console.log(formValues)
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

    const [financements, setFinancements] = useState([]);

    const fetchFinancements = (acheteur) => {

        useAjaxFetch({
            url: `/financements/${acheteur}`,
            success: (data) => { setFinancements(data) },
        })
    }
    
    return (

        <Modal
            handleValidation={() => {

                asyncFunc(() => dispatch(submit('conventionForm'))).then(() => dispatch(hideModal()))

            }}
            title={ `${ editMode ? 'editer' : 'ajouter' } un partenaire` }
            // modalName='convention'
        >
            <div className="conv-container">
                <form onSubmit={handleSubmit}>

                    <Field name="partner" label="Partenaire" component={AutoCompleteField}

                        url='/acheteurs'
                        // url='/get_partners'
                        onSelect={(suggestion) => {
                            dispatch(change(formName, 'partner', suggestion));
                            fetchFinancements(suggestion.value)
                        }}
                        onDelete={() => {
                            dispatch(change(formName, 'partner', null))
                            setFinancements([])
                        }}
                        validate={[required]}
                    />

                    { financements && financements.length > 0 &&
                        <Field
                            name="srcFinancement"
                            component={SelectField}
                            label="Source de Financement"
                            options={financements}
                            // validate={[required]}
                        />
                    }

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
