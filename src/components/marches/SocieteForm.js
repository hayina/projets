import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, submit, reduxForm, formValueSelector, change } from 'redux-form'
import Modal from '../modals/Modal';
import { TextField } from '../forms/form-fields/fields';
import { required } from '../forms/validator';
import useAjaxFetch from '../hooks/useAjaxFetch';
import { ApiError } from '../helpers';


import { marcheFormName } from './MarcheForm'
import { hideModal } from '../../actions';

export const societeFormName = 'societeForm'



let SocieteForm = ({ dispatch, handleSubmit }) => {

    const [submitting, setSubmitting] = useState(false);
    // const [editLoading, setEditLoading] = useState(false)
    const [errors, setErrors] = useState(false);

    const onSubmit = (formValues) => {

        console.log(formValues)
    
        setSubmitting(true)
        setErrors(false)

        useAjaxFetch({
            url: '/societes',
            method: 'POST',
            body: JSON.stringify(formValues),
            success: (idSte) => {
                setSubmitting(false)
                dispatch(change(marcheFormName, 'societe', { value: idSte, label: formValues.name }))
                dispatch(hideModal())
            },
            error: (err) => {
                setErrors(true)
                setSubmitting(false)
            }
            
        })
    }

    return (
        <Modal
            vBar={false}
            handleValidation={ () => dispatch(submit(societeFormName)) }
            // title={ `Ajouter une nouvelle société` }
        >

            <form onSubmit={ handleSubmit(onSubmit) } id={societeFormName}
                className={`${ submitting ? 'form-submitting is-submitting':'' }`} 
            >
                <div className={`form-content`}>
                    <Field
                        name="name" component={TextField} label="Nom de la société" fieldType="input" validate={[required]}
                    />
                    <Field
                        name="location" component={TextField} label="Adresse" fieldType="textarea" 
                    />
                    <Field
                        name="responsable" component={TextField} label="Responsable" fieldType="input"
                    />
                    <Field
                        name="email" component={TextField} label="Email" fieldType="input"
                    />
                    <Field
                        name="phone" component={TextField} label="Téléphone" fieldType="input"
                    />
                </div>

                <div className={`form-validation`}>
                    <button type="submit" 
                        className={`btn btn-primary ${ submitting ? 'btn-submitting is-submitting ':'' }`}>
                        Submit { submitting ? '...':'' }
                    </button>
                </div>

                { errors && <ApiError cssClass="va-errors"/> }
            </form>
        </Modal>
    )
}

SocieteForm = reduxForm({
    form: societeFormName,
    enableReinitialize: true,
    // onSubmit
})(SocieteForm)

const selector = formValueSelector(societeFormName);

export default connect(
    (state) => ({
    }),
)(SocieteForm);