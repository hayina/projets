import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';

import './userForm.css'
import { SimpleField2, TextInput, ToggleField, CheckboxField } from '../forms/form-fields/fields';
import { hideModal, arrayPushing, arrayUpdating } from '../../actions';
import Modal from '../modals/Modal';
import { required, number } from '../forms/validator';


const intialFormValues = {
    login: '',
    password: '',
    nom: '',
    prenom: '',
    active: false,
    roles: [],
}



const rules = {
    login: [required, number],
    password: [required],
    nom: [required],
    prenom: [required],
    // active: [required],
}

const initialState = {
    values: intialFormValues,
    errors: {},
    // valid: {},
    // dirty: {},
    touched: {},
    submitting: false
}
export const reducer = (state, action) => {

    console.log(`@@auto-complete/${action.type}`);



    switch (action.type) {

        case 'RESET':
            return initialState;
        case 'SET_SUBMITTING':
            return { ...state, submitting : action.submitting };
        case 'SET_TOUCHED':
            return { ...state, touched : { ...state.touched, [action.field]: action.touched } };
        // case 'SET_DIRTY':
        //     return { ...state, dirty : { ...state.dirty, [action.field]: action.dirty } };
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
    const setTouched = (field, touched) => dispatchForm({ type: 'SET_TOUCHED', field, touched }) 
    const setDirty = (field, dirty) => dispatchForm({ type: 'SET_DIRTY', field, dirty }) 
    const setSubmitting = (submitting) => dispatchForm({ type: 'SET_SUBMITTING', submitting }) 
    const reset = () => dispatchForm({ type: 'RESET'}) 


    console.log('State ->', state)


    const validateFields = ({checkAll=true}) => {
        // console.log('validateFields ---------->')
        Object.entries(rules).forEach(([field, validators]) => {
            if( ( checkAll || state.touched[field] ) ) {
                validate(field, validators, state.values[field])
                // )
            }
        })
    }
    const validate = (field, validators, value) => {
        // console.log(`validate ---------->(${state.values[field]})`)

        for (let rule of validators) {
            let error = rule(value)
            // console.log(field, error)
            setErrors(field, error)
            if( error !== undefined ) break
        }

    }



    const onSubmit = () => {


        validateFields({})




        return

        if(editMode){
            dispatch(arrayUpdating('users', state.values, userIndex))
        } else {

            values.dateCreation = new Date()//.getTime()
            dispatch(arrayPushing('users', state.values))
        }
    }

    const onFocus = (field) => {
        // console.log('onFocus -> ', state)
        setTouched(field, true)
        validateFields({checkAll: false})
    }

    const onChange = (field, value) => {
        // console.log('onChange -> ', state)

        setValues(field, value)
        rules[field] && validate(field, rules[field], value)
        // rules[field] && rules[field].forEach(rule => setErrors(field, rule(value)))
        // setErrors(field, undefined)
        // setDirty(field, true)
    }

    // console.log('FORM VALUES ->', state.values)

    const { submitting, values, errors } = state

    console.log('RENDERING  ----------------------------------------->', state)

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



            <div id="userForm" className={`form-content ${ submitting ? 'form-submitting is-submitting':'' }`}>
            
                <SimpleField2 label="Login" error={errors.login}>
                    <TextInput 
                        onChange={ (e) => onChange('login', e.target.value) }
                        // onChange={ (e) => dispatch({ type: 'SET_VALUES', field: 'login', value: e.target.value })  }
                        onFocus={ (e) => onFocus('login') }
                        value={values.login}
                    />
                </SimpleField2>
            
                <SimpleField2 label="Password" error={errors.password}>
                    <TextInput 
                        onChange={ (e) => onChange('password', e.target.value) }
                        onFocus={ (e) => onFocus('password') }
                        value={values.password}
                    />
                </SimpleField2>
            
                <SimpleField2 label="Nom" error={errors.nom}>
                    <TextInput 
                        onChange={ (e) => onChange('nom', e.target.value) }
                        onFocus={ (e) => onFocus('nom') }
                        value={values.nom}
                    />
                </SimpleField2>
            
                <SimpleField2 label="Prénom" error={errors.prenom}>
                    <TextInput 
                        onChange={ (e) => onChange('prenom', e.target.value) }
                        onFocus={ (e) => onFocus('prenom') }
                        value={values.prenom}
                    />
                </SimpleField2>

                <SimpleField2 label="Roles">
                    <CheckboxField
                        options={[
                            {value: 1, label: 'ADD_PROJET'},
                            {value: 2, label: 'ADD_MACRHE'},
                            {value: 3, label: 'ADD_USER'},
                            {value: 4, label: 'ROOT'},
                        ]} 
                        input={{ 
                            onChange: (checked) => {
                                onChange('roles', checked);
                                onFocus('roles');
                            },
                            value: values.roles
                        }}
                    />
                </SimpleField2>

                <ToggleField label="Actif (l'utilisateur peut se connecter)"
                    input={{ 
                        onChange: (checked) => {
                            onChange('active', checked);
                            onFocus('active');
                        },
                        value: values.active
                    }}
                />


            
                {/* <div className="form-errors">
                    {Object.keys(errors).map((err, i) => 
                            (<div className="err-item" key={i}>{err}. {errors[err]}</div>)
                    )}
                </div> */}

                <input type="button" value="RESET" onClick={ () => reset() } />
            
            </div>         


        </Modal>

    )

}

export default connect(
    (state) => ({

    })
)(UserForm)