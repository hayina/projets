import React from 'react'
import Modal from './Modal';

let PictureModal = ({ url, label }) => {


    return (
        <Modal vBar={false} styles={{ width: '80%' }}>
            <div className="img-popup-wr">
                <img className="img-popup" src={`${ url }`} alt={label} /> 
            </div>
        </Modal>
    )

}

export default PictureModal