import React from 'react';
import { connect } from 'react-redux';
import { Field, Fields, submit, reduxForm, change, arrayPush, clearFields } from 'redux-form'
import Modal from '../modals/Modal';
import { TextField, DateField, RadioField } from '../forms/form-fields/fields';
import { required } from '../forms/validator';



import { marcheFormName } from './MarcheForm'
import { hideModal } from '../../actions';
import { UploadLine } from './lines';

export const osFormName = 'osForm'



let OsForm = ({ osTypes, dispatch, handleSubmit, initialValues, fieldName, editMode, index, idMarche }) => {

    // console.log('Init -> Ordres de service', initialValues)

    // if( editMode ) {
        // 
    // }

    const onSubmit = (formValues) => {

        // console.log('onSubmit -> Ordres de service', formValues.typeOs)
        

        // on cherche le label du typeOs pour l'afficher apres le submit()
        formValues.typeOs = osTypes.find(osType => osType.value === formValues.typeOs)

        // console.log('onSubmit -> Ordres de service', formValues.typeOs)

        if ( !editMode ) {
            dispatch(arrayPush(marcheFormName, fieldName, formValues))
        } else {
            dispatch(change(marcheFormName, `${fieldName}[${index}]`, formValues));
        }

        // clearFields(form:String, keepTouched: boolean, persistentSubmitErrors: boolean, ...fields:String)
        dispatch(clearFields(marcheFormName, true, false, fieldName))

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
                        name="typeOs" component={RadioField} options={ osTypes } validate={[ required ]}  
                    />
                    <Field
                        name="dateOs" component={DateField} label="Date de l'Ordre de Service" validate={[required]}
                    />
                    {/* <Field
                        name="commentaire" component={TextField} label="Commentaire" fieldType="textarea" 
                    /> */}
                    <Fields
                        names={["attachments", "resources"]} component={UploadLine} idMarche={idMarche} formName={osFormName}
                    />
                </div>

                <div className={`form-validation`}>
                    <button type="submit" className={`btn btn-primary`}>Submit</button>
                </div>

            </form>
        </Modal>
    )
}

OsForm = reduxForm({ form: osFormName })(OsForm)

export default connect()(OsForm);