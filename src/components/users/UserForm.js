import React, { useEffect, useState } from 'react';
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

const intialFormErrors = {
    login: '',
    password: '',
    nom: '',
    prenom: '',
    active: '',
}

const rules = {
    login: [required],
    password: [required],
    nom: [required],
    prenom: [required],
}

let UserForm = ({ dispatch, editMode, initUser=intialFormValues, userIndex }) => {


    const [values, setValues] = useState(initUser)
    const [errors, setErrors] = useState(intialFormErrors)

    const [submitting, setSubmitting] = useState(false);

    const onSubmit = () => {

        // e.preventDefault();

        // const rules = {
        //      login: [required, number],
        //      password: [required],

        Object.entries(rules).forEach(([field, validators]) => {
            // console.log(field, validators)
            validators.forEach(rule => setErrors({ ...errors, [field]: rule(values[field]) }))
        })

        console.log('onSubmit ->', values)
        console.log('Errors ->', errors)

        return

        if(editMode){
            dispatch(arrayUpdating('users', values, userIndex))
        } else {

            values.dateCreation = new Date()//.getTime()
            dispatch(arrayPushing('users', values))
        }
    }


    // console.log('FORM VALUES ->', values)

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
                        onChange={ (e) => setValues({ ...values, login: e.target.value }) }
                        value={values.login}
                    />
                </SimpleField>
            
                <SimpleField label="Password" >
                    <TextInput 
                        onChange={ (e) => setValues({ ...values, password: e.target.value }) }
                        value={values.password}
                    />
                </SimpleField>
            
                <SimpleField label="Nom" >
                    <TextInput 
                        onChange={ (e) => setValues({ ...values, nom: e.target.value }) }
                        value={values.nom}
                    />
                </SimpleField>
            
                <SimpleField label="Prénom" >
                    <TextInput 
                        onChange={ (e) => setValues({ ...values, prenom: e.target.value }) }
                        value={values.prenom}
                    />
                </SimpleField>

                <ToggleField label="Actif" 
                    input={{ 
                        onChange: (checked) => setValues({ ...values, active: checked }),
                        value: values.active
                    }}
                />
                <div className="form-errors">
                    {Object.keys(errors).map((err, i) => 
                            (<div className="err-item" key={i}>{err}. {errors[err]}</div>)
                    )}
                </div>
            
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