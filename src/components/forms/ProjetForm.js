import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, Fields, reduxForm, formValueSelector, change, initialize } from 'redux-form'

import { setBreadCrumb } from '../../actions';
import { required, number, emptyArray } from './validator'
import { TextField, SelectField, AutoCompleteField, ToggleField, SelectGrpField } from './form-fields/fields'
import useAjaxFetch from '../hooks/useAjaxFetch';
import { ApiError } from '../helpers';
import PartnerLine from './PartnerLine';
import LocationLine from './LocationLine';
import ProgLine from './ProgLine';

import './forms.css';
import { getRoles, getUserType } from '../../reducers/login';
import { withForbbiden, canUserAffect } from '../../security';
import { ButtonSpinner, FooterForm } from '../divers';

const vIndh = (value, formValues, props, name) => (
    (formValues.indh === true) && (!value) ? 
         'Ce champs est obligatoire' : undefined
)

const vPartners = (array=[], formValues, props, name) => 
    ((formValues.isConvention === true) && array && array.length === 0) ? 
         'Veuillez ajouter des partenaires' : undefined


const vMod = (value, formValues, props, name) => (
    (formValues.isMaitreOuvrageDel === true) && (!value) ? 
         'Ce champs est obligatoire' : undefined
)




export const formName = 'projetForm'

