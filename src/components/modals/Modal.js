import React, { useRef, useLayoutEffect  } from 'react';
import { connect } from 'react-redux';

import { hideModal } from '../../actions';
import useClickOutside from '../hooks/useClickOutside';

import './modal.css'



const Modal = ({ title, children, handleValidation, dispatch, submitting, styles={ width: '50%' }, vBar=true }) => {

    const modalRef = useRef(null);

    useLayoutEffect(() => {
        // console.log('useLayoutEffect')
        document.body.classList.add('modal-on')
        return () => {
            // console.log('return useLayoutEffect')
            document.body.classList.remove('modal-on')
        }
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
        <div className="modals-container">

            <div className="modals-dialog" ref={modalRef} style={styles}>

                { title && 
                    <div className="modals-header">
                        <h5 className="modals-title">{title}</h5>
                    </div>
                }

                <div className="modals-content">{children}</div>


                { 
                    vBar &&
                    <div className="modals-validation">

                        <button className="btn btn-secondary"
                            onClick={ () => dispatch(hideModal()) }>Annuler</button>

                        {/* <button type="submit" className="btn btn-primary"
                            onClick={ handleValidation }>Valider</button> */}

                        <button type="submit" className={`btn btn-primary ${submitting ? 'btn-submitting is-submitting ':''}`}
                            onClick={
                                () => {
                                    handleValidation()
                                    // dispatch(hideModal())
                                }} 
                            >Valider{ submitting ? '...':'' }</button>

                    </div>
                }
            </div>

        </div>
    )
}


export default connect()(Modal);



