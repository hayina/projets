import React, { useContext, useReducer, useState } from 'react';
import { connect } from 'react-redux';
// import { Field, reduxForm, submit, change, SubmissionError, formValueSelector } from 'redux-form';

import Modal from './Modal';
import { hideModal } from '../../actions';


// import { required, number } from '../forms/validator'
import { SimpleField } from '../forms/form-fields/fields'
import { arrayPushing, arrayUpdating } from '../../actions';
import { getExtPartners } from '../../reducers/externalForms';


export const formName = 'conventionForm';

const onSubmit = (formValues, dispatch, { editMode, index, partners }) => {

    if (!editMode) {
        if ( partners.some((el) => el.partner.id === formValues.partner.id) ) {
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

    const [values, setValues] = useState({})

    console.log('----> Convention Rendering .........................')
    return (

        <Modal
            handleValidation={() => {
                dispatch(submit('conventionForm'));
            }}
            title={ `${ editMode ? 'editer' : 'ajouter' } un partenaire` }
        >
            <div className="conv-container">
                <form onSubmit={handleSubmit}>

                    <SimpleField label="Partenaire">
                    { values.partner ?
                        <SelectedAC 
                            suggestion={values.partner} 
                            onDelete={() => setValues({ ...values, [partner]: null }) } />
                        :
                        <AutoComplete 
                            onSelect={ (suggestion) => setValues({ ...values, [partner]: suggestion }) } 
                            url='/get_partners' 
                        /> 
                    }
                    </SimpleField>


                    <SimpleField label="Montant" >
                        <input 
                            type="text"
                            autoComplete="off" 
                            onChange={ (e) => setValues({ ...values, [montant]: e.target.value }) }
                            value={values.montant}
                        />
                    </SimpleField>

                </form >
            </div >
        </Modal>
    )


}




// const selector = formValueSelector(formName);

export default connect(
    (state) => ({
        partners: getExtPartners(state),
    })
)(Convention)
