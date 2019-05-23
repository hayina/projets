import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from 'redux-form'
import { required, number, integer } from '../forms/validator';
import { TextField, DateField, SelectField } from '../forms/form-fields/fields';


import { SocieteLine, TauxLine, OrdreServiceLine, DecompteLine } from './lines';
import useAjaxFetch from '../hooks/useAjaxFetch';
import { setBreadCrumb } from '../../actions';
import { ApiError } from '../helpers';

import './marcheForm.css'

export const marcheFormName = 'marcheForm'

let MarcheForm = ({ dispatch, handleSubmit, match, history }) => {

    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState(false);
    const [editLoading, setEditLoading] = useState(false)

    const [marcheTypes, setMarcheTypes] = useState([]);
    const [marcheEtats, setMarcheEtats] = useState([]);
    const [osTypes, setOsTypes] = useState([])

    // get id projet from params to determine if we are in edit mode
    const { idMarche } = match.params
    const { idProjet } = match.params

    const initForm = () => {
        dispatch(initialize(marcheFormName, {}))
    }

    useEffect(() => {

        

        dispatch(setBreadCrumb("Ajouter un marché"))

        initForm()
        

        
        useAjaxFetch({
            url: '/marcheTypes',
            success: (data) => setMarcheTypes(data),
            error: (err) => setErrors(true)
        })
        useAjaxFetch({
            url: '/marcheEtats',
            success: (data) => setMarcheEtats(data),
            error: (err) => setErrors(true)
        })

        fetchOsTypes();

        if(idMarche) {
            setEditLoading(true)
            useAjaxFetch({
                url: `/marches/edit/${idMarche}`,
                success: (data) => {
                    const editData = { ...data,
                        marcheType: data.marcheType.value,
                        marcheEtat: data.marcheEtat.value,
                        // societes: data.societes ? data.societes.map(ste => ste.value) : [],
                        // os: data.os ? data.os.map(os => ({ ...os, typeOs: os.typeOs.value })) : [],
                    }
                    console.log(editData)
                    setEditLoading(false)
                    dispatch(initialize(marcheFormName, editData))
                    // dispatch(initFormValues(editData))

                },
                error: (err) => setErrors(true)
            })
        }

    }, []);

    const fetchOsTypes = () => {
        useAjaxFetch({
            url: '/osTypes',
            success: (data) => setOsTypes(data),
            error: (err) => setErrors(true)
        })
    }


    const onSubmit = (formValues) => {

        // console.log(formValues)

        setSubmitting(true)
        setErrors(false)

        // console.log(formValues)
        // return false
        let apiValues = { 
            ...formValues,
            idMarche,
            idProjet,
            marcheType: { value: formValues.marcheType },
            marcheEtat: { value: formValues.marcheEtat },
            // societes: formValues.societes ? formValues.societes.map(ste => ({ value: ste })) : [],
            // os: formValues.os ? formValues.os.map(os => ({ ...os, typeOs: { value: os.typeOs } })) : [],
        }

        console.log(apiValues)

        useAjaxFetch({
            url: 'marches',
            method: 'POST',
            body: JSON.stringify(apiValues),
            success: () => {
                // initForm()
                setSubmitting(false)
                // history.push("/projets")
            },
            error: (err) => {
                setErrors(true)
                setSubmitting(false)
            }
            
        })
    }

    return (
        <form id={marcheFormName} className={`form-wr ${ submitting ? 'form-submitting is-submitting':'' }`} 
            onSubmit={ handleSubmit(onSubmit) }
        >    

            
            
            <div className={`form-content ${ submitting || editLoading ? 'form-submitting is-submitting':'' }`}>

                <Field
                    name="marcheType" component={SelectField} label="Type de marché" options={marcheTypes} flex={true}
                    // validate={[required]}
                />
                <Field
                    name="marcheEtat" component={SelectField} label="Etat du marché" options={marcheEtats} flex={true}
                    // validate={[required]}
                />

                <Field
                    name="intitule" component={TextField} label="Intitulé" fieldType="textarea" flex={true}
                    validate={[required]}
                />
                
                <Field
                    name="delai" component={TextField} label="Délai exécution (Mois)" fieldType="input" flex={true}
                    validate={[required, integer]}
                />
                
                <Field
                    name="montant" component={TextField} label="Montant" fieldType="input" flex={true}
                    validate={[required, number]}
                />

                <Field
                    name="numMarche" component={TextField} label="Num marché" fieldType="input" flex={true}
                    validate={[required]}
                />

                <div className="sep-line"></div>

                <Field name="societes" component={SocieteLine} />

                <div className="sep-line"></div>  
                      
                <Field name="dateStart" component={DateField} label="Date Commencement" />
                <Field name="os" component={OrdreServiceLine} osTypes={osTypes} />

                <div className="sep-line"></div>

                <Field name="taux" component={TauxLine} />

                <div className="sep-line"></div>

                <Field name="decomptes" component={DecompteLine} />

                <div className="sep-line"></div>

                <Field name="dateReceptionProv" component={DateField} label="Date Réception Provisoire" />
                <Field name="dateReceptionDef" component={DateField} label="Date Réception Définitive" />

            </div>

            <div className={`form-validation ${ editLoading ? 'is-submitting form-submitting':'' }`}>
                <button type="submit" 
                    className={`btn btn-primary ${ submitting ? 'btn-submitting is-submitting ':'' }`}>
                    Submit { submitting ? '...':'' }
                </button>
            </div>
            
            { errors && <ApiError cssClass="va-errors"/> }

        </form>
    )
}

MarcheForm = reduxForm({
    form: marcheFormName,
    // enableReinitialize: true
})(MarcheForm)



export default connect()(MarcheForm);