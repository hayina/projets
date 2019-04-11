import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';

import './userForm.css'
import { SimpleField, TextInput, ToggleField } from '../forms/form-fields/fields';
import { hideModal, arrayPushing, arrayUpdating } from '../../actions';
import Modal from '../modals/Modal';
import { required } from '../forms/validator';


const intialFormValues = {
    login: '',
    password: '',
    nom: '',
    prenom: '',
    active: false,
}



const rules = {
    login: [required],
    password: [required],
    nom: [required],
    prenom: [required],
    // active: [required],
}

const initialState = {
    values: intialFormValues,
    errors: {},
    valid: {},
    dirty: {},
}
export const reducer = (state, action) => {

    console.log(`auto-complete/${action.type}`);



    switch (action.type) {

        case 'SET_ERRORS':
            return { ...state, errors : { ...state.errors, [action.field]: action.error } };
        case 'SET_VALUES':
            return { ...state, values : { ...state.values, [action.field]: action.value } };

        default:
            throw new Error();
    }

}


let UserForm = ({ dispatch, editMode, initUser=intialFormValues, userIndex }) => {
    
    
    const [state, dispatchForm] = useReducer(reducer, initialState)
    const setValues = (field, value) => dispatchForm({ type: 'SET_VALUES', field, value }) 
    const setErrors = (field, error) => dispatchForm({ type: 'SET_ERRORS', field, error }) 

    // const [state.values, setValues] = useState(initUser)
    // const [errors, setErrors] = useState(intialFormErrors)

    const [submitting, setSubmitting] = useState(false);

    console.log('State ->', state)


    const onSubmit = () => {


        Object.entries(rules).forEach(([field, validators]) => {
            validators.forEach(rule => setErrors(field, rule(state.values[field])))
        })



        return

        if(editMode){
            dispatch(arrayUpdating('users', state.values, userIndex))
        } else {

            state.values.dateCreation = new Date()//.getTime()
            dispatch(arrayPushing('users', state.values))
        }
    }


    // console.log('FORM VALUES ->', state.values)

    return (

        <Modal
            handleValidation={() => {
                onSubmit()
                // dispatch(hideModal())
            }}
            title={`Ajouter un utilisateur`}
            vClass={`btn btn-primary ${ submitting ? 'btn-submitting is-submitting ':'' }`}
            vValue={`Submit ${ submitting ? '...':'' }`}
        >



            <div className={`form-content ${ submitting ? 'form-submitting is-submitting':'' }`}>
            
                <SimpleField label="Login" >
                    <TextInput 
                        onChange={ (e) => setValues('login', e.target.value) }
                        value={state.values.login}
                    />
                </SimpleField>
            
                <SimpleField label="Password" >
                    <TextInput 
                        onChange={ (e) => setValues('password', e.target.value) }
                        value={state.values.password}
                    />
                </SimpleField>
            
                <SimpleField label="Nom" >
                    <TextInput 
                        onChange={ (e) => setValues('nom', e.target.value) }
                        value={state.values.nom}
                    />
                </SimpleField>
            
                <SimpleField label="Prénom" >
                    <TextInput 
                        onChange={ (e) => setValues('prenom', e.target.value) }
                        value={state.values.prenom}
                    />
                </SimpleField>

                <ToggleField label="Actif" 
                    input={{ 
                        onChange: (checked) => setValues('active', checked),
                        value: state.values.active
                    }}
                />
                {/* <div className="form-errors">
                    {Object.keys(state.errors).map((err, i) => 
                            (<div className="err-item" key={i}>{err}. {state.errors[err]}</div>)
                    )}
                </div> */}
            
            </div>

            {/* <div className="form-validation">
                <button type="submit" 
                    className={`btn btn-primary ${ submitting ? 'btn-submitting is-submitting ':'' }`}>
                    Submit { submitting ? '...':'' }
                </button>
            </div> */}
            


        </Modal>

    )

}

export default connect(
    (state) => ({

    })
)(UserForm)