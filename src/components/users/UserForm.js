import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { ToggleField, CheckboxField, RadioList } from '../forms/form-fields/fields';
import { TextInput, SimpleFormLine, SfSelect } from '../forms/form-fields/fields2';
import { hideModal } from '../../actions';
import Modal from '../modals/Modal';
import { required, number, emptyArray } from '../forms/validator';
import { FormProvider, reset, FormContext, Field } from '../yous-form/useForm';
import useAjaxFetch from '../hooks/useAjaxFetch'

import './userForm.css'
import './../../components/gform.css'
import {  } from '../../types';
import { ApiError } from '../helpers';


const intialValues = {
    login: '',
    password: '',
    nom: '',
    prenom: '',
    enabled: false,
    roles: [],
}

const rules = {
    login: [required],
    password: [required],
    nom: [required],
    prenom: [required],
    // profile: [required],
    // active: [required],
}


let UserForm = ({ dispatch, editMode, userToEdit, userIndex, addUser, updateUser }) => {

    const { state, dispatchForm, onSubmit } = useContext(FormContext);

    const [roles, setRoles] = useState([])
    const [divisions, setDivisions] = useState([])


    const [errors, setErrors] = useState(false)
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        
        setLoading(true)
        setErrors(false)
        useAjaxFetch({
            url: `/users/loading`,
            params: editMode ? { user: userToEdit} : {},
            method: 'GET',
            success: (data) => {
                if (editMode) {
                    dispatchForm(reset(data.userInfos))
                }
                setRoles(data.roles)
                setDivisions(data.divisions)
                setLoading(false)
            },
            error: () => setErrors(true),
            // always: () => setLoading(false)
        })
        
    }, [])


    // console.log('State ->', state, onSubmit)

    const handleSubmit = () => {

        console.log('onSubmit State ->', state.values)

        setSubmitting(true)
        setErrors(false)
        useAjaxFetch({
            url: 'users',
            method: 'POST',
            body: JSON.stringify(state.values),
            success: (id) => {

                // setTimeout(() => {

                if (!editMode) {
                    addUser({ ...state.values, id })
                } else {
                    updateUser({ ...state.values }, userIndex)
                }
                dispatch(hideModal())

                // },3000)
            },
            error: () => setErrors(true),
            always: () => setSubmitting(false)
        })
    }


    // console.log('UserForm RENDERING  ----------------------------------------->', state)

    // const { submitting } = state
    return (

        <Modal
            handleValidation={() => onSubmit(handleSubmit, editMode)}
            title={`${editMode ? 'Editer' : 'Ajouter'} utilisateur`}
            submitting={submitting}
            loading={loading}
            apiCall={true}
        >

            <div id="userForm" className={`form-content ${submitting || loading ? 'form-submitting is-submitting' : ''}`}>
                {/* <div id="userForm" className={`form-content ${ submitting ? 'form-submitting is-submitting':'' }`}> */}

                <div className="form-line-grp">
                    <Field name="login" >
                        {props => <TextInput label="Login" {...props} />}
                    </Field>

                    {
                        !editMode &&
                        <Field name="password" >
                            {props => <TextInput label="Mot de passe" {...props} />}
                        </Field>
                    }
                    <Field name="nom" >
                        {props => <TextInput label="Nom" {...props} />}
                    </Field>
                    <Field name="prenom" >
                        {props => <TextInput label="Prénom" {...props} />}
                    </Field>
                    <Field name="phone" >
                        {props => <TextInput label="Telephone" {...props} />}
                    </Field>
                    <Field name="email" >
                        {props => <TextInput label="Email" {...props} />}
                    </Field>
                </div>


                {/* { state.values.userType === USER_TYPES.UTILISATEUR && */}

                    <>


                        <div className="form-line-grp">
                            <Field name="roles" >
                                {
                                    ({ meta, ...props }) =>
                                    <CheckboxField 
                                        label="Choisir les rôles de l'utilisateur"
                                        options={roles}
                                        {...props}
                                    />
                                }
                            </Field>
                        </div>


                        <div className="form-line-grp">
                            <Field name="division">
                                {props =>
                                    <SfSelect
                                        label="Choisir une division"
                                        options={divisions}
                                        {...props}
                                    />
                                }
                            </Field>
                        </div>
                    </>


                <Field name="enabled" >
                    {props => <ToggleField label="Active" {...props} />}
                </Field>

                {/* <input type="button" value="RESET" onClick={ () => dispatchForm(reset(editMode ? initUser : intialValues)) } /> */}

            </div>

            { errors && <ApiError /> }



        </Modal>


    )

}



export default connect(
    // (state) => ({

    // })
)((props) => (
    <FormProvider intialValues={intialValues} rules={rules}>
        <UserForm {...props} />
    </FormProvider>
))