import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, initialize, change } from 'redux-form'

import useApi from '../hooks/useApi';

import { showModal, arraySetting } from '../../actions';
import { modalTypes } from '../modals/ModalRoot'
import { required, number, emptyArray } from './validator'
import { TextField, RadioField, SelectField, SimpleField, 
    AutoCompleteField, ToggleField } from './form-fields/fields'
import { getExtPartners, getLocalisations, getPointsFocaux } from '../../reducers/externalForms';
import { arrayDeletingByIndex, arrayDeletingByPath } from '../../actions';
import { nestedTree, convertToSelectionByLeafs } from '../checkboxTree/helpers';
import { NestedTree } from '../checkboxTree/CheckTree';
import CheckListModal from '../modals/CheckListModal';
// import { formName as conventionFormName } from '../modals/Convention';

import './forms.css';
import SimpleList from './SimpleList';



const formName = 'projetForm'

let ProjetForm = ({ handleSubmit, isConvention, partners, localisations, pointsFocaux, isMaitreOuvrageDel, dispatch }) => {



    const data = [];
    // const { data, loading, error } = useApi({
    //     url: '/localisation/getCommunesWithFractions',
    //     method: 'GET',
    //     success: (data) => {
    //         // dispatch(showModal(modalTypes.ADD_LOCALISATION, { list: data }));
    //     }
    // })

    // console.log('useApi', data)


    // useEffect(() => {
    //     dispatch(showModal(modalTypes.ADD_LOCALISATION, { items }));
    // }, [data])

    const onSubmit = (formValues) => {
        console.log(formValues)
    }



    return (
        <form id={formName} className="form-wr" onSubmit={handleSubmit(onSubmit)}>

            <div className="form-title">PROJET FORMULAIRE</div>

            <div className="form-content">
            <Field
                name="intitule"
                component={TextField}
                label="intitulé"
                fieldType="textarea"
                validate={[required]}
            />

            <Field
                name="montant"
                component={TextField}
                label="montant"
                fieldType="input"
                validate={[required, number]}
            />


            <Field
                name="isConvention"
                component={RadioField}
                label="conventionné"
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
                        <div className="partner-item" key={partner.id}>

                            <i className="fa fa-times delete-item-list"
                                onClick={() => dispatch(arrayDeletingByIndex('partners', i))}></i>

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
                            <div className="partner-montant">{montant} DH</div>

                        </div>
                    ))}
                </div>
            )}

            

            <SimpleField label={'localisation'}>
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
                    {/* { localisations.map(el => <div>{el}</div>) } */}
            <div className="localisations-wr tree-wr">
                <NestedTree 
                    items={ nestedTree(localisations, localisationItems) }
                    onDelete= { (path) => dispatch(arrayDeletingByPath('localisation', path)) }
                /> 
            </div>


            <Field name="maitreOuvrage" label="maître d'ouvrage" component={AutoCompleteField}

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

            <Field name="isMaitreOuvrageDel" label="ajouter un maître d'ouvrage délégué" component={ToggleField}
            />

            { isMaitreOuvrageDel &&
            <Field name="maitreOuvrageDel" label="maître d'ouvrage délégué" component={AutoCompleteField}

                url='/get_acheteurs'
                onSelect={(suggestion) => {
                    dispatch(change(formName, 'maitreOuvrageDel', suggestion));
                }}
                onDelete={() => {
                    dispatch(change(formName, 'maitreOuvrageDel', null))
                }}
                // suggestion={maitreOuvrage}
                // validate={[required]}
            />
            }



            {/* /////////////// Chargé du Suivi */}

            <SimpleField label={'Chargé du Suivi'}>
                <input type="button" className="btn btn-info show-modal" 
                    value={ pointsFocaux.length > 0 ? `Editer` : `Choisir`}
                    style={{ float: 'right' }}
                    onClick={
                        () => {
                            dispatch(showModal(modalTypes.ADD_CHECK_LIST_MODAL, 
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
                    }
                />
            </SimpleField>

            
            
            <SimpleList
                items={ pointsFocaux }
                onDelete= { (index) => dispatch(arrayDeletingByIndex('pointsFocaux', index)) }
            /> 
     

            {/* /////////////// secteur */}

            <Field
                name="secteur"
                component={SelectField}
                label="secteur"
                options={[{ label: 'santé', value: 1 }, { label: 'education', value: 2 }, { label: 'eau potable', value: 3 }]}
                validate={[required]}
            />

            </div>

            <div className="form-validation">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>

        </form>
    )

}


ProjetForm = reduxForm({
    form: formName
})(ProjetForm)

const selector = formValueSelector('projetForm');

export default connect(
    (state) => ({
        initialValues: {
            intitule: 'YOUSSEF PROJET',
            montant: 300000,
            secteur: 1,
            isConvention: true,
            communes: [2, 3],
            partners: [],
            isMaitreOuvrageDel: false,
        },
        isConvention: selector(state, 'isConvention'),
        isMaitreOuvrageDel: selector(state, 'isMaitreOuvrageDel'),
        // maitreOuvrage: selector(state, 'maitreOuvrage'),
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
    { value: 1, label: 'DAS', },
    { value: 2, label: 'DBM', },
    { value: 3, label: 'DE', },
    { value: 4, label: 'DAR', },
    { value: 5, label: 'CAB', },
    { value: 6, label: 'DAEC', },
]


let localisationItems = [
    {
        value: 1, label: 'Big cats',
        children: [
            { value: 1, label: 'Lion' },
            { value: 2, label: 'Leopard' },
            { value: 3, label: 'Guepard' },
        ]
    },
    {
        value: 2, label: 'Requins',
        children: [
            { value: 1, label: 'Great white shark' },
            { value: 2, label: 'Tiger shark' },
            { value: 3, label: 'Requin Marteau' },
            {
                value: 4, label: 'Chiens',
                children: [
                    { value: 1, label: 'Berger' },
                    { value: 2, label: 'Dobermann' },
                    { value: 3, label: 'Chiwawa' },
                    {
                        value: 4, label: 'Aigles',
                        children: [
                            { value: 1, label: 'Serf' },
                            { value: 2, label: 'Flaman Rose' },
                            { value: 3, label: 'Hiboux' },
                        ]
                    },
                ]
            },
        ]
    },
    {
        value: 3, label: 'Oiseaux',
        children: [
            { value: 1, label: 'Peroquet' },
            { value: 2, label: 'Moinaux' },
            { value: 3, label: 'Phenyx' },
        ]
    },
    {
        value: 4, label: 'Requins',
        children: [
            { value: 1, label: 'Great white shark' },
            { value: 2, label: 'Tiger shark' },
            { value: 3, label: 'Requin Marteau' },
            {
                value: 4, label: 'Chiens',
                children: [
                    { value: 1, label: 'Berger' },
                    { value: 2, label: 'Dobermann' },
                    { value: 3, label: 'Chiwawa' },
                    {
                        value: 4, label: 'Aigles',
                        children: [
                            { value: 1, label: 'Serf' },
                            { value: 2, label: 'Flaman Rose' },
                            { value: 3, label: 'Hiboux' },
                        ]
                    },
                ]
            },
        ]
    },
]


localisationItems = mapItems(localisationItems)

