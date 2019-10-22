import React from 'react'

export const SimpleListItem = ({ item, onDelete, onEdit, icon }) => (

    <div className="_item_ls" >

        <span className="item-label">
            {icon}
            {item.label}
        </span>
        <span className="list-control">
            {onEdit && <i className="fa fa-edit edit-item-list" onClick={onEdit} />}
            {onDelete && <i className="fa fa-times delete-item-list" onClick={onDelete} />}
        </span>

    </div>

)

export const AttachLine = ({ label, onDelete, url, index, imageDisplay }) => {


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
export const AttachLineList = ({ attachments, ...props }) => {

    return attachments.map((attachName, i) => (
        <AttachLine
            key={i}
            index={i}
            label={attachName}
            { ...props }
        />
    ))

}


const SimpleList = ({ items, onDelete }) =>

    <div className="list-wr">
        {items.map((item, index) =>
            <SimpleListItem key={item.value} item={item} onDelete={() => onDelete(index)} />
        )}
    </div>

export default SimpleList

