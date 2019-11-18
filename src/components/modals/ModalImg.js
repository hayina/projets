/* eslint-disable jsx-a11y/alt-text */
import React, { useRef  } from 'react';
import { connect } from 'react-redux';

import './modal.css'
import { useModalSetting } from '../hooks';




const ModalImg = ({ dispatch, url }) => {

    const modalRef = useRef(null);

    useModalSetting(modalRef, dispatch)

    return (
        <div className="modals-container" style={{ textAlign: "center" }}>
            <div className="modals-dialog" ref={modalRef}  
                style={{ display: "inline-block", maxWidth: "80%" }}
            >
                <div className="img-popup-wr">
                    <img className="img-popup" src={`${ url }`} style={{ width: "100%" }}/> 
                </div>
            </div>
        </div>
    )
}

export default connect()(ModalImg);



