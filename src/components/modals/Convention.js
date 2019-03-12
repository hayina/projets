import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, arrayPush, submit, change, untouch } from 'redux-form';

import { required, number, acElement } from '../forms/validator'
import Modal from './Modal';
import { TextField } from '../forms/form-fields/fields'
import { onSelectAC, onInitAC } from '../../actions/autocomplete';
import { arrayPushing } from '../../actions';
import { getPartnerAC } from '../../reducers/autoCompletes';


const formName = 'conventionForm';

const onSubmit = (formValues, dispatch) => {
    console.log('projetForm', formValues)
    // dispatch(arrayPush('projetForm', 'partners', formValues));
    dispatch(arrayPushing('partners', formValues));

}

let Convention = ({ handleSubmit, dispatch, partnerAC }) => {


    return (

        <Modal
            handleValidation={() => dispatch(submit('conventionForm'))}
            title="ajouter un partenaire"
            modalName='convention'
        >
            <div className="conv-container">
                <form onSubmit={handleSubmit}>


                    <Field name="partner" label="Partenaire" component={TextField} fieldType="autoComplete"
                        reduxForm={{ form: formName, field: "partner" }}
                        autoComplete={{
                            onSelect: (suggestion) => {
                                dispatch(onSelectAC(suggestion, 'partner'));
                            },
                            deleteHandler: () => {
                                dispatch(onInitAC('partner'))
                                dispatch(change(formName, 'partner', null))
                            },
                            el: partnerAC
                        }}
                        // validate={[() => acElement(partnerAC)]}
                        validate={[required]}
                    />

                    <Field name="montant" label="Montant" component={TextField} fieldType="input"
                        validate={[required, number]} />

                </form >
            </div >
        </Modal>
    )


}


Convention = reduxForm({

    form: formName,
    onSubmit

})(Convention)

export default connect(

    (state) => ({
        partnerAC: getPartnerAC(state)
    })

)(Convention)
