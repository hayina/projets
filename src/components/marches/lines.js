import React, { useState } from 'react';
import { connect } from 'react-redux';
import { arrayRemove, arrayPush, change } from 'redux-form'

import { SimpleField, SpecialLine } from '../forms/form-fields/fields';
import AutoComplete from '../forms/form-fields/autocomplete/AutoComplete';
import { SimpleListItem, AttachLineList } from '../forms/SimpleList';
import { showModal } from '../../actions';
import { modalTypes } from '../modals/ModalRoot';

import { marcheFormName } from './MarcheForm'
import { formatDate, getOsImgLink, getDecImgLink, getAttachLink } from '../../helpers';
import DropDown from '../helpers/DropDown2';
import { ATTACH_TYPE } from '../../types';
import { AttachGroup } from '../attachments';


///////////////// SOCIETE

let SocieteLine = ({ input, meta, dispatch }) => {

    const [steAC, setSteAC] = useState(false);

    let societies = input.value || []



    return (
        <SimpleField label="Société Titulaire" meta={meta}>


            {
                societies.map((ste, i) => (
                    <SpecialLine key={ste.value} className="ste-item">
                        <SimpleListItem item={ste}
                            onDelete={() => dispatch(arrayRemove(marcheFormName, `societes`, i))}
                            onEdit={() => {
                                dispatch(showModal(modalTypes.ADD_STE, { editMode: true, index: i, idSte: ste.value }))
                            }}
                        />
                    </SpecialLine>
                ))
            }
            {
                (societies.length === 0 || steAC) &&
                <div className="ste-inp-wr">
                    <DropDown
                        links={[{ label: 'Créer nouvelle société', callback: () => dispatch(showModal(modalTypes.ADD_STE, {})) }]}
                    />
                    <AutoComplete url={`/societes`}
                        onSelect={(suggestion) => {
                            dispatch(arrayPush(marcheFormName, 'societes', suggestion))
                            setSteAC(false)
                        }}
                        className="ste-input"
                    />


                </div>
            }

            {societies.length > 0 && !steAC &&
                <span className="add-ste l_ho" onClick={() => setSteAC(true)}>
                    ajouter groupement
                </span>
            }



        </SimpleField>
    )
}

SocieteLine = connect()(SocieteLine);


///////////////// TAUX AVANCEMENT

let TauxLine = ({ dispatch, input, meta: { touched, error } }) => {

    let taux = input.value || []


    taux.sort((a, b) => new Date(a.dateTaux) - new Date(b.dateTaux))
    // console.log(taux)

    return (
        <React.Fragment>
            <SimpleField label="Taux d'avancement">
                <input type="button" className="btn btn-info show-modal"
                    value={`Ajouter`}
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
                            <SpecialLine className="form-sp-line" key={i}>
                                <SimpleListItem item={{ label: `${formatDate(new Date(dateTaux))} : ${valueTaux}%` }}
                                    onDelete={() => dispatch(arrayRemove(marcheFormName, 'taux', i))}
                                    onEdit={() => {

                                        dispatch(showModal(modalTypes.ADD_TAUX, {
                                            editMode: true, index: i,
                                            initialValues: taux[i],
                                            // partners: partnersValues
                                        }))
                                    }}
                                />

                                <div className="taux-com">{commentaire}</div>
                            </SpecialLine>
                        ))}
                </div>
            }

            {touched && error && <div className="error-feedback">{error}</div>}

        </React.Fragment>
    )
}

TauxLine = connect()(TauxLine)




///////////////// ORDRE SERVICE

