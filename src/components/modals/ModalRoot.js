import React from 'react';
import { connect } from 'react-redux';

import Convention from './Convention';


export const modalTypes = {
    ADD_CONVENTION: 'ADD_CONVENTION',
}

const MODAL_COMPONENTS = {
    [modalTypes.ADD_CONVENTION]: Convention,
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
