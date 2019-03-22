import React from 'react';
import { connect } from 'react-redux';

import Convention from './Convention';
import Localisation from './Localisation';


export const modalTypes = {
    ADD_CONVENTION: 'ADD_CONVENTION',
    ADD_LOCALISATION: 'ADD_LOCALISATION',
}

const MODAL_COMPONENTS = {
    [modalTypes.ADD_CONVENTION]: Convention,
    [modalTypes.ADD_LOCALISATION]: Localisation,
}

const ModalRoot = ({ modalType, modalProps }) => {

    if (!modalType) {
        return null 
    }

    
    const SpecificModal = MODAL_COMPONENTS[modalType]
    return <SpecificModal {...modalProps} />
}

export default connect(
    state => state.modals
)(ModalRoot)
