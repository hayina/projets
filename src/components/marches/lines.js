import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { change, arrayRemove, arrayPush } from 'redux-form'

import { SimpleField } from '../forms/form-fields/fields';
import AutoComplete from '../forms/form-fields/autocomplete/AutoComplete';
import { SimpleListItem } from '../forms/SimpleList';
import { showModal } from '../../actions';
import { modalTypes } from '../modals/ModalRoot';

import { marcheFormName } from './MarcheForm'
import { formatDate } from '../../helpers';
import useAjaxFetch from '../hooks/useAjaxFetch';


///////////////// SOCIETE

let SocieteLine = ({ label, input, meta, dispatch }) => {

    const [steGroups, setSteGroups] = useState(false);

    let societies = input.value || []

    return (
        <SimpleField label="Société Titulaire" meta={meta} >


            { 
                societies.map((ste, i) => (
                    <SimpleListItem item={ste} key={ste.value}
                        onDelete={ () => {
                            dispatch(arrayRemove(marcheFormName, `societes`, i)) 
                        }}
                    />
                ))
            }
            {
                ( societies.length === 0 || steGroups ) &&
                <AutoComplete url={`/societes`} 
                    onSelect={ (suggestion) => {
                        dispatch(arrayPush(marcheFormName, 'societes', suggestion))
                        setSteGroups(false)
                    }}
                /> 
            }

            <input type="button" className={`btn btn-info show-modal`} 
                value={`Nouvelle Société`} onClick={() => dispatch(showModal(modalTypes.ADD_STE, {}))} />

            {   societies.length > 0 &&
                <span className="add-ste l_ho" onClick={ () => setSteGroups(true) }>
                    ajouter regroupement
                </span>
            }

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
                            <SimpleListItem item={{ label: `${formatDate(new Date(dateTaux))} : ${valueTaux}%` }} 
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

let OrdreServiceLine = ({ osTypes, dispatch, input, meta : { touched, error } }) => {

    let os = input.value || []

    
    // console.log(osTypes)

    const modalProps = { osTypes }

    return (
        <React.Fragment>
            <SimpleField label="Ordres de service">
                <input type="button" className="btn btn-info show-modal" 
                    value={ `Ajouter`}
                    style={{ float: 'right' }}
                    onClick={ () => dispatch(showModal(modalTypes.ADD_OS, { ...modalProps })) }
                />
            </SimpleField>

            {   
                os && 
                <div className="form-group">
                    {   
                        os.map(({ typeOs, dateOs, commentaire }, i) => (
                        <div className="partner-item" key={i}>
                            <SimpleListItem item={{ label: `${formatDate(new Date(dateOs))} : [${ typeOs.label }]` }} 
                                onDelete={ () => dispatch(arrayRemove(marcheFormName, 'os', i)) } 
                                onEdit={() => {

                                    dispatch(showModal(modalTypes.ADD_OS, {
                                        ...modalProps,
                                        editMode: true, 
                                        index: i, 
                                        initialValues: { ...os[i], typeOs: typeOs.value }, 
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


///////////////// DECOMPTES

let DecompteLine = ({ dispatch, input, meta : { touched, error } }) => {

    let decomptes = input.value ? input.value:[]

    return (
        <React.Fragment>
            <SimpleField label="Décomptes">
                <input type="button" className="btn btn-info show-modal" 
                    value={ `Ajouter`}
                    style={{ float: 'right' }}
                    onClick={
                        () => {
                            dispatch(showModal(modalTypes.ADD_DECOMPTE, {}
                            ))
                        }
                    }
                />
            </SimpleField>

            {   
                decomptes && 
                <div className="form-group">
                    {   
                        decomptes.map(({ montant, dateDec, commentaire }, i) => (
                        <div className="partner-item" key={i}>
                            <SimpleListItem item={{ label: `${formatDate(new Date(dateDec))} : ${Number(montant).toLocaleString()} DH` }} 
                                onDelete={ () => dispatch(arrayRemove(marcheFormName, 'decomptes', i)) } 
                                onEdit={() => {

                                    dispatch(showModal(modalTypes.ADD_DECOMPTE, {
                                        editMode: true, index: i, 
                                        initialValues: decomptes[i], 
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

DecompteLine = connect()(DecompteLine)

//////// EXPORT

export { SocieteLine, TauxLine, OrdreServiceLine, DecompteLine }
