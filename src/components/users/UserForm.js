import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { TextInput, ToggleField, CheckboxField, RadioList } from '../forms/form-fields/fields';
import { hideModal} from '../../actions';
import Modal from '../modals/Modal';
import { required, number, emptyArray } from '../forms/validator';
import { FormProvider, reset, FormContext, Field, setSubmitting } from '../yous-form/useForm';
import useAjaxFetch from '../hooks/useAjaxFetch'

import './userForm.css'


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
    profile: [required],
    // active: [required],
}




let UserForm = ({ dispatch, editMode, userToEdit, userIndex, addUser, updateUser }) => {
    
    const { state, dispatchForm, onSubmit } = useContext(FormContext);
    const [profiles, setProfiles] = useState([])
    const [divisions, setDivisions] = useState([])
    const [editLoading, setEditLoading] = useState(false)



    useEffect(() => {

        

        useAjaxFetch({
            url: 'profiles',
            method: 'GET',
            success: (data) => setProfiles(data),
            // error: () => setEditLoading(false)
        })

        useAjaxFetch({
            url: 'divisions',
            method: 'GET',
            success: (data) => setDivisions(data),
            // error: () => setEditLoading(false)
        })

        if(editMode) {
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

        // console.log('onSubmit State ->', state.values)

        dispatchForm(setSubmitting(true))
        useAjaxFetch({
            url: 'users',
            method: 'POST',
            body: JSON.stringify(state.values),
            success: (id) => {

                // setTimeout(() => {

                    if( !editMode) {
                        addUser({...state.values, id})
                    } else {
                        updateUser({...state.values}, userIndex)
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
            title={`${ editMode ? 'Editer':'Ajouter'} utilisateur`}
            // vClass={`btn btn-primary`}
            // vValue={`Submit`}
            submitting={submitting}
        >



            <div id="userForm" className={`form-content ${ submitting || editLoading ? 'form-submitting is-submitting':'' }`}>
            {/* <div id="userForm" className={`form-content ${ submitting ? 'form-submitting is-submitting':'' }`}> */}
            
                <Field name="login" validate={[required, number]}>
                    { props => <TextInput placeholder= "Login" {...props} /> }
                </Field>
                <Field name="password" validate={[required]}>
                    { props => <TextInput placeholder= "Mot de passe" {...props} /> }
                </Field>
                <Field name="nom" validate={[required]}>
                    { props => <TextInput placeholder= "Nom de famille" {...props} /> }
                </Field>
                <Field name="prenom" validate={[required]}>
                    { props => <TextInput placeholder= "Prénom" {...props} /> }
                </Field>

                <Field name="profile" validate={[required]}>
                    { props =>   
                        <RadioList
                            label="Choisir les profiles de l'utilisateur"
                            options={profiles} 
                            {...props} 
                        /> 
                    }
                </Field>

                <Field name="division">
                    { props =>   
                        <RadioList
                            label="Choisir une division"
                            options={divisions} 
                            {...props} 
                        /> 
                    }
                </Field>
                {/* <Field name="roles" validate={[required]}>
                    { props =>   
                        <CheckboxField
                            label="Choisir les profiles de l'utilisateur"
                            options={roles} 
                            {...props} 
                        /> 
                    }
                </Field> */}

                <Field name="active" validate={[required]}>
                    { props => <ToggleField label="Actif (l'utilisateur peut se connecter)" {...props} /> }
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