let OrdreServiceLine = ({ osTypes, idMarche, dispatch, input, meta: { touched, error } }) => {

    let os = input.value || []


    os.sort((a, b) => new Date(a.dateOs) - new Date(b.dateOs))

    // console.log(os)

    const modalProps = { osTypes }

    return (
        <React.Fragment>
            <SimpleField label="Ordres de service">
                <input type="button" className="btn btn-info show-modal"
                    value={`Ajouter`}
                    style={{ float: 'right' }}
                    onClick={() => dispatch(showModal(modalTypes.ADD_OS, { ...modalProps }))}
                />
            </SimpleField>

            {
                os &&
                <div className="form-group">
                    {
                        os.map(({ typeOs, dateOs, commentaire, attachments = [], resources = [] }, i) => (
                            <SpecialLine className="form-sp-line" key={i}>

                                <SimpleListItem
                                    item={{
                                        // label: [
                                        //     `${dateOs} ${formatDate(new Date(dateOs))} : `, 
                                        //     <i className={`far fa-${ typeOs.value === TYPE_OS.ARRET ? 'pause' : 'play' }-circle`}></i>, 
                                        //     ` [${ typeOs.label }]`
                                        // ]
                                        label: `${formatDate(new Date(dateOs))} : [${typeOs.label}]`
                                    }}
                                    onDelete={() => dispatch(arrayRemove(marcheFormName, 'os', i))}
                                    onEdit={() => {

                                        dispatch(showModal(modalTypes.ADD_OS, {
                                            ...modalProps,
                                            editMode: true,
                                            index: i,
                                            initialValues: { ...os[i], typeOs: typeOs.value },
                                            idMarche
                                        }))
                                    }}
                                // icon={<i className="fas fa-pause-circle"></i>}
                                />


                                <AttachGroup
                                    attachProps= {{ attachments: attachments.map(attach => attach.name) }}
                                    resourcesProps= {{ attachments: resources, imageDisplay: true, url: true }}
                                    attachType= { ATTACH_TYPE.OS }
                                    idMarche= { idMarche }
                                    dateRes= { dateOs }
                                />


                                <div className="taux-com sub-form-com">{commentaire}</div>
                            </SpecialLine>
                        ))
                    }
                </div>
            }

            {touched && error && <div className="error-feedback">{error}</div>}

        </React.Fragment>
    )
}

OrdreServiceLine = connect()(OrdreServiceLine)


///////////////// DECOMPTES

let DecompteLine = ({ dispatch, idMarche, input, meta: { touched, error } }) => {

    let decomptes = input.value || []

    decomptes.sort((a, b) => new Date(a.dateDec) - new Date(b.dateDec))

    return (
        <React.Fragment>
            <SimpleField label="Décomptes">
                <input type="button" className="btn btn-info show-modal"
                    value={`Ajouter`}
                    style={{ float: 'right' }}
                    onClick={() => { dispatch(showModal(modalTypes.ADD_DECOMPTE, {})) }}
                />
            </SimpleField>

            {
                decomptes &&
                <div className="form-group">
                    {
                        decomptes.map(({ montant, dateDec, commentaire, attachments = [], resources = [] }, i) => (
                            <SpecialLine className="form-sp-line" key={i}>
                                <SimpleListItem item={{ label: `${formatDate(new Date(dateDec))} : ${Number(montant).toLocaleString()} DH` }}
                                    onDelete={() => dispatch(arrayRemove(marcheFormName, 'decomptes', i))}
                                    onEdit={() => {

                                        dispatch(showModal(modalTypes.ADD_DECOMPTE, {
                                            editMode: true, index: i,
                                            initialValues: decomptes[i],
                                            // partners: partnersValues
                                            idMarche
                                        }))
                                    }}
                                />

                                <AttachGroup
                                    attachProps= {{ attachments: attachments.map(attach => attach.name) }}
                                    resourcesProps= {{ attachments: resources, imageDisplay: true, url: true }}
                                    attachType= { ATTACH_TYPE.DEC }
                                    idMarche= { idMarche }
                                    dateRes= { dateDec }
                                />

                                <div className="taux-com">{commentaire}</div>
                            </SpecialLine>
                        ))}
                </div>
            }

            {touched && error && <div className="error-feedback">{error}</div>}

        </React.Fragment>
    )
}

DecompteLine = connect()(DecompteLine)



///////////// OS FORM UPLOAD LINE

let UploadLine = ({ resources, attachments, dispatch, formName }) => {


    const attachmentsVals = attachments.input.value || []
    const resourcesVals = resources.input.value || []

    return (
        <>
            <SimpleField label="Pièces jointes" >
                <input
                    type="file"
                    multiple={true}
                    onChange={(e) => dispatch(change(formName, 'attachments', [...attachmentsVals, ...e.target.files]))}
                />
            </SimpleField>

            <AttachGroup
                attachProps     = {{ attachments: attachmentsVals.map(attach => attach.name), onDelete: true }}
                resourcesProps  = {{ attachments: resourcesVals, onDelete: true }}
                formName        = { formName }
            />
        </>
    )
}

UploadLine = connect()(UploadLine)




//////// EXPORT

export { SocieteLine, TauxLine, OrdreServiceLine, DecompteLine, UploadLine }
