import React  from 'react'

import Modal from './Modal';


const DeleteModal = ({ dangerText, ...otherProps }) => (
        <Modal {...otherProps}>
            { dangerText }
        </Modal>
)


export default DeleteModal