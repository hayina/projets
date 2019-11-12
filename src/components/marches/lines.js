import React, { useState } from 'react';
import { connect } from 'react-redux';
import { arrayRemove, arrayPush, change } from 'redux-form'

import { SimpleField, SpecialLine, LineAddButton } from '../forms/form-fields/fields';
import AutoComplete from '../forms/form-fields/autocomplete/AutoComplete';
import { SimpleListItem, AttachLineList } from '../forms/SimpleList';
import { showModal } from '../../actions';
import { modalTypes } from '../modals/ModalRoot';

import { marcheFormName } from './MarcheForm'
import { formatDate, getOsImgLink, getDecImgLink, getAttachLink } from '../../helpers';
import DropDown from '../helpers/DropDown2';
import { ATTACH_TYPE, TYPE_OS } from '../../types';
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

const TauxLine = ({ input, meta }) => {

    let taux = input.value || []

    const items = taux.map(({ valueTaux, dateTaux }, index) => ({
            textLine: `${formatDate(new Date(dateTaux))} : ${valueTaux}%`,
            lineDate: dateTaux,
            index
    }))

    return (
        <GenericLine { ...{ items, label: "Taux d'avancement", originalArray: taux, fieldName: input.name, 
                modalName: modalTypes.ADD_TAUX, meta } } 
        />
    )
}






///////////////// ORDRE SERVICE

const OrdreServiceLine = ({ label, osTypes, idMarche, input, meta }) => {

    // console.log("osTypes --------->", osTypes)
    // console.log(input.name, "meta --------->", meta.error)


    let os = input.value || []
    const modalProps = { osTypes, fieldName: input.name }

    let items = os.map(({ typeOs, dateOs, attachments = [], resources = [] }, index) => ({
            textLine: `${ formatDate(new Date(dateOs)) } : ${typeOs.label}`,
            lineDate: dateOs,
            resources, attachments, index,
    }))

    let showBtn = true
    let newInitialValues = {}
    if(input.name === "osStart") {
        showBtn = os.length < 1
        if(osTypes[0]) {
            newInitialValues.typeOs = osTypes[0].value
        }
    }

    // console.log("meta", meta)

    return (
        <GenericLine { ...{ 
            label, items, 
            editInitialValues: (i) => ({ ...os[i], typeOs: os[i].typeOs.value }), 
            newInitialValues, 
            fieldName: input.name, 
            attachType: ATTACH_TYPE.OS, isAttach: true, 
            modalName: modalTypes.ADD_OS, modalProps, idMarche, meta, showBtn
        }} />
    )
}




///////////////// DECOMPTES

const DecompteLine = ({ idMarche, input, meta }) => {

    let decomptes = input.value || []

    const items = decomptes.map(({ montant, dateDec, attachments = [], resources = [] }, index) => ({
                            textLine: `${formatDate(new Date(dateDec))} : ${Number(montant).toLocaleString()} DH`,
                            lineDate: dateDec,
                            resources, attachments, index
                    }))

    return (
        <GenericLine { ...{ items, originalArray: decomptes, label: "Décomptes", attachType: ATTACH_TYPE.DEC, 
                fieldName: input.name, modalName: modalTypes.ADD_DECOMPTE, idMarche, isAttach: true, meta } } 
        />
    )

}




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


///


let GenericLine = ({ 
    dispatch, items=[], originalArray, label, modalName, attachType, fieldName, modalProps={}, 
    idMarche, isAttach=false, showBtn=true, meta, editInitialValues, newInitialValues
}) => {

    items.sort((a, b) => new Date(a.lineDate) - new Date(b.lineDate))



    return (
        <>
            <LineAddButton label={label} 
                callback={() => dispatch(showModal(modalName, { ...modalProps, initialValues: newInitialValues }))} 
                showBtn={showBtn} 
            />
            {
                items &&
                <div className="form-group">
                    {
                        items.map(({ textLine, lineDate, attachments, resources, index }) => 
                        <SpecialLine className="form-sp-line" key={index}>
                            <SimpleListItem item={{ label: textLine }}
                                onDelete={() => dispatch(arrayRemove(marcheFormName, fieldName, index))}
                                onEdit={() => {
                
                                    dispatch(showModal(modalName, {
                                        ...modalProps,
                                        editMode: true, 
                                        index,
                                        initialValues: editInitialValues ? editInitialValues(index) : originalArray[index],
                                        idMarche
                                    }))
                                }}
                            />
                
                            { isAttach &&
                                <AttachGroup
                                    attachProps= {{ attachments: attachments.map(attach => attach.name) }}
                                    resourcesProps= {{ attachments: resources, imageDisplay: true, url: true }}
                                    attachType= { attachType }
                                    idMarche= { idMarche }
                                    dateRes= { lineDate }
                                />
                            }
                
                        </SpecialLine>
                        )
                    }
                </div>
            }

            { meta && meta.error && <div className="error-feedback">{meta.error}</div> }
        </>
    )
}
GenericLine = connect()(GenericLine)




//////// EXPORT

export { SocieteLine, TauxLine, OrdreServiceLine, DecompteLine, UploadLine }
