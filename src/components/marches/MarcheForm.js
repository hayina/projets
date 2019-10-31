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
import { withForbbiden } from '../../security';

export const marcheFormName = 'marcheForm'

let MarcheForm = ({ dispatch, handleSubmit, match, setForbbiden }) => {

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

        setEditLoading(true)

        useAjaxFetch({
            url: `/marches/loading`,
            params: idMarche ? { edit: idMarche } : {},
            success: (result) => {

                setMarcheTypes(result.marcheTypes)
                setMarcheEtats(result.marcheEtats)
                setOsTypes(result.osTypes)

                if (idMarche) {
                    const editData = {
                        ...result.marcheData,
                        marcheType: result.marcheData.marcheType.value,
                        marcheEtat: result.marcheData.marcheEtat.value,
                    }
                    console.log(editData)
                    dispatch(initialize(marcheFormName, editData))
                }

                setEditLoading(false)

            },
            error: () => setErrors(true),
            setForbbiden
        })

    }, []);

    const onSubmit = (formValues) => {

        // console.log(formValues)

        setSubmitting(true)
        setErrors(false)


        const formData = new FormData();

        const constructAttach = (fieldWithAttachs, nameField) => {

            if (fieldWithAttachs) {
                for (const [i, line] of fieldWithAttachs.entries()) {

                    line.index = null
                    if (line.attachments) {
                        for (const [j, file] of line.attachments.entries()) {
                            formData.append(`${nameField}[${i}][${j}]`, file);
                        }
                        line.index = i
                    }
                }
            }
        }

        constructAttach(formValues.os, 'osAttachs')
        constructAttach(formValues.decomptes, 'decAttachs')


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


        formData.append('formJson', new Blob([JSON.stringify(apiValues)], { type: 'application/json' }));

        useAjaxFetch({
            // url: 'postman/marches22',
            url: 'marches',
            method: 'POST',
            // contentType: "multipart/form-data",
            body: formData,
            // body: JSON.stringify(apiValues),
            success: () => {
                // initForm()
                setSubmitting(false)
                // history.push("/projets")
            },
            error: () => {
                setErrors(true)
                setSubmitting(false)
            }

        })
    }

    return (
        <form
            id={marcheFormName}
            className={`form-wr ${submitting ? 'form-submitting is-submitting' : ''}`}
            onSubmit={handleSubmit(onSubmit)}
        >



            <div className={`form-content ${submitting || editLoading ? 'form-submitting is-submitting' : ''}`}>

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
                <Field name="os" component={OrdreServiceLine} osTypes={osTypes} idMarche={idMarche} />

                <div className="sep-line"></div>

                <Field name="decomptes" component={DecompteLine} idMarche={idMarche} />

                <div className="sep-line"></div>

                <Field name="taux" component={TauxLine} />

                <div className="sep-line"></div>

                <Field name="dateReceptionProv" component={DateField} label="Date Réception Provisoire" />
                <Field name="dateReceptionDef" component={DateField} label="Date Réception Définitive" />



            </div>

            <div className={`form-validation ${editLoading ? 'is-submitting form-submitting' : ''}`}>
                <button type="submit"
                    className={`btn btn-primary ${submitting ? 'btn-submitting is-submitting ' : ''}`}>
                    Submit {submitting ? '...' : ''}
                </button>
            </div>

            {errors && <ApiError cssClass="va-errors" />}

        </form>
    )
}

MarcheForm = reduxForm({
    form: marcheFormName,
})(MarcheForm)



MarcheForm = connect()(MarcheForm);


export default withForbbiden(MarcheForm)