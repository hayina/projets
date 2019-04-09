import React from 'react';
import { connect } from 'react-redux';

import Convention from './Convention';
import Localisation from './Localisation';
import CheckListModal from './CheckListModal';
import UserForm from '../users/UserForm';
import DeleteModal from './DeleteModal';


export const modalTypes = {
    ADD_CONVENTION: 'ADD_CONVENTION',
    ADD_LOCALISATION: 'ADD_LOCALISATION',
    ADD_CHECK_LIST_MODAL: 'ADD_CHECK_LIST_MODAL',
    ADD_USER: 'ADD_USER',
    ADD_DELETE: 'ADD_DELETE',
}

const MODAL_COMPONENTS = {
    [modalTypes.ADD_CONVENTION]: Convention,
    [modalTypes.ADD_LOCALISATION]: Localisation,
    [modalTypes.ADD_CHECK_LIST_MODAL]: CheckListModal,
    [modalTypes.ADD_USER]: UserForm,
    [modalTypes.ADD_DELETE]: DeleteModal,
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
