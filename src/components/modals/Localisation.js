import React, { useState } from 'react';
import { connect } from 'react-redux';
import { change} from 'redux-form';

import Modal from './Modal';
import { hideModal } from '../../actions';

import { CheckTree } from '../checkboxTree/CheckTree';
import { convertToSelectionByParent } from '../checkboxTree/helpers';


import {formName as projetForm } from '../forms/ProjetForm'


let Localisation = ({ dispatch, items, initialSelection=[] }) => {

    const [selection, setSelection] = useState(initialSelection)

    console.log('----> Localisation Rendering .........................')

    return (

        <Modal
            handleValidation={() => {
                dispatch(change(projetForm, 'localisations', convertToSelectionByParent(selection, items)))
                dispatch(hideModal())
            }}
            title="Choisir la localisation du projet"
        >

            <CheckTree 
                items={items} 
                setSelection={setSelection} 
                selection={selection} 
            />
        </Modal>
    )
}


export default connect(    
    // (state) => ({
    //     localisations: getLocalisations(state),
    // })
)(Localisation)


