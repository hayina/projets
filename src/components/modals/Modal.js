import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import { hideModal } from '../../actions';
import useClickOutside from '../hooks/useClickOutside';

import './modal.css'



const Modal = ({ title, children, handleValidation, dispatch }) => {

    const modalRef = useRef(null);

    document.body.classList.add('modal-on')
    useEffect(() => {
        return () => document.body.classList.remove('modal-on')
    }, [])

    useClickOutside(modalRef, () => {
        dispatch(hideModal());
    });


    // i need this promise cauz when the modal component toggles to false 
    // it destroy the convention form so the sumbit function dont get called
    // const doSaving = (f) => new Promise((resolve, reject) => {
    //     f();
    //     resolve();
    // })

    return (
        <div className="modal-container">

            <div className="modal-dialog" ref={modalRef}>

                <div className="modal-header">
                    <h5 className="modal-title">{title}</h5>
                </div>

                <div className="modal-content">{children}</div>

                <div className="modal-validation">

                    <button className="btn btn-secondary"
                        onClick={ () => dispatch(hideModal()) }>Annuler</button>

                    <button type="submit" className="btn btn-primary"
                        onClick={ handleValidation }>Valider</button>

                    {/* <button type="submit" className="btn btn-primary"
                        onClick={
                            () => doSaving(handleClick)
                                .then(() => hideModal())
                        } >Valider</button> */}

                </div>
            </div>

        </div>
    )
}


export default connect()(Modal);



