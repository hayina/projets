import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, submit, reduxForm, formValueSelector, change, arrayPush } from 'redux-form'
import Modal from '../modals/Modal';
import { TextField, DateField, RadioField } from '../forms/form-fields/fields';
import { required, percentage, number } from '../forms/validator';



import { marcheFormName } from './MarcheForm'
import { hideModal } from '../../actions';

export const osFormName = 'osForm'



let OsForm = ({ dispatch, handleSubmit, editMode, index, osTypes }) => {

    console.log('osTypes', osTypes)

    // useEffect(() => {
    //     fetchOsTypes()
    // }, [osTypes])

    const onSubmit = (formValues) => {

        if ( !editMode ) {
            dispatch(arrayPush(marcheFormName, 'os', formValues))
        } else {
            dispatch(change(marcheFormName, `os[${index}]`, formValues));
        }

        dispatch(hideModal())

    }

    return (
        <Modal
            vBar={false}
            handleValidation={ () => dispatch(submit(osFormName)) }
            // title={ `Ajouter une nouvelle société` }
        >

            <form onSubmit={ handleSubmit(onSubmit) } id={osFormName} >
                <div className={`form-content`}>
                    <Field
                        name="typeOs" component={RadioField} validate={[required]}
                        options={ osTypes }
                    />
                    <Field
                        name="dateOs" component={DateField} label="Date de l'Ordre de Service" validate={[required]}
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

OsForm = reduxForm({
    form: osFormName,
    enableReinitialize: true,
    // onSubmit
})(OsForm)

const selector = formValueSelector(osFormName);

export default connect(
    (state) => ({
    }),
)(OsForm);