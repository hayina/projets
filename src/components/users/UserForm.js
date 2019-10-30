import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { ToggleField, CheckboxField, RadioList } from '../forms/form-fields/fields';
import { TextInput, SimpleFormLine, SfSelect } from '../forms/form-fields/fields2';
import { hideModal } from '../../actions';
import Modal from '../modals/Modal';
import { required, number, emptyArray } from '../forms/validator';
import { FormProvider, reset, FormContext, Field, setSubmitting } from '../yous-form/useForm';
import useAjaxFetch from '../hooks/useAjaxFetch'

import './userForm.css'
import './../../components/gform.css'
import { USER_TYPES } from '../../types';


const intialValues = {
    login: '',
    password: '',
    nom: '',
    prenom: '',
    active: false,
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
    const [userTypes, setUserTypes] = useState([])
    const [editLoading, setEditLoading] = useState(false)



    useEffect(() => {



        useAjaxFetch({
            url: 'roles',
            method: 'GET',
            success: (data) => setRoles(data),
            // error: () => setEditLoading(false)
        })

        useAjaxFetch({
            url: 'userTypes',
            method: 'GET',
            success: (data) => setUserTypes(data),
            // error: () => setEditLoading(false)
        })

        useAjaxFetch({
            url: 'divisions',
            method: 'GET',
            success: (data) => setDivisions(data),
            // error: () => setEditLoading(false)
        })

        if (editMode) {
            setEditLoading(true)
            useAjaxFetch({
                url: `users/edit/${userToEdit}`,
                method: 'GET',
                success: (data) => {
                    dispatchForm(reset(data))
                    setEditLoading(false)
                },
                error: () => setEditLoading(false)
            })
        }

    }, [])


    // console.log('State ->', state, onSubmit)

    const handleSubmit = () => {

        console.log('onSubmit State ->', state.values)

        dispatchForm(setSubmitting(true))
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
            error: () => {
                dispatchForm(setSubmitting(false))
            }


        })

    }


    // console.log('UserForm RENDERING  ----------------------------------------->', state)

    const { submitting } = state
    return (

        <Modal
            handleValidation={() => {
                onSubmit(handleSubmit, editMode)
                // dispatch(hideModal())
            }}
            title={`${editMode ? 'Editer' : 'Ajouter'} utilisateur`}
            // vClass={`btn btn-primary`}
            // vValue={`Submit`}
            submitting={submitting}
        >



            <div id="userForm" className={`form-content ${submitting || editLoading ? 'form-submitting is-submitting' : ''}`}>
                {/* <div id="userForm" className={`form-content ${ submitting ? 'form-submitting is-submitting':'' }`}> */}

                <div className="form-line-grp">
                    <Field name="login" >
                        {props => <TextInput label="Login" {...props} />}
                    </Field>
                    <Field name="password" >
                        {props => <TextInput label="Mot de passe" {...props} />}
                    </Field>
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

                <div className="form-line-grp">
                    <Field name="userType" >
                        {
                            ({ meta, ...props}) =>
                            <SimpleFormLine label="Choisir le type" meta={meta}>
                                <RadioList
                                    options={userTypes}
                                    {...props}
                                />
                            </SimpleFormLine>
                        }
                    </Field>
                </div>

                { state.values.userType === USER_TYPES.UTILISATEUR &&

                    <>


                        <div className="form-line-grp">
                            <Field name="roles" >
                                {
                                    ({ meta, ...props}) =>
                                    <CheckboxField 
                                        label="Choisir les rôles de l'utilisateur"
                                        options={roles}
                                        {...props}
                                    />
                                }
                            </Field>
                        </div>

                        <div className="form-line-grp">
                            <Field name="isChargeSuivi">
                                {props => <ToggleField label="Chargé de suivi" {...props} />}
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

                }
                {/* <Field name="roles" validate={[required]}>
                    { props =>   
                        <CheckboxField
                            label="Choisir les profiles de l'utilisateur"
                            options={roles} 
                            {...props} 
                        /> 
                    }
                </Field> */}

                <Field name="isDisable" >
                    {props => <ToggleField label="Déverrouillé" {...props} />}
                </Field>

                {/* <input type="button" value="RESET" onClick={ () => dispatchForm(reset(editMode ? initUser : intialValues)) } /> */}

            </div>


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