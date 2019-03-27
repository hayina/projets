import React from 'react'

const SimpleList = ({items, onDelete}) => 

    <div className="list-wr">
        {items.map((item, index) => 

            <div key={item.value} className="item-list-wr" >

                <i  
                    className="fa fa-times delete-item-list" 
                    onClick={ () => onDelete(index) }
                />
                <span className="item-label">{item.label}</span>


            </div>

        )}
    </div>

export default SimpleList