let ProjetForm = ({ handleSubmit, isMaitreOuvrageDel, dispatch, match, history, roles, userType, setForbbiden }) => {

    const [localisationItems, setLocalisationItems] = useState([]);
    const [secteurs, setSecteurs] = useState([]);
    const [financements, setFinancements] = useState([]);
    const [indhProgrammes, setIndhProgrammes] = useState([]);
    const [chargesSuivi, setChargesSuivi] = useState([]);

    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(false);

    // get id projet from params to determine if we are in edit mode
    const { idProjet } = match.params

    const editMode = idProjet ? true : false




    const initForm = () => {
        dispatch(initialize(formName, {}))
    }


    useEffect(() => {

        dispatch(setBreadCrumb("Ajouter un projet"))

        // BOTH MODES
        initForm()

        // PROJET LOADING !!!
        setLoading(true)
        useAjaxFetch({
            url: `/projets/loading`,
            params: idProjet ? { edit: idProjet } : {},
            success: (result) => {

                setLoading(false)
                setSecteurs(result.secteurs)
                setLocalisationItems(result.localisations)
                setFinancements(result.srcFinancements)
                setIndhProgrammes(result.indhProgrammes)
                if(result.chargesSuivi) setChargesSuivi(result.chargesSuivi)

                if(editMode) {
                    console.log(`/projets/edit/${idProjet} ->`, result.projetData)
                    dispatch(initialize(formName, result.projetData))
                }
            },
            error: (err) => setErrors(true),
            setForbbiden
        })

    }, [])
    

    


    
    const onSubmit = (formValues) => {

        // nameElem.classList.add("bounce-text")
        
        setSubmitting(true)
        setErrors(false)

        console.log(formValues)
        // return false
        let apiValues = { 
            ...formValues,
            idProjet,
            maitreOuvrage: formValues.maitreOuvrage ? formValues.maitreOuvrage.value : null,
            maitreOuvrageDel: formValues.maitreOuvrageDel ? formValues.maitreOuvrageDel.value : null,
        }

        
        console.log(apiValues)

        // return

        useAjaxFetch({
            url: 'projets',
            method: 'POST',
            body: JSON.stringify(apiValues),
            success: (savedProj) => {
                initForm()
                setSubmitting(false)

                // redirection ...
                if(editMode) {
                    history.goBack()
                } 
                else {
                    history.push(`/projets/detail/${savedProj}`)
                }
                // history.push("/projets/search")
            },
            error: (err) => {
                setErrors(true)
                setSubmitting(false)
            }
            
        })

    }



    console.log('PROJET FORM -> RENDERING -->')

    const genYears = () => {
        const years = [];
        let currentYear = new Date().getFullYear()+1;  
        while ( currentYear >= 2015 ) {
            years.push({ value: currentYear, label: currentYear});
            currentYear--;
        }   
        // console.log('years ->>>>>', years)
        return years;
    }

    return (
        <div className="form-container">
        <form id={formName} className={`form-wr ${ submitting || loading ? 'is-submitting' : '' }`}
            // onSubmit={ handleSubmit(onSubmit) }>
        >

            <div className="form-title hide">PROJET FORMULAIRE</div>

            <div className={`form-content`}>

            <Field
                name="intitule" component={TextField} label="Intitulé" fieldType="textarea" validate={[required]}
            />

            <Field
                name="anneeProjet" component={SelectField} label="Année projet" options={genYears()} validate={[required]}
            />

            <Field
                name="montant" component={TextField} label="Montant" fieldType="input" validate={[required, number]}
            />


            <div className="sep-line"></div>


            <Fields 
                names={[ 'srcFinancement', 'indhProgramme' ]} component={ProgLine} 
                financements= { financements }
                indhProgrammes= { indhProgrammes }
                setIndhProgrammes= { setIndhProgrammes }
                setErrors={ setErrors }
                validate={{ indhProgramme: vIndh, srcFinancement:[required] }}
            />
            
            <div className="sep-line"></div>

            <Fields 
                names={[ 'isConvention', 'partners' ]} component={PartnerLine} 
                validate={{ partners: vPartners }}
            />

            <div className="sep-line"></div>

            <Field 
                name="localisations" component={LocationLine} 
                localisationItems={localisationItems} validate={[emptyArray]} 
            />

            <div className="sep-line"></div>

            <Field name="maitreOuvrage" label="Maître d'ouvrage" component={AutoCompleteField}

                url='/acheteurs'
                onSelect={(suggestion) => dispatch(change(formName, 'maitreOuvrage', suggestion))}
                onDelete={() => dispatch(change(formName, 'maitreOuvrage', null))}
                validate={[required]}
            />



            <Field name="isMaitreOuvrageDel" label="Ajouter un maître d'ouvrage délégué" component={ToggleField}
            />

            { isMaitreOuvrageDel &&
            <Field name="maitreOuvrageDel"  component={AutoCompleteField}
                url='/acheteurs'
                onSelect={ (suggestion) => dispatch(change(formName, 'maitreOuvrageDel', suggestion)) }
                onDelete={ () => dispatch(change(formName, 'maitreOuvrageDel', null)) }
                validate={vMod}
            />
            }



            {
                canUserAffect(roles, userType) &&
            
                <>
                <div className="sep-line"></div>

                <Field
                    name="chargeSuivi" component={SelectGrpField} 
                    label="Chargé de suivi"
                    optgroups={chargesSuivi}
                    gOptsLabel="Choisir ..."
                    validate={[required]}
                />
                </>

            }

            <div className="sep-line"></div>

            <Field
                name="secteur" component={SelectField} label="Secteur" options={secteurs} defaultLabel="Choisir ..."
                validate={[required]}
            />

            </div>

            
            <FooterForm label={"Enregistrer"} callback={handleSubmit(onSubmit)} isLoading={submitting} errors={errors} />


            {/* <div className={`form-validation`}>
                <ButtonSpinner label={"Submit"} callback={handleSubmit(onSubmit)} isLoading={submitting}/>
            </div>
            
            { errors && <ApiError cssClass="va-errors"/> } */}

        </form>
        </div>
    )

}


ProjetForm = reduxForm({
    form: formName,
    // enableReinitialize: true
})(ProjetForm)

const selector = formValueSelector('projetForm');

ProjetForm = connect(
    (state) => ({
        // initialValues: {
        //     intitule: 'YOUSSEF PROJET',
        //     montant: 300000,
        //     secteur: 1,
        //     isConvention: true,
        //     maitreOuvrage: {value: 35, label: "Délégation Provincial Santé - Taourirt"},
        //     isMaitreOuvrageDel: false,
        // },
        // initialValues: getInitialFormValues(state),
        roles: getRoles(state),
        userType: getUserType(state),
        isConvention: selector(state, 'isConvention'),
        isMaitreOuvrageDel: selector(state, 'isMaitreOuvrageDel'),
        srcFinancement: selector(state, 'srcFinancement'),

    }),
)(ProjetForm);





export default withForbbiden(ProjetForm)


