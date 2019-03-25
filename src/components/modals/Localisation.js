import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import { arraySetting } from '../../actions';
import Modal from './Modal';
import { hideModal } from '../../actions';

import { CheckList } from '../checkboxTree/CheckList';
import { normalizeSelectionByParent } from '../checkboxTree/helpers';








let Localisation = ({ dispatch, items }) => {

    const [selection, setSelection] = useState([])

   

    return (

        <Modal
            handleValidation={() => {
                dispatch(
                    arraySetting('localisation', normalizeSelectionByParent(selection, items))
                )
 
                // nestedTree(selection, mappedItems)
                // dispatch(hideModal())
            }}
            title="Choisir la localisation du projet"
        >

            <CheckList 
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