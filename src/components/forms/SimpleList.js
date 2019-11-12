import React from 'react'

export const SimpleListItem = ({ item, onDelete, onEdit, icon, index }) => (

    <div className="_item_ls" item={index}>

        <span className="item-label">
            {icon}
            {item.label}
        </span>
        <span className="list-control">
            {   onEdit    && <i className="fa fa-edit edit-item-list"       onClick={onEdit}    />  }
            {   onDelete  && <i className="fa fa-times delete-item-list"    onClick={onDelete}  />  }
        </span>

    </div>

)



const SimpleList = ({ items, onDelete }) =>

    <div className="list-wr">
        {items.map((item, index) =>
            <SimpleListItem key={item.value} item={item} onDelete={() => onDelete(index)} />
        )}
    </div>

export default SimpleList

