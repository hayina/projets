import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, initialize, change } from 'redux-form'

import useApi from '../hooks/useApi';

import { showModal, arraySetting, initFormValues, arrayPushing, hideModal } from '../../actions';
import { modalTypes } from '../modals/ModalRoot'
import { required, number, emptyArray } from './validator'
import { TextField, RadioField, SelectField, SimpleField, 
    AutoCompleteField, ToggleField, LineRadio, SelectGrpField, SliderCheckbox, EmptyField } from './form-fields/fields'
import { getExtPartners, getLocalisations, getPointsFocaux, getInitialFormValues } from '../../reducers/externalForms';
import { arrayDeletingByIndex, arrayDeletingByPath } from '../../actions';
import { nestedTree, convertToSelectionByLeafs } from '../checkboxTree/helpers';
import { NestedTree } from '../checkboxTree/CheckTree';
import CheckListModal from '../modals/CheckListModal';
// import { formName as conventionFormName } from '../modals/Convention';


import SimpleList, { SimpleListItem } from './SimpleList';
import useAjaxFetch from '../hooks/useAjaxFetch';

import './forms.css';
import types, { constants } from '../../types';
// import { programmes } from '../../dataSource';
import { ApiError } from '../helpers';


const vPartners = (array, formValues, props, name) => (
    ((formValues.isConvention === true) && array && array.length === 0) ? 
         'Veuillez ajouter des partenaires' : undefined
)

const vMod = (value, formValues, props, name) => (
    (formValues.isMaitreOuvrageDel === true) && (!value) ? 
         'Ce champs est obligatoire' : undefined
)


const formName = 'projetForm'

let ProjetForm = ({ 
            handleSubmit, isConvention, partners, localisations, pointsFocaux, isMaitreOuvrageDel, maitreOuvrage, 
            programmes,
            dispatch, match, initialValues, history,    
        }) => {



    const [localisationItems, setLocalisationItems] = useState([]);
    const [secteurs, setSecteurs] = useState([]);
    const [financements, setFinancements] = useState([]);
    const [programmesItems, setProgrammesItems] = useState([]);
    const [subProgrammes, setSubProgrammes] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [editLoading, setEditLoading] = useState(false)
    const [errors, setErrors] = useState(false);

    // console.log("initialValues ->", initialValues)
    // console.log("match.params ->", match.params.idProjet)

    const { idProjet } = match.params

    const initForm = () => {
        dispatch(initFormValues({}))
        dispatch(arraySetting('localisations', []))
        dispatch(arraySetting('partners', []))
    }

    useEffect(() => {

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
            url: 'parent/programmes',
            success: (data) => setProgrammesItems(data),
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
                    dispatch(arraySetting('localisations', data.localisations))
                    dispatch(arraySetting('partners', data.partners))
                    dispatch(initFormValues(data))
                    //load src financement for this specific maitre ouvrage
                    // si pas Conventionné pour ne pas rentrer en confli avec src financement des partenaire 
                    if(!data.isConvention) fetchFinancements(data.maitreOuvrage.value)
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
    
    const fetchSubProgrammes = (parent) => {
        useAjaxFetch({
            url: `/programmes/${parent}`,
            success: (data) => { setSubProgrammes(data) },
            error: (err) => setErrors(true)
        })
    }
    
    const onSubmit = (formValues) => {

        setSubmitting(true)
        setErrors(false)

        console.log(formValues)
        // return false
        let apiValues = { 
            ...formValues,
            idProjet,
            maitreOuvrage: formValues.maitreOuvrage ? 
            `${formValues.maitreOuvrage.value}${ formValues.srcFinancement ? `:${formValues.srcFinancement}`:'' }` : null,
            maitreOuvrageDel: formValues.maitreOuvrageDel ? formValues.maitreOuvrageDel.value : null,
            localisations,
            partners: partners.map(cp => `${cp.partner.value}:${cp.montant}${cp.srcFinancement ? `:${cp.srcFinancement}`:''}`)
        }

        
        console.log(apiValues)
        console.log(JSON.stringify(apiValues))


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
                name="intitule"
                component={TextField}
                label="Intitulé"
                fieldType="textarea"
                validate={[required]}
            />

            <Field
                name="montant"
                component={TextField}
                label="Montant"
                fieldType="input"
                validate={[required, number]}
            />

            <div className="sep-line"></div>

            <Field
                name="programmes"
                component={SliderCheckbox}
                options={programmesItems}
                label="Programme"
                apiFetch={(parent) => {
                    if(parent === constants.INDH) fetchSubProgrammes(parent)
                }}
            />

            { programmes && programmes.includes(constants.INDH) && subProgrammes.length > 0 &&
            <Field
                name="subProgramme"
                component={SelectGrpField}
                // label="Programme"
                optgroups={subProgrammes}
                gOptsLabel="Choisir un programme..."
                validate={[required]}
            />
            }
            
            <div className="sep-line"></div>

            <Field
                name="isConvention"
                component={LineRadio}
                label="Conventionné"
                // options={[{ label: 'Oui', value: true }, { label: 'Non', value: false }]}
                btnText="Ajouter un partenaire"
                btnOnClick={() => dispatch(showModal(modalTypes.ADD_CONVENTION, { editMode: false }))}
            />

            <Field
                name="partners2"
                component={EmptyField}
                arrayValues={partners}
                validate={vPartners}
            />

            {/* ({partners.length})-({isConvention ? 'true':'false'}) */}

            {(isConvention && partners) && (
                <div className="form-group">
                    {partners.map(({ partner, montant }, i) => (
                        <div className="partner-item" key={partner.value}>
                            <SimpleListItem item={partner} 
                                onDelete={ () => dispatch(arrayDeletingByIndex('partners', i)) } 
                                onEdit={() => {
                                    dispatch(showModal(modalTypes.ADD_CONVENTION, {
                                        editMode: true, index: i, initialValues: partners[i]
                                    }))
                                }}
                            />
                            <div className="partner-montant">{Number(montant).toLocaleString()} DH</div>
                        </div>
                    ))}
                </div>
            )}

            <div className="sep-line"></div>

            <SimpleField label='Localisation'>
                <input type="button" className="btn btn-info show-modal" 
                    value={ localisations.length > 0 ? `Editer` : `Choisir`}
                    style={{ float: 'right' }}
                    onClick={
                        () => {
                            dispatch(showModal(modalTypes.ADD_LOCALISATION, 
                                { 
                                    items: localisationItems, 
                                    initialSelection: convertToSelectionByLeafs(localisations, localisationItems) 
                                }
                            ))
                            
                        }
                    }
                />
            </SimpleField>

            <Field
                name="localaisation2"
                component={EmptyField}
                arrayValues={localisations}
                validate={[emptyArray]}
            />


            { localisations && localisations.length > 0 &&
            <div className="localisations-wr tree-wr">
                <NestedTree 
                    items={ nestedTree(localisations, localisationItems) }
                    onDelete= { (path) => dispatch(arrayDeletingByPath('localisations', path)) }
                /> 
            </div>
            }


            <div className="sep-line"></div>

            <Field name="maitreOuvrage" label="Maître d'ouvrage" component={AutoCompleteField}

                url='/acheteurs'
                // url='/get_acheteurs'
                onSelect={(suggestion) => {
                    dispatch(change(formName, 'maitreOuvrage', suggestion));
                    fetchFinancements(suggestion.value)
                }}
                onDelete={() => {
                    dispatch(change(formName, 'maitreOuvrage', null))
                    setFinancements([])
                }}
                // suggestion={maitreOuvrage}
                validate={[required]}
            />

            {/* si pas Conventionné pour ne pas rentrer en confli avec src financement des partenaire */}
            {  !isConvention && financements && financements.length > 0 &&
                <Field
                    name="srcFinancement"
                    component={SelectField}
                    label="Source de Financement"
                    options={financements}
                    // validate={[required]}
                />
            }

            <Field name="isMaitreOuvrageDel" label="Ajouter un maître d'ouvrage délégué" component={ToggleField}
            />

            { isMaitreOuvrageDel &&
            <Field name="maitreOuvrageDel"  component={AutoCompleteField}

                // url='/get_acheteurs'
                url='/acheteurs'
                onSelect={ (suggestion) => dispatch(change(formName, 'maitreOuvrageDel', suggestion)) }
                onDelete={ () => dispatch(change(formName, 'maitreOuvrageDel', null)) }
                // suggestion={maitreOuvrage}
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
                name="pointsFocaux2"
                component={EmptyField}
                arrayValues={pointsFocaux}
                validate={[emptyArray]}
            />

            
            <SimpleList
                items={ pointsFocaux }
                onDelete= { (index) => dispatch(arrayDeletingByIndex('pointsFocaux', index)) }
            /> 
     

            <div className="sep-line"></div>

            <Field
                name="secteur"
                component={SelectField}
                label="Secteur"
                options={secteurs}
                defaultLabel="Choisir ..."
                validate={[required]}
            />

            </div>

            

            <div className={`form-validation ${ editLoading ? 'is-submitting form-submitting':'' }`}>
                <button type="submit" 
                    className={`btn btn-primary ${ submitting ? 'btn-submitting is-submitting ':'' }`}>
                    Submit { submitting ? '...':'' }
                </button>
            </div>
            
            { errors && <ApiError cssClass="va-errors"/>}

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
        programmes: selector(state, 'programmes'),
        isConvention: selector(state, 'isConvention'),
        isMaitreOuvrageDel: selector(state, 'isMaitreOuvrageDel'),
        maitreOuvrage: selector(state, 'maitreOuvrage'),
        partners: getExtPartners(state),
        localisations: getLocalisations(state),
        pointsFocaux: getPointsFocaux(state),
    }),
)(ProjetForm);


// const mapItems = (items) => {

//     console.log(`Mapping items -------------------------------------> !!!`)

//     const mapProperties = ({ items, parentPath }) => {

//         items.forEach(el => {

//             if (parentPath) el.path = `${parentPath}.${el.value}`
//             else el.path = `${el.value}`

//             if (el.children)
//                 mapProperties({ items: el.children, parentPath: `${el.path}` })
//         });

//     }

//     mapProperties({ items })
//     return items
// }

let pointsFocauxItems = [
    { value: 1, label: 'EL YOUBY Mohammed', },
    { value: 2, label: 'ABDENNABI Jamai', },
    { value: 3, label: 'Karim Salah', },
    { value: 4, label: 'Rachid Ech-choudany', },
    { value: 5, label: 'Sahli Hamzaoui', },
    { value: 6, label: 'BACHAOUI ABDERRAHMANE', },
]



// @ResponseBody
// @RequestMapping(value="/ajax/localisations") 
// public Collection<TreeDto>  ajax_localisations(HttpServletRequest request) {
    
//     List<LocalisationBean> communes = localisationDao.getCommunesWithFractions2();
    
//     Map<Integer, TreeDto> communetree = new LinkedHashMap<Integer, TreeDto>();
    
//     communes.forEach((com) -> {
        
//         if (!communetree.containsKey(com.idCommune)){
//             communetree.put(com.idCommune, new TreeDto(com.idCommune, com.commune));
//         }
        
//         communetree.get(com.idCommune).children.add(new TreeDto(com.idFraction, com.fraction));
        
//     });
    
//     return communetree.values();
    
// }


