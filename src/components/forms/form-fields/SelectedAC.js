import React from 'react';

import './selected.css';


const SelectedAC = ({ suggestion, onDelete }) => {

    return (
        <div className="selected-container">
            <span className="label-selection">{suggestion.label}</span>
            <i className="fa fa-times delete-selection" onClick={ () => onDelete() }></i>
        </div>
    )
}

export default SelectedAC;