import React  from 'react'
import { connect } from 'react-redux';

import Modal from './Modal';
import { hideModal } from '../../actions';


let DeleteModal = ({ dangerText, onDanger, dispatch }) => {

    return (
        <Modal handleValidation={() => {
            onDanger();
            dispatch(hideModal());
        }}>
            {dangerText}
        </Modal>
    )
}

export default connect()(DeleteModal)