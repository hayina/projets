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
import { getRoles } from '../../reducers/login';
import { USER_ROLES } from '../../types';


const vIndh = (value, formValues, props, name) => (
    (formValues.indh === true) && (!value) ? 
         'Ce champs est obligatoire' : undefined
)
const vPartners = (array=[], formValues, props, name) => (
    ((formValues.isConvention === true) && array && array.length === 0) ? 
         'Veuillez ajouter des partenaires' : undefined
)

const vMod = (value, formValues, props, name) => (
    (formValues.isMaitreOuvrageDel === true) && (!value) ? 
         'Ce champs est obligatoire' : undefined
)




export const formName = 'projetForm'

let ProjetForm = ({ handleSubmit, isMaitreOuvrageDel, dispatch, match, history, roles }) => {

    const [localisationItems, setLocalisationItems] = useState([]);
    const [secteurs, setSecteurs] = useState([]);


    const [chargesSuivi, setChargesSuivi] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [editLoading, setEditLoading] = useState(false)
    const [errors, setErrors] = useState(false);

    // get id projet from params to determine if we are in edit mode
    const { idProjet } = match.params

    const initForm = () => {
        dispatch(initialize(formName, {}))
    }


    useEffect(() => {

        dispatch(setBreadCrumb("Ajouter un projet"))

        // BOTH MODES
        initForm()

        useAjaxFetch({
            url: 'secteurs',
            success: (data) => setSecteurs(data),
            error: (err) => setErrors(true)
        })
        useAjaxFetch({
            url: 'localisations',
            success: (data) => setLocalisationItems(data),
            error: (err) => setErrors(true)
        })
        useAjaxFetch({
            url: 'chargesSuivi',
            success: (data) => setChargesSuivi(data),
            error: (err) => setErrors(true)
        })



        // EDIT MODE
        if(idProjet) {
            setEditLoading(true)
            useAjaxFetch({
                url: `/projets/edit/${idProjet}`,
                success: (data) => {
                    console.log(`/projets/edit/${idProjet} ->`, data)

                    setEditLoading(false)
                    dispatch(initialize(formName, data))
                },
                error: (err) => setErrors(true)
            })
        } 
        // NEW MODE
        else {
            // initForm()
        }

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
            // partners: formValues.isConvention ? 
            //     formValues.partners.map(cp => `${cp.partner.value}:${cp.montant}`):[]
        }

        
        console.log(apiValues)

        // dispatch(arrayPushing('projets', apiValues));
        // setTimeout(() => {
        //     setSubmitting(false)
        // },300)

        // return

        useAjaxFetch({
            url: 'projets',
            method: 'POST',
            body: JSON.stringify(apiValues),
            success: () => {
                initForm()
                setSubmitting(false)
                history.push("/projets/search")
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
        <form id={formName} className="form-wr" onSubmit={ handleSubmit(onSubmit) }>

            <div className="form-title hide">PROJET FORMULAIRE</div>

            <div className={`form-content ${ submitting || editLoading ? 'form-submitting is-submitting':'' }`}>

            <Field
                name="intitule" component={TextField} label="Intitulé" fieldType="textarea" validate={[required]}
            />

            <Field
                name="anneeProjet" component={SelectField} label="Année projet" options={genYears()}
            />

            <Field
                name="montant" component={TextField} label="Montant" fieldType="input" validate={[required, number]}
            />


            <div className="sep-line"></div>


            <Fields 
                names={[ 'srcFinancement', 'indhProgramme' ]} component={ProgLine} 
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
                roles.some((role) => role === USER_ROLES.affecter_project) &&
            
                <>
                <div className="sep-line"></div>

                <Field
                    name="chargeSuivi" component={SelectGrpField} 
                    label="Chargé de suivi"
                    optgroups={chargesSuivi}
                    gOptsLabel="Choisir ..."
                />
                </>

            }

            <div className="sep-line"></div>

            <Field
                name="secteur" component={SelectField} label="Secteur" options={secteurs} defaultLabel="Choisir ..."
                validate={[required]}
            />

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


ProjetForm = reduxForm({
    form: formName,
    // enableReinitialize: true
})(ProjetForm)

const selector = formValueSelector('projetForm');

export default connect(
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
        isConvention: selector(state, 'isConvention'),
        isMaitreOuvrageDel: selector(state, 'isMaitreOuvrageDel'),
        srcFinancement: selector(state, 'srcFinancement'),

    }),
)(ProjetForm);



