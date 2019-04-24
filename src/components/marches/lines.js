import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { change, arrayRemove } from 'redux-form'

import { SimpleField } from '../forms/form-fields/fields';
import AutoComplete from '../forms/form-fields/autocomplete/AutoComplete';
import { SimpleListItem } from '../forms/SimpleList';
import { showModal } from '../../actions';
import { modalTypes } from '../modals/ModalRoot';

import { marcheFormName } from './MarcheForm'
import { formatDate } from '../../helpers';


///////////////// SOCIETE

let SocieteLine = ({ label, input, meta, dispatch }) => {

    return (
        <SimpleField label="Société Titulaire" meta={meta} >

            { input.value ?
                <SimpleListItem item={input.value} 
                    onDelete={ () => dispatch(change(marcheFormName, 'societe', null)) }
                />
                :
                <AutoComplete url={`/societes`} 
                    onSelect={ (suggestion) => dispatch(change(marcheFormName, 'societe', suggestion)) }
                /> 
            }

            <input type="button" className={`btn btn-info show-modal`} 
                value={`Nouvelle Société`} onClick={() => dispatch(showModal(modalTypes.ADD_STE, {}))} />

        </SimpleField>
    )
}

SocieteLine = connect()(SocieteLine);
 

///////////////// TAUX AVANCEMENT

let TauxLine = ({ dispatch, input, meta : { touched, error } }) => {

    let taux = input.value ? input.value:[]

    return (
        <React.Fragment>
            <SimpleField label="Taux d'avancement">
                <input type="button" className="btn btn-info show-modal" 
                    value={ `Ajouter`}
                    style={{ float: 'right' }}
                    onClick={
                        () => {
                            dispatch(showModal(modalTypes.ADD_TAUX, {}
                            ))
                        }
                    }
                />
            </SimpleField>

            {   
                taux && 
                <div className="form-group">
                    {   
                        taux.map(({ valueTaux, dateTaux, commentaire }, i) => (
                        <div className="partner-item" key={i}>
                            <SimpleListItem item={{ label: `${valueTaux}% : ${formatDate(dateTaux)}` }} 
                                onDelete={ () => dispatch(arrayRemove(marcheFormName, 'taux', i)) } 
                                onEdit={() => {

                                    dispatch(showModal(modalTypes.ADD_TAUX, {
                                        editMode: true, index: i, 
                                        initialValues: taux[i], 
                                        // partners: partnersValues
                                    }))
                                }}
                            />
                            <div className="taux-com">{ commentaire }</div>
                        </div>
                    ))}
                </div>
            }

            { touched && error &&  <div className="error-feedback">{ error }</div> }

        </React.Fragment>
    )
}

TauxLine = connect()(TauxLine)




///////////////// ORDRE SERVICE

let OrdreServiceLine = ({ dispatch, input, meta : { touched, error } }) => {

    let os = input.value ? input.value:[]

    return (
        <React.Fragment>
            <SimpleField label="Ordres de service">
                <input type="button" className="btn btn-info show-modal" 
                    value={ `Ajouter`}
                    style={{ float: 'right' }}
                    onClick={
                        () => {
                            dispatch(showModal(modalTypes.ADD_OS, {}
                            ))
                        }
                    }
                />
            </SimpleField>

            {   
                os && 
                <div className="form-group">
                    {   
                        os.map(({ typeOs, dateOs, commentaire }, i) => (
                        <div className="partner-item" key={i}>
                            <SimpleListItem item={{ label: `${formatDate(dateOs)} : [${ typeOs ===1 ? 'Reprise' : 'Arrêt'  }]` }} 
                                onDelete={ () => dispatch(arrayRemove(marcheFormName, 'os', i)) } 
                                onEdit={() => {

                                    dispatch(showModal(modalTypes.ADD_OS, {
                                        editMode: true, index: i, 
                                        initialValues: os[i], 
                                        // partners: partnersValues
                                    }))
                                }}
                            />
                            <div className="taux-com">{ commentaire }</div>
                        </div>
                    ))}
                </div>
            }

            { touched && error &&  <div className="error-feedback">{ error }</div> }

        </React.Fragment>
    )
}

OrdreServiceLine = connect()(OrdreServiceLine)

//////// EXPORT

export { SocieteLine, TauxLine, OrdreServiceLine }
