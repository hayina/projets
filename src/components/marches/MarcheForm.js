import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize, SubmissionError, touch } from 'redux-form'
import { required, number, integer } from '../forms/validator';
import { TextField, DateField, SelectField } from '../forms/form-fields/fields';


import { SocieteLine, TauxLine, OrdreServiceLine, DecompteLine } from './lines';
import useAjaxFetch from '../hooks/useAjaxFetch';
import { setBreadCrumb } from '../../actions';
import { ApiError } from '../helpers';

import './marcheForm.css'
import { withForbbiden } from '../../security';
import { TYPE_OS } from '../../types';
import { isFuture } from '../../helpers';
import { ButtonSpinner, FooterForm } from '../divers';


export const marcheFormName = 'marcheForm'


// const vOsStart = (value=[], { os=[] } ) => (
//     value.length === 0 && os.length > 0  ? 
//          'veuillez renseigner aussi cet ordre de service' : undefined
// )

const validate = ({ osStart=[], os=[], decomptes=[], taux=[], societes=[], dateReceptionProv, dateReceptionDef }, { dispatch }) => {

    const errors = {}

    if( osStart.length > 1 ) {
        return { osStart: `un seul ordre de service est autorisé ici` }
    }

    if( osStart.length === 1 && osStart[0].typeOs.value !== TYPE_OS.COMMENCEMENT ) {
        return { osStart: `l'ordre de service (${osStart[0].typeOs.label}) n'est pas autorisé ici` }
    }

    if( osStart.length === 0 && (os.length > 0 || decomptes.length > 0 || taux.length > 0 || dateReceptionProv) ) {
        return { osStart: `veuillez renseigner cet ordre de service` }
    }


    const beforeOsStart = (date) => new Date(date) <= new Date(osStart[0].dateOs)
    const afterReceptProv = (date) => dateReceptionProv && (new Date(date) > new Date(dateReceptionProv))
    const beforeReceptProv = (date) => dateReceptionProv && (new Date(date) < new Date(dateReceptionProv))
    const expiredDate = (date) => isFuture(date) || afterReceptProv(date)
    const checkWrongDate = (date) => beforeOsStart(date) || expiredDate(date)


    const incorrectDate = "date incorrecte"

    if(osStart[0] && isFuture(osStart[0].dateOs)) {
        return { osStart: incorrectDate }
    }

    ///////// a ce stade tout est OKEY avec os start ///////// 

    if( dateReceptionProv && (beforeOsStart(dateReceptionProv) || isFuture(dateReceptionProv)) ) {
        return { dateReceptionProv: incorrectDate }
    }

    ///////// on a checker osStart et dateReceptionProv car tt les autres dates dependent d'eux ///////// 

    if( osStart[0] && societes.length === 0 ) {
        errors.societes=`veuillez renseigner ce champs`
    }

    const osLength = os.length
    // here we are sure that osStart exist
    if( osLength > 0 ) {

        os.sort((a, b) => new Date(a.dateOs) - new Date(b.dateOs))

        // since we already sort OS we check just with the min and max
        if( beforeOsStart(os[0].dateOs) ) {
            return { os: incorrectDate }
        }
        if( expiredDate(os[osLength-1].dateOs) ) {
            return { os: incorrectDate }
        }


        let prevOsType = TYPE_OS.REPRISE
 
        let i=0
        while (i<osLength) {

            if( prevOsType === os[i].typeOs.value ) {
                errors.os='ordres de services incorrectes (os successifs de même type)'
                break
            }

            if( os[i].typeOs.value === TYPE_OS.COMMENCEMENT ) {
                errors.os=`l'ordre de service (${os.typeOs.label}) n'est pas autorisé ici`
                break
            }

            prevOsType = os[i].typeOs.value 
            i++
        }

        if( !dateReceptionDef && prevOsType === TYPE_OS.ARRET ) {
            errors.os=`ordres de services incorrectes (on peut pas finir avec un os arrêt)`
        }
    }

    // checking decomptes and taux

    if( decomptes.length > 0 && decomptes.some(dec => checkWrongDate(dec.dateDec)) ) {
        errors.decomptes=incorrectDate
    }
    if( taux.length > 0 && taux.some(t => checkWrongDate(t.dateTaux)) ) {
        errors.taux=incorrectDate
    }

    if( dateReceptionDef && (beforeReceptProv(dateReceptionProv) || isFuture(dateReceptionDef)) ) {
        errors.dateReceptionDef=incorrectDate 
    }


    if( dateReceptionDef && !dateReceptionProv ) {
        dispatch(touch(marcheFormName, "dateReceptionProv"))
        errors.dateReceptionProv=`veuillez renseigner cette date`
    }
    

    return errors
}




let MarcheForm = ({ dispatch, handleSubmit, match, setForbbiden, history }) => {

    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(false);

    const [marcheTypes, setMarcheTypes] = useState([]);
    const [marcheEtats, setMarcheEtats] = useState([]);
    const [osTypes, setOsTypes] = useState([])

    // get id projet from params to determine if we are in edit mode
    const { idMarche } = match.params
    const { idProjet } = match.params
    const editMode = idMarche ? true : false

    const initForm = () => {
        dispatch(initialize(marcheFormName, {}))
    }

    const urlPrefix = editMode ? '' : `/projets/${idProjet}`;
    const urlSuffix = editMode ? `/${idMarche}` : '';

    useEffect(() => {

        dispatch(setBreadCrumb("Ajouter un marché"))

        initForm()

        setLoading(true)

        useAjaxFetch({
            url: `${ urlPrefix }/marches/loading${ urlSuffix }`,
            // url: `/marches/loading`,
            // params: idMarche ? { edit: idMarche } : {},
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

                setLoading(false)
            },
            error: () => setErrors(true),
            setForbbiden
        })

    }, []);

    const onSubmit = (formValues) => {

        // console.log(formValues)

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

        const os = formValues.osStart && formValues.osStart[0] ? [ ...formValues.os, formValues.osStart[0] ] : formValues.os
        // constructAttach(formValues.osStart, 'osAttachs')
        constructAttach(os, 'osAttachs')
        constructAttach(formValues.decomptes, 'decAttachs')

        // formValues.os.push(formValues.osStart[0])

        let apiValues = {
            ...formValues,
            // idMarche,
            idProjet,
            marcheType: { value: formValues.marcheType },
            marcheEtat: { value: formValues.marcheEtat },
            os
        }

        console.log(apiValues)

        // return

        formData.append('formJson', new Blob([JSON.stringify(apiValues)], { type: 'application/json' }));


        setSubmitting(true)
        setErrors(false)

        useAjaxFetch({
            url: `${ urlPrefix }/marches${ urlSuffix }`,
            method: editMode ? 'PUT' : 'POST',
            body: formData,
            success: () => {


                setSubmitting(false)
                if(editMode) {
                    history.goBack()
                } 
                else {
                    history.push(`/projets/detail/${idProjet}`)
                }

            },
            error: () => {
                setErrors(true)
                setSubmitting(false)
            }

        })
    }

    return (
        <div className="form-container">
        <form
            id={marcheFormName}
            className={`form-wr ${ submitting || loading ? 'is-submitting' : '' }`}
            // onSubmit={handleSubmit(onSubmit)}
        >



            <div className={`form-content`}>

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

                {/* <div className="sep-line"></div>

                <Field name="dateStart" component={DateField} label="Date Commencement" /> */}

                <div className="sep-line"></div>

                <Field name="osStart" component={OrdreServiceLine}
                    label="Ordre de service (Commencement)"
                    osTypes={ [osTypes.find(ot => ot.value === TYPE_OS.COMMENCEMENT)] } idMarche={idMarche} 
                />

                <div className="sep-line"></div>

                <Field name="os" component={OrdreServiceLine} 
                    label="Ordres de service (ARRÊT/REPRISE)"
                    osTypes={ osTypes.filter(ot => ot.value !== TYPE_OS.COMMENCEMENT) } idMarche={idMarche} 
                />

                <div className="sep-line"></div>

                <Field name="decomptes" component={DecompteLine} idMarche={idMarche} />

                <div className="sep-line"></div>

                <Field name="taux" component={TauxLine} />

                <div className="sep-line"></div>

                <Field name="dateReceptionProv" component={DateField} label="Date Réception Provisoire" />
                <Field name="dateReceptionDef" component={DateField} label="Date Réception Définitive" />



            </div>

            <FooterForm label={"Enregistrer"} callback={handleSubmit(onSubmit)} isLoading={submitting} errors={errors} />


            {/* <div className={`form-validation`}>
                <ButtonSpinner label={"Submit"} callback={handleSubmit(onSubmit)} isLoading={submitting}/>
            </div>

            {errors && <ApiError cssClass="va-errors" />} */}

        </form>
        </div>
    )
}

MarcheForm = reduxForm({
    form: marcheFormName,
    validate
})(MarcheForm)



MarcheForm = connect()(MarcheForm);


export default withForbbiden(MarcheForm)