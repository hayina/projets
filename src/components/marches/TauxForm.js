import React from 'react';
import { connect } from 'react-redux';
import { Field, submit, reduxForm, change, arrayPush } from 'redux-form'
import Modal from '../modals/Modal';
import { TextField, DateField } from '../forms/form-fields/fields';
import { required, percentage, number } from '../forms/validator';



import { marcheFormName } from './MarcheForm'
import { hideModal } from '../../actions';

export const tauxFormName = 'tauxForm'



let TauxForm = ({ dispatch, handleSubmit, editMode, index }) => {

    console.log('TauxForm', editMode, index)


    const onSubmit = (formValues) => {

        console.log(formValues, editMode, index)
        if ( !editMode ) {
            dispatch(arrayPush(marcheFormName, 'taux', formValues))
        } else {
            dispatch(change(marcheFormName, `taux[${index}]`, formValues));
        }

        dispatch(hideModal())

    }

    return (
        <Modal
            vBar={false}
            handleValidation={ () => dispatch(submit(tauxFormName)) }
            // title={ `Ajouter une nouvelle société` }
        >

            <form onSubmit={ handleSubmit(onSubmit) } id={tauxFormName} >
                <div className={`form-content`}>
                    <Field
                        name="valueTaux" component={TextField} label="Taux d'avancement" 
                        fieldType="input" validate={[required, number, percentage]}
                    />
                    <Field
                        name="dateTaux" component={DateField} label="Date Taux" fieldType="input" validate={[required]}
                    />
                    <Field
                        name="commentaire" component={TextField} label="Commentaire" fieldType="textarea" 
                    />
                </div>

                <div className={`form-validation`}>
                    <button type="submit" className={`btn btn-primary`}>Submit</button>
                </div>

            </form>
        </Modal>
    )
}

TauxForm = reduxForm({
    form: tauxFormName,
    enableReinitialize: true,
    // onSubmit
})(TauxForm)


export default connect()(TauxForm);