import React from 'react';
import { connect } from 'react-redux';
import { arrayRemove } from 'redux-form'

import { LineRadio } from './form-fields/fields';
import { showModal } from '../../actions';
import { modalTypes } from '../modals/ModalRoot';
import { SimpleListItem } from './SimpleList';

import {formName as projetForm } from './ProjetForm'

const PartnerLine = ({ dispatch, isConvention, partners }) => {

    let partnersValues = partners.input.value ? partners.input.value : []

    console.log(partners.meta.touched ? true:false)
    console.log(partners.meta.error)

    return (
        <React.Fragment>
            <LineRadio                 
                label="Conventionné"
                btnText="Ajouter un partenaire"
                btnOnClick={() => dispatch(showModal(modalTypes.ADD_CONVENTION, { 
                    editMode: false, 
                    partners: partnersValues
                }))}
                input={ isConvention.input }
            />
            {   
                isConvention.input.value && partnersValues && 
                <div className="form-group">
                    {   
                        partnersValues.map(({ partner, montant, srcFinancement }, i) => (
                        <div className="partner-item" key={partner.value}>
                            <SimpleListItem item={partner} 
                                onDelete={ () => dispatch(arrayRemove(projetForm, 'partners', i)) } 
                                // onDelete={ () => dispatch(arrayDeletingByIndex('partners', i)) } 
                                onEdit={() => {

                                    dispatch(showModal(modalTypes.ADD_CONVENTION, {
                                        editMode: true, index: i, 
                                        initialValues: partnersValues[i], 
                                        partners: partnersValues
                                    }))
                                }}
                            />
                            <div className="partner-montant">{Number(montant).toLocaleString()} DH</div>
                            <div className="partner-srcFi">{ srcFinancement && srcFinancement.label }</div>
                        </div>
                    ))}
                </div>
            }

            { 
                partners.meta.touched && partners.meta.error && 
                <div className="error-feedback">{ partners.meta.error }</div> 
            }
        </React.Fragment>
    )
}

export default connect()(PartnerLine)