import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import { arraySetting } from '../../actions';
import Modal from './Modal';
import { hideModal } from '../../actions';

import { CheckTree } from '../checkboxTree/CheckTree';
import { convertToSelectionByParent } from '../checkboxTree/helpers';





let Localisation = ({ dispatch, items, initialSelection=[] }) => {

    const [selection, setSelection] = useState(initialSelection)

    console.log('----> Localisation Rendering .........................')

    return (

        <Modal
            handleValidation={() => {
                dispatch(
                    arraySetting('localisations', convertToSelectionByParent(selection, items))
                )
 
                // nestedTree(selection, mappedItems)
                // dispatch(hideModal())
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


