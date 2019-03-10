import React from 'react';

import './selected.css';


const Selected = (props) => {

    const { label, value, editHandler, deleteHandler } = props;

    return (

        <div className="selected-container" onClick={ () => editHandler(value) } >
            <label htmlFor="">{label}</label>
            <span className="delete-selection" onClick={ () => deleteHandler(value) } ></span>
        </div>

    )
}

export default Selected;