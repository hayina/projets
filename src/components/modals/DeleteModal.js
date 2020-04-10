import React  from 'react'

import Modal from './Modal';


const DeleteModal = ({ dangerText, onDanger , ...otherProps }) => (
        <Modal handleValidation={onDanger} { ...otherProps }>
            { dangerText }
        </Modal>
)


export default DeleteModal