import React from 'react'

export const SimpleListItem = ({item, onDelete, onEdit}) => (
    <div className="_item_ls" >
        { onDelete && <i className="fa fa-times delete-item-list" onClick={onDelete} /> }
        { onEdit && <i className="fa fa-edit edit-item-list" onClick={onEdit} /> }
        <span className="item-label">{item.label}</span>
    </div>
)

const SimpleList = ({ items, onDelete }) =>

    <div className="list-wr">
        {items.map((item, index) => 
            <SimpleListItem key={item.value} item={item} onDelete= { () => onDelete(index) } />
        )}
    </div>

export default SimpleList

