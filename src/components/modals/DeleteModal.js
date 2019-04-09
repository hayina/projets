import React  from 'react'
import Modal from './Modal';


let DeleteModal = ({ dangerText, onDanger }) => {

    return (
        <Modal handleValidation={ () => onDanger() }>
            {dangerText}
        </Modal>
    )
}

export default DeleteModal