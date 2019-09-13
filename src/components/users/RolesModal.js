import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change, submit, Form } from 'redux-form';

import Modal from '../modals/Modal';
import useAjaxFetch from '../hooks/useAjaxFetch';
import { RadioField, CheckboxField } from '../forms/form-fields/fields';
import { required, emptyArray } from '../forms/validator';

import './roles.css'

const formName = 'RolesModalForm'




let RolesModal = ({ profile, dispatch, handleSubmit }) => {

    const [profiles, setProfiles] = useState([])
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)



    useEffect(() => {
        useAjaxFetch({
            url: 'profiles',
            success: (data) => {
                setProfiles(data)
            },
            error: () => {}
        })
        useAjaxFetch({
            url: 'roles',
            success: (data) => {
                setRoles(data)
            },
            error: () => {}
        })
    }, [])

    const getRoles = (idProfile) => {

        setLoading(true)
        useAjaxFetch({
            url: `/roles/${idProfile}`,
            success: (data) => {
                dispatch(change(formName, 'roles', data.map(role => role.value)))
            },
            always: () => { setLoading(false) }
        })

    }

    const onSubmit = (formValues, dispatch, props) => {

        console.log('[onSubmit] RolesModalForm')
        console.log(formValues)
        
        const { profile, roles } = formValues
        setSubmitting(true)
        useAjaxFetch({
            url: `/roles/${profile}`,
            method: 'POST',
            body: roles,
            always: () => { setSubmitting(false) }
        })
    }

    return (


        <Modal 
            title={`Gérer les roles des profiles`}
            styles={{ width: '70%' }}
            handleValidation={ () => dispatch(submit(formName)) }
            submitting={submitting}
            // vBar={false}
        >

            <Form id="rolesForm" onSubmit={ handleSubmit(onSubmit) } className={`${ loading || submitting ? 'waiting' : '' }`}>


                <Field 
                    name="profile" component={RadioField} label="Choisir un profile" options={profiles} validate={[required]}
                    callback={ (profile) => { getRoles(profile) } }
                />
                {
                    profile &&
                    <Field name="roles" component={CheckboxField} options={roles} validate={[emptyArray]} />
                }

            </Form>


        </Modal>
    )


}


RolesModal = reduxForm({
    form: formName,
    // onSubmit
})(RolesModal)

const selector = formValueSelector(formName);

export default connect(
    (state) => ({
        profile: selector(state, 'profile')
    })
)(RolesModal)
