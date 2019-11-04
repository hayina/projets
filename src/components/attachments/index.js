import React from 'react'
import { connect } from 'react-redux';
import { arrayRemove } from 'redux-form'
import { getAttachLink } from '../../helpers';
import { showModal } from '../../actions';
import { modalTypes } from '../modals/ModalRoot';


let AttachGroup = ({ attachProps, resourcesProps, formName, attachType, idMarche, dateRes, dispatch }) => {


    const { onDelete: onDeleteAttach, ...otherAttachProps } = attachProps

    // const { onDelete: onDeleteRes, imageDisplay, url, ...otherResProps } = resourcesProps

    // console.log(attachProps)
    // console.log(resourcesProps)
    
    return (otherAttachProps.attachments.length > 0 || resourcesProps.attachments.length > 0) &&
    (
        <div className="attach-grp-wrp">
            <AttachLineList 
                { ...(onDeleteAttach && {onDelete: (i) => dispatch(arrayRemove(formName, 'attachments', i))}) }
                { ...otherAttachProps } 
            />

            <ResourcesLine resourcesProps={resourcesProps} { ...{ formName, attachType, idMarche, dateRes } } />
        </div>
    )
}
AttachGroup = connect()(AttachGroup)

let ResourcesLine = ({ resourcesProps, formName, attachType, idMarche, dateRes, dispatch }) => {

    const { onDelete: onDeleteRes, imageDisplay, url, ...otherResProps } = resourcesProps

    return otherResProps.attachments.length > 0 &&
    (
        <AttachLineList 
            { ...(onDeleteRes && {onDelete: (i) => dispatch(arrayRemove(formName, 'resources', i))}) }
            { ...(url && {url: (label) => getAttachLink({ idMarche, date: new Date(dateRes), label, attachType })}) }
            { ...(imageDisplay && {imageDisplay: (label, url) => 
                                        dispatch(showModal(modalTypes.DISPLAY_PICTURE, { label, url }))}) }
            { ...otherResProps } 
        />
    )
}
ResourcesLine = connect()(ResourcesLine)



const AttachLine = ({ label, onDelete, url, index, imageDisplay }) => {


    if(url) url = url(label)

    // console.log(url)

    return (

    <div className="attach-line" >
        <span className="item-label-wrp">
            <i className="fas fa-paperclip"></i>
            { url ?
                <a href={`${ url }`} className="attach-link item-label" download>{label}</a>
                :
                <span className="item-label">{label}</span>
            }
        </span>
        {/* {   onDelete &&  */}
            <span className="list-control">
                { onDelete && <i className="fa fa-times delete-item-list" onClick={ () => onDelete(index) } /> }
                { imageDisplay && label.startsWith('IMG-') &&
                
                    <i 
                        className="fa fa-image display-img-attach" 
                        onClick={ () => imageDisplay(label, url) } 
                    /> 
                }
            </span>
        {/* } */}

        {/* <img src={`${baseLink}?n=${label}`} alt={label} /> */}
    </div>

    )
}
const AttachLineList = ({ attachments, ...props }) => {

    return attachments.map((attachName, i) => (
        <AttachLine
            key={i}
            index={i}
            label={attachName}
            { ...props }
        />
    ))

}


export { AttachLineList, AttachLine, AttachGroup, ResourcesLine }
