import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, initialize } from 'redux-form'

import useApi from '../hooks/useApi';

import { showModal } from '../../actions';
import { modalTypes } from '../modals/ModalRoot'
import { required, number, emptyArray } from './validator'
import { TextField, CheckboxField, RadioField, SelectField, SimpleField } from './form-fields/fields'
import { getExtPartners, getLocalisations } from '../../reducers/externalForms';
import { arrayDeleting } from '../../actions';
// import { formName as conventionFormName } from '../modals/Convention';

import './forms.css';


let ProjetForm = ({ handleSubmit, isConvention, partners, localisations, dispatch }) => {



    const data = [];
    // const { data, loading, error } = useApi({
    //     url: '/localisation/getCommunesWithFractions',
    //     method: 'GET',
    //     success: (data) => {
    //         // dispatch(showModal(modalTypes.ADD_LOCALISATION, { list: data }));
    //     }
    // })

    // console.log('useApi', data)


    useEffect(() => {
        dispatch(showModal(modalTypes.ADD_LOCALISATION, { nodes: data }));
    }, [data])

    const onSubmit = (formValues) => {
        console.log(formValues)
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <h1>PROJET FORMULAIRE</h1>

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
                options={[{ label: 'oui', value: true }, { label: 'non', value: false }]}
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
                            {/* <div className="form-label partner-label">partenaire {i + 1} :</div> */}
                            <div className="partner-info">

                                <i className="fa fa-times delete-item-list"
                                    onClick={() => dispatch(arrayDeleting('partners', i))}></i>

                                <i className="fa fa-edit edit-item-list fa-edit-partner"
                                    onClick={() => {
                                        dispatch(showModal(modalTypes.ADD_CONVENTION, {
                                            editMode: true, index: i, initialValues: partners[i]
                                        }))
                                        // dispatch(showModal(modalTypes.ADD_CONVENTION, { editMode: true, index: i }))
                                        // dispatch(initialize(conventionFormName, partners[i]))
                                    }}
                                />

                                <div className="partner-name">{i + 1}. {partner.label}</div>
                                <div className="partner-montant">{montant} DH</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Field
                name="secteur"
                component={SelectField}
                label="secteur"
                options={[{ label: 'santé', value: 1 }, { label: 'education', value: 2 }, { label: 'eau potable', value: 3 }]}
                validate={[required]}
            />

            {/* <Field
                name="communes"
                component={CheckboxField}
                label="communes"
                options={[{ label: 'taourirt', value: 1 }, { label: 'el aioun', value: 2 },
                { label: 'debdou', value: 3 }]}
                validate={[emptyArray]}
            /> */}

            <SimpleField label={'localisation'}>
                <input type="button" className="btn btn-info show-modal" value="ajouter une localisation"
                    onClick={() => dispatch(showModal(modalTypes.ADD_LOCALISATION, { nodes: data }))}
                />
            </SimpleField>

            <div className="localisations-wr">
            { localisations.map((path, i) => (
                <div className="localisation-item" key={path}>
                    {i} -> {path}
                </div>
            ))}
            </div>



            <button type="submit" className="btn btn-primary">Submit</button>

        </form>
    )

}


ProjetForm = reduxForm({
    form: 'projetForm'
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
        },
        isConvention: selector(state, 'isConvention'),
        partners: getExtPartners(state),
        localisations: getLocalisations(state),
    }),
)(ProjetForm);


