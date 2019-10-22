import React from 'react';
import { connect } from 'react-redux';
import { Field, Fields, submit, reduxForm, change, arrayPush, arrayRemove } from 'redux-form'
import Modal from '../modals/Modal';
import { TextField, DateField, RadioField } from '../forms/form-fields/fields';
import { required } from '../forms/validator';



import { marcheFormName } from './MarcheForm'
import { hideModal } from '../../actions';
import { UploadLine } from './lines';

export const osFormName = 'osForm'



let OsForm = ({ dispatch, handleSubmit, editMode, index, osTypes, initialValues, idMarche }) => {

    console.log('osTypes', initialValues)

    const onSubmit = (formValues) => {

        console.log(formValues)

        formValues.typeOs = osTypes.find(ot => ot.value === formValues.typeOs)

        if ( !editMode ) {
            dispatch(arrayPush(marcheFormName, 'os', formValues))
        } else {
            dispatch(change(marcheFormName, `os[${index}]`, formValues));
        }

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
                        name="typeOs" component={RadioField} validate={[required]}
                        options={ osTypes }
                    />
                    <Field
                        name="dateOs" component={DateField} label="Date de l'Ordre de Service" validate={[required]}
                    />
                    <Field
                        name="commentaire" component={TextField} label="Commentaire" fieldType="textarea" 
                    />
                    <Fields
                        names={["attachments", "resources"]} component={UploadLine} idMarche={idMarche}
                        formName={osFormName}
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