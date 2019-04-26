import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, Fields, reduxForm, formValueSelector, change } from 'redux-form'

import { showModal, arraySetting, initFormValues, hideModal, arrayDeletingByIndex, setBreadCrumb } from '../../actions';
import { modalTypes } from '../modals/ModalRoot'
import { required, number, emptyArray } from './validator'
import { TextField, SelectField, SimpleField, AutoCompleteField, ToggleField, EmptyField } from './form-fields/fields'
import { getPointsFocaux } from '../../reducers/externalForms';
import { getInitialFormValues } from '../../reducers';
import SimpleList from './SimpleList';
import useAjaxFetch from '../hooks/useAjaxFetch';
import { ApiError } from '../helpers';
import PartnerLine from './PartnerLine';
import LocationLine from './LocationLine';
import ProgLine from './ProgLine';

import './forms.css';


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

let ProjetForm = ({ handleSubmit, isConvention, pointsFocaux, isMaitreOuvrageDel, dispatch, match, history }) => {

    const [localisationItems, setLocalisationItems] = useState([]);
    const [secteurs, setSecteurs] = useState([]);
    const [financements, setFinancements] = useState([]);
    const [indhProgrammes, setIndhProgrammes] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [editLoading, setEditLoading] = useState(false)
    const [errors, setErrors] = useState(false);

    // get id projet from params to determine if we are in edit mode
    const { idProjet } = match.params

    const initForm = () => {
        dispatch(initFormValues({}))
        // dispatch(arraySetting('localisations', []))
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

        // EDIT MODE
        if(idProjet) {
            setEditLoading(true)
            useAjaxFetch({
                url: `/projets/edit/${idProjet}`,
                success: (data) => {
                    console.log(`/projets/edit/${idProjet} ->`, data)
                    // dispatch(initialize(formName, data))
                    setEditLoading(false)
                    dispatch(initFormValues(data))
                    //load src financement for this specific maitre ouvrage
                    // si pas Conventionné pour ne pas rentrer en confli avec src financement des partenaire 
                    if(!data.isConvention) fetchFinancements(data.maitreOuvrage.value)
                    if(data.indh) fetchIndhProgrammes()
                },
                error: (err) => setErrors(true)
            })
        } 
        // NEW MODE
        else {
            // initForm()
        }

    }, [])
    

    const fetchFinancements = (acheteur) => {
        useAjaxFetch({
            url: `/financements/${acheteur}`,
            success: (data) => { setFinancements(data) },
            error: (err) => setErrors(true)
        })
    }
    
    const fetchIndhProgrammes = () => {

        if( indhProgrammes.length === 0 ){
            useAjaxFetch({
                url: `/parent/programmes`,
                // url: `/getProgrammesWithPhases`,
                success: (data) => { setIndhProgrammes(data) },
                error: (err) => setErrors(true)
            })
        }
    }
    
    const onSubmit = (formValues) => {

        // nameElem.classList.add("bounce-text")
        
        setSubmitting(true)
        setErrors(false)

        console.log(formValues)
        // return false
        let apiValues = { 
            ...formValues,
            idProjet,
            // maitre ouvrage
            maitreOuvrage: formValues.maitreOuvrage ? 
            `${formValues.maitreOuvrage.value}${ formValues.srcFinancement ? `:${formValues.srcFinancement}`:'' }` : null,
            // maitre ouvrage delegué
            maitreOuvrageDel: formValues.maitreOuvrageDel ? formValues.maitreOuvrageDel.value : null,
            // partenaires
            partners: formValues.isConvention ? 
                formValues.partners.map(cp => `${cp.partner.value}:${cp.montant}${cp.srcFinancement ? 
                    `:${cp.srcFinancement.value}`:''}`):[]
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
                history.push("/projets")
            },
            error: (err) => {
                setErrors(true)
                setSubmitting(false)
            }
            
        })

    }


    console.log('PROJET FORM -> RENDERING -->')

    return (
        <form id={formName} className="form-wr" onSubmit={ handleSubmit(onSubmit) }>

            <div className="form-title hide">PROJET FORMULAIRE</div>

            <div className={`form-content ${ submitting || editLoading ? 'form-submitting is-submitting':'' }`}>

            <Field
                name="intitule" component={TextField} label="Intitulé" fieldType="textarea" validate={[required]}
            />

            <Field
                name="montant" component={TextField} label="Montant" fieldType="input" validate={[required, number]}
            />

            <div className="sep-line"></div>

            <Fields 
                names={[ 'indh', 'prdts', 'indhProgramme' ]} component={ProgLine} 
                indhProgrammes={indhProgrammes}
                indhCallback={fetchIndhProgrammes}
                validate={{ indhProgramme: vIndh }}
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
                onSelect={(suggestion) => {
                    dispatch(change(formName, 'maitreOuvrage', suggestion));
                    fetchFinancements(suggestion.value)
                }}
                onDelete={() => {
                    dispatch(change(formName, 'maitreOuvrage', null))
                    setFinancements([])
                }}
                validate={[required]}
            />

            {/* si pas Conventionné pour ne pas rentrer en confli avec src financement des partenaire */}
            {  !isConvention && financements && financements.length > 0 &&
                <Field
                    name="srcFinancement"
                    component={SelectField}
                    label="Source de Financement"
                    options={financements}
                    validate={[required]}
                />
            }

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



            <div className="sep-line"></div>

            <SimpleField label={'Chargé du Suivi'}>
                <input type="button" className="btn btn-info show-modal" 
                    value={ pointsFocaux.length > 0 ? `Editer` : `Choisir`}
                    style={{ float: 'right' }}
                    onClick={
                        () => dispatch(showModal(modalTypes.ADD_CHECK_LIST_MODAL, 
                                { 
                                    title: 'Choisir un chargé du suivi',
                                    items: pointsFocauxItems, 
                                    initialSelection: pointsFocaux,
                                    vHandler: (selection) => {
                                        dispatch(arraySetting('pointsFocaux', selection))
                                        dispatch(hideModal())
                                    }
                                }
                        ))
                    }
                />
            </SimpleField>

            <Field
                name="pointsFocaux2" component={EmptyField} arrayValues={pointsFocaux} validate={[emptyArray]}
            />

            
            <SimpleList
                items={ pointsFocaux }
                onDelete= { (index) => dispatch(arrayDeletingByIndex('pointsFocaux', index)) }
            /> 
     

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
    enableReinitialize: true
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
        initialValues: getInitialFormValues(state),
        isConvention: selector(state, 'isConvention'),
        isMaitreOuvrageDel: selector(state, 'isMaitreOuvrageDel'),
        maitreOuvrage: selector(state, 'maitreOuvrage'),
        // partners: getExtPartners(state),
        // localisations: getLocalisations(state),
        pointsFocaux: getPointsFocaux(state),
    }),
)(ProjetForm);


let pointsFocauxItems = [
    { value: 1, label: 'EL YOUBY Mohammed', },
    { value: 2, label: 'ABDENNABI Jamai', },
    { value: 3, label: 'Karim Salah', },
    { value: 4, label: 'Rachid Ech-choudany', },
    { value: 5, label: 'Sahli Hamzaoui', },
    { value: 6, label: 'BACHAOUI ABDERRAHMANE', },
]
