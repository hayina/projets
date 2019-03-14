import React, { useRef } from 'react';
import { connect } from 'react-redux';

import { hideModal } from '../../actions';
import useClickOutside from '../hooks/useClickOutside';

import './modal.css'



const Modal = ({ title, children, handleValidation, dispatch }) => {

    const inputEl = useRef(null);

    useClickOutside(inputEl.current, () => {
        dispatch(hideModal());
        console.log('useClickOutside DETECTED !!!')
    });


    // i need this promise cauz when the modal component toggles to false 
    // it destroy the convention form so the sumbit function dont get called
    // const doSaving = (f) => new Promise((resolve, reject) => {
    //     f();
    //     resolve();
    // })

    return (
        <div className="pop-container">

            <div className="pop-dialog" ref={inputEl}>

                <div className="pop-header">
                    <h5 className="pop-title">{title}</h5>
                </div>

                <div className="pop-content">{children}</div>

                <div className="pop-validation">

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



