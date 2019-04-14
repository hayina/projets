import React, { useContext, useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';

import './userForm.css'
import { SimpleField2, TextInput, ToggleField, CheckboxField } from '../forms/form-fields/fields';
import { hideModal, arrayPushing, arrayUpdating } from '../../actions';
import Modal from '../modals/Modal';
import { required, number, emptyArray } from '../forms/validator';
import { FormProvider, setValues, setTouched, reset, FormContext, Field } from '../yous-form/useForm';
import useAjaxFetch from '../hooks/useAjaxFetch'


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
    // password: [required],
    // nom: [required],
    // prenom: [required],
    // roles: [emptyArray],
    // active: [required],
}




let UserForm = ({ dispatch, editMode, initUser, userIndex, addUser }) => {
    
    const { state, dispatchForm, onSubmit } = useContext(FormContext);

    useEffect(() => {
        if(editMode) {
            dispatchForm(reset(initUser))
        }
    }, [])

    // console.log('State ->', state, onSubmit)

    const handleSubmit = () => {

        console.log('onSubmit State ->', state.values)

        useAjaxFetch({
            url: 'users',
            method: 'POST',
            body: JSON.stringify(state.values),
            success: (idUser) => {
                addUser({...state.values, idUser})
                dispatch(hideModal())
            }
            
        })

        // return

        // if(editMode){
        //     dispatch(arrayUpdating('users', state.values, userIndex))
        // } else {

        //     state.values.dateCreation = new Date().getTime()
        //     dispatch(arrayPushing('users', state.values))
        // }

        
    }



    // console.log('FORM VALUES ->', state.values)

    // const { submitting, values, errors } = state

    console.log('UserForm RENDERING  ----------------------------------------->', state)

    return (
        
        <Modal
            handleValidation={() => {
                onSubmit(handleSubmit, editMode)
                // dispatch(hideModal())
            }}
            title={`${ editMode ? 'Editer':'Ajouter'} utilisateur`}
            vClass={`btn btn-primary`}
            vValue={`Submit`}
            // vClass={`btn btn-primary ${ submitting ? 'btn-submitting is-submitting ':'' }`}
            // vValue={`Submit ${ submitting ? '...':'' }`}
        >



            <div id="userForm" className={`form-content`}>
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

                <Field name="roles" validate={[required]}>
                    { props =>   
                        <CheckboxField
                            label="Choisir les profiles de l'utilisateur"
                            options={[
                                {value: 1, label: 'PROJET_CONSULTATION'},
                                {value: 2, label: 'ADD_PROJET'},
                                {value: 3, label: 'ADD_MACRHE'},
                                {value: 4, label: 'ADD_USER'},
                                {value: 5, label: 'ROOT'},
                            ]} 
                            {...props} 
                        /> 
                    }
                </Field>

                <Field name="active" validate={[required]}>
                    { props => <ToggleField label="Actif (l'utilisateur peut se connecter)" {...props} /> }
                </Field>
           

          

                {/* <ToggleField label="Actif (l'utilisateur peut se connecter)"
                    input={{ 
                        onChange: (checked) => {
                            onChange('active', checked);
                            onFocus('active');
                        },
                        value: values.active
                    }}
                />  */}


            
                {/* <div className="form-errors">
                    {Object.keys(errors).map((err, i) => 
                            (<div className="err-item" key={i}>{err}. {errors[err]}</div>)
                    )}
                </div> */}

                <input type="button" value="RESET" onClick={ () => dispatchForm(reset(editMode ? initUser : intialValues)) } />
            
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