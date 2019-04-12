import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, initialize, change } from 'redux-form'

import useApi from '../hooks/useApi';

import { showModal, arraySetting, initFormValues, arrayPushing } from '../../actions';
import { modalTypes } from '../modals/ModalRoot'
import { required, number, emptyArray } from './validator'
import { TextField, RadioField, SelectField, SimpleField, 
    AutoCompleteField, ToggleField } from './form-fields/fields'
import { getExtPartners, getLocalisations, getPointsFocaux, getInitialFormValues } from '../../reducers/externalForms';
import { arrayDeletingByIndex, arrayDeletingByPath } from '../../actions';
import { nestedTree, convertToSelectionByLeafs } from '../checkboxTree/helpers';
import { NestedTree } from '../checkboxTree/CheckTree';
import CheckListModal from '../modals/CheckListModal';
// import { formName as conventionFormName } from '../modals/Convention';


import SimpleList from './SimpleList';
import useAjaxFetch from '../hooks/useAjaxFetch';

import './forms.css';
import types, { constants } from '../../types';

const formName = 'projetForm'

let ProjetForm = ({ 
            handleSubmit, isConvention, partners, localisations, pointsFocaux, isMaitreOuvrageDel, maitreOuvrage,
            dispatch, match, initialValues, history     
        }) => {



    const [localisationItems, setLocalisationItems] = useState([]);
    const [secteurs, setSecteurs] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    // console.log("initialValues ->", initialValues)
    // console.log("match.params ->", match.params.idProjet)

    const { idProjet } = match.params

    const initForm = () => {
        dispatch(initFormValues({}))
        dispatch(arraySetting('localisations', []))
        dispatch(arraySetting('partners', []))
    }

    useEffect(() => {

        initForm()

        useAjaxFetch({
            url: 'secteurs',
            success: (data) => setSecteurs(data)
        })
        useAjaxFetch({
            url: 'localisations',
            success: (data) => setLocalisationItems(mapItems(data)),
        })

        // EDIT MODE
        if(idProjet) {
            setSubmitting(true)
            useAjaxFetch({
                url: `/projets/edit/${idProjet}`,
                success: (data) => {
                    console.log(`/projets/edit/${idProjet} ->`, data)
                    // dispatch(initialize(formName, data))
                    setSubmitting(false)
                    dispatch(arraySetting('localisations', data.localisations))
                    dispatch(arraySetting('partners', data.partners))
                    dispatch(initFormValues(data))
                },
            })
        } 
        // NEW MODE
        else {
            // initForm()
        }

    }, [])
    
    
    const onSubmit = (formValues) => {

        setSubmitting(true)

        console.log(formValues)
        // return false
        let apiValues = { 
            ...formValues,
            idProjet,
            maitreOuvrage: formValues.maitreOuvrage.value,
            maitreOuvrageDel: formValues.isMaitreOuvrageDel ? formValues.maitreOuvrageDel.value : null,
            localisations,
            partners: partners.map(cp => `${cp.partner.value}:${cp.montant}`)
        }


        console.log(apiValues)


        dispatch(arrayPushing('projets', apiValues));
        setTimeout(() => {

            initForm()
            setSubmitting(false)
            history.push("/projets")
        },2000)

        return

        useAjaxFetch({
            url: 'projets',
            method: 'POST',
            body: JSON.stringify(apiValues),
            success: () => {
                initForm()
                setSubmitting(false)
                history.push("/projets")
            }
            
        })

    }


    console.log('RENDERING  ----------------------------------------->')

    return (
        <form id={formName} className="form-wr" onSubmit={ handleSubmit(onSubmit) }>

            <div className="form-title hide">PROJET FORMULAIRE</div>

            <div className={`form-content ${ submitting ? 'form-submitting is-submitting':'' }`}>
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
                name="isConvention"
                component={RadioField}
                label="Conventionné"
                options={[{ label: 'Oui', value: true }, { label: 'Non', value: false }]}
            />


            {isConvention && (
                <input type="button" className="btn btn-info show-modal show-modal-conv" value="ajouter un partenaire"
                    onClick={() => dispatch(showModal(modalTypes.ADD_CONVENTION, { editMode: false }))}
                />
            )}

            {(isConvention && partners) && (
                <div className="form-group">
                    {partners.map(({ partner, montant }, i) => (
                        <div className="partner-item" key={partner.value}>

                            <i className="fa fa-times delete-item-list"
                                onClick={() => dispatch(arrayDeletingByIndex('partners', i))}></i>

                            {/* <i className="fas fa-pencil-square-o edit-item-list fa-edit-partner" */}
                            <i className="fa fa-edit edit-item-list fa-edit-partner"
                                onClick={() => {
                                    dispatch(showModal(modalTypes.ADD_CONVENTION, {
                                        editMode: true, index: i, initialValues: partners[i]
                                    }))
                                    // dispatch(showModal(modalTypes.ADD_CONVENTION, { editMode: true, index: i }))
                                    // dispatch(initialize(conventionFormName, partners[i]))
                                }}
                            />

                            <div className="partner-name">{i+1}. {partner.label}</div>
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

            <div className="localisations-wr tree-wr">
                <NestedTree 
                    items={ nestedTree(localisations, localisationItems) }
                    onDelete= { (path) => dispatch(arrayDeletingByPath('localisations', path)) }
                /> 
            </div>


            <div className="sep-line"></div>

            <Field name="maitreOuvrage" label="Maître d'ouvrage" component={AutoCompleteField}

                // url='/acheteurs'
                url='/get_acheteurs'
                onSelect={(suggestion) => {
                    dispatch(change(formName, 'maitreOuvrage', suggestion));
                }}
                onDelete={() => {
                    dispatch(change(formName, 'maitreOuvrage', null))
                }}
                // suggestion={maitreOuvrage}
                // validate={[required]}
            />


            { maitreOuvrage && maitreOuvrage.value === constants.PROVINCE_TAOURIRT &&
                <Field
                    name="sourceFinancement"
                    component={SelectField}
                    label="Source de Financement"
                    options={[
                                {value: 1, label: 'B.G'}, {value: 2, label: 'INDH'},
                                {value: 3, label: 'FDR'}, {value: 4, label: 'INDH-FDR'}, , {value: 5, label: 'C.T'},
                            ]}
                    // validate={[required]}
                />
            }

            <Field name="isMaitreOuvrageDel" label="Ajouter un maître d'ouvrage délégué" component={ToggleField}
            />

            { isMaitreOuvrageDel &&
            <Field name="maitreOuvrageDel" label="Maître d'ouvrage délégué" component={AutoCompleteField}

                url='/get_acheteurs'
                // url='/acheteurs'
                onSelect={ (suggestion) => dispatch(change(formName, 'maitreOuvrageDel', suggestion)) }
                onDelete={ () => dispatch(change(formName, 'maitreOuvrageDel', null)) }
                // suggestion={maitreOuvrage}
                // validate={[required]}
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
                                    }
                                }
                        ))
                    }
                />
            </SimpleField>

            
            
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
                // validate={[required]}
            />

            </div>

            

            <div className="form-validation">
                <button type="submit" 
                    className={`btn btn-primary ${ submitting ? 'btn-submitting is-submitting ':'' }`}>
                    Submit { submitting ? '...':'' }
                </button>
            </div>

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
        partners: getExtPartners(state),
        localisations: getLocalisations(state),
        pointsFocaux: getPointsFocaux(state),
    }),
)(ProjetForm);


const mapItems = (items) => {

    console.log(`Mapping items -------------------------------------> !!!`)

    const mapProperties = ({ items, parentPath }) => {

        items.forEach(el => {

            if (parentPath) el.path = `${parentPath}.${el.value}`
            else el.path = `${el.value}`

            if (el.children)
                mapProperties({ items: el.children, parentPath: `${el.path}` })
        });

    }

    mapProperties({ items })
    return items
}

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


