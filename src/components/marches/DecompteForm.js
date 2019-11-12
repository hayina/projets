import React from 'react';
import { connect } from 'react-redux';
import { Field, Fields, submit, reduxForm, change, arrayPush } from 'redux-form'
import Modal from '../modals/Modal';
import { TextField, DateField } from '../forms/form-fields/fields';
import { required, number } from '../forms/validator';



import { marcheFormName } from './MarcheForm'
import { hideModal } from '../../actions';
import { UploadLine } from './lines';

export const decompteFormName = 'osForm'



let DecompteForm = ({ dispatch, handleSubmit, editMode, index, idMarche }) => {


    const onSubmit = (formValues) => {

        console.log(formValues, editMode, index)
        if (!editMode) {
            dispatch(arrayPush(marcheFormName, 'decomptes', formValues))
        } else {
            dispatch(change(marcheFormName, `decomptes[${index}]`, formValues));
        }

        dispatch(hideModal())

    }

    return (
        <Modal
            vBar={false}
            handleValidation={() => dispatch(submit(decompteFormName))}
        // title={ `Ajouter une nouvelle société` }
        >

            <form onSubmit={handleSubmit(onSubmit)} id={decompteFormName} >
                <div className={`form-content`}>
                    <Field
                        name="montant" component={TextField} label="Montant" validate={[required, number]}
                    />
                    <Field
                        name="dateDec" component={DateField} label="Date Décompte" validate={[required]}
                    />
                    {/* <Field
                        name="commentaire" component={TextField} label="Commentaire" fieldType="textarea"
                    /> */}

                    <Fields
                        names={["attachments", "resources"]} component={UploadLine} idMarche={idMarche}
                        formName={decompteFormName}
                    />
                </div>

                <div className={`form-validation`}>
                    <button type="submit" className={`btn btn-primary`}>Submit</button>
                </div>

            </form>
        </Modal>
    )
}

DecompteForm = reduxForm({
    form: decompteFormName,
    // enableReinitialize: true,
    // onSubmit
})(DecompteForm)


export default connect()(DecompteForm);