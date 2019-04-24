import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, Fields, reduxForm, formValueSelector, change } from 'redux-form'
import { required, number, integer } from '../forms/validator';
import { TextField, AutoCompleteField, DateField, SelectField } from '../forms/form-fields/fields';

import './marcheForm.css'
import { SocieteLine, TauxLine, OrdreServiceLine } from './lines';
import useAjaxFetch from '../hooks/useAjaxFetch';

export const marcheFormName = 'marcheForm'

let MarcheForm = ({ dispatch, handleSubmit, match }) => {

    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState(false);
    const [editLoading, setEditLoading] = useState(false)

    const [marcheTypes, setMarcheTypes] = useState([]);

    // get id projet from params to determine if we are in edit mode
    const { idMarche } = match.params

    const initForm = () => {
        // dispatch(initFormValues({}))
        // dispatch(arraySetting('localisations', []))
    }

    useEffect(() => {

        initForm()

        
        useAjaxFetch({
            url: '/marcheTypes',
            success: (data) => setMarcheTypes(data),
            error: (err) => setErrors(true)
        })

        if(idMarche) {

        }

    }, []);


    const onSubmit = (formValues) => {

    }

    return (
        <form id={marcheFormName} className={`form-wr ${ submitting ? 'form-submitting is-submitting':'' }`} 
            onSubmit={ handleSubmit(onSubmit) }
        >    

            
            
            <div className={`form-content ${ submitting || editLoading ? 'form-submitting is-submitting':'' }`}>

                <Field
                    name="marcheType" component={SelectField} label="Type de marché" 
                    options={marcheTypes} validate={[required]}
                />

                <Field
                    name="intitule" component={TextField} label="Intitulé" fieldType="textarea" validate={[required]}
                />
                
                <Field
                    name="delai" component={TextField} label="Délai exécution (Mois)" fieldType="input" validate={[required, integer]}
                />
                
                <Field
                    name="montant" component={TextField} label="Montant" fieldType="input" validate={[required, number]}
                />

 

                <div className="sep-line"></div>
                <Field name="societe" component={SocieteLine} />

                <div className="sep-line"></div>  
                      
                <Field
                    name="dateStart" component={DateField} label="Date Commencement" validate={[required]}
                />


                <Field name="os" component={OrdreServiceLine} />

                <div className="sep-line"></div>
                <Field name="taux" component={TauxLine} />
                <div className="sep-line"></div>

                <Field
                    name="dateReceptionProv" component={DateField} 
                    label="Date Réception Provisoire" validate={[required]}
                />
                <Field
                    name="dateReceptionDef" component={DateField} 
                    label="Date Réception Définitive" validate={[required]}
                />

            </div>

        </form>
    )
}

MarcheForm = reduxForm({
    form: marcheFormName,
    enableReinitialize: true
})(MarcheForm)

const selector = formValueSelector(marcheFormName);

export default connect(
    (state) => ({
    }),
)(MarcheForm);