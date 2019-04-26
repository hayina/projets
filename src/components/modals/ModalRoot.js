import React from 'react';
import { connect } from 'react-redux';

import Convention from './Convention';
import Localisation from './Localisation';
import CheckListModal from './CheckListModal';
import UserForm from '../users/UserForm';
import DeleteModal from './DeleteModal';
import SocieteForm from '../marches/SocieteForm';
import TauxForm from '../marches/TauxForm';
import OsForm from '../marches/OsForm';
import DecompteForm from '../marches/DecompteForm';


export const modalTypes = {
    ADD_CONVENTION: 'ADD_CONVENTION',
    ADD_LOCALISATION: 'ADD_LOCALISATION',
    ADD_CHECK_LIST_MODAL: 'ADD_CHECK_LIST_MODAL',
    ADD_USER: 'ADD_USER',
    ADD_DELETE: 'ADD_DELETE',
    ADD_STE: 'ADD_STE',
    ADD_TAUX: 'ADD_TAUX',
    ADD_OS: 'ADD_OS',
    ADD_DECOMPTE: 'ADD_DECOMPTE',
}

const MODAL_COMPONENTS = {
    [modalTypes.ADD_CONVENTION]: Convention,
    [modalTypes.ADD_LOCALISATION]: Localisation,
    [modalTypes.ADD_CHECK_LIST_MODAL]: CheckListModal,
    [modalTypes.ADD_USER]: UserForm,
    [modalTypes.ADD_DELETE]: DeleteModal,
    [modalTypes.ADD_STE]: SocieteForm,
    [modalTypes.ADD_TAUX]: TauxForm,
    [modalTypes.ADD_OS]: OsForm,
    [modalTypes.ADD_DECOMPTE]: DecompteForm,
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
