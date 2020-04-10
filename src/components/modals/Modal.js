import React, { useRef  } from 'react';
import { connect } from 'react-redux';

import { hideModal } from '../../actions';

import './modal.css'
import { ButtonSpinner } from '../divers';
import { ApiError } from '../helpers';
import { useModalSetting } from '../hooks';



const Modal = ({ title, children, handleValidation, dispatch, styles={ width: '50%' }, 
                    vBar=true, apiCall=false, loading=false, submitting=false, fading=true, errors=false }) => {

    const modalRef = useRef(null);

    useModalSetting(modalRef, dispatch)


    // i need this promise cauz when the modal component toggles to false 
    // it destroy the convention form so the sumbit function dont get called
    // const doSaving = (f) => new Promise((resolve, reject) => {
    //     f();
    //     resolve();
    // })

    return (
        <div className={`modals-container`}>
        {/* <div className={`modals-container ${ fading && (submitting || loading) ? 'is-submitting' : '' }`}> */}

            <div className="modals-dialog" ref={modalRef} style={styles}>

                { title && 
                    <div className="modals-header">
                        <h5 className="modals-title">{title}</h5>
                    </div>
                }

                <div className="modals-content">
                    {children}
                    { apiCall && errors && <ApiError /> }
                </div>

                

                { 
                    vBar &&
                    <div className="modals-validation">
                        <button className="btn btn-secondary" onClick={() => dispatch(hideModal())}>Annuler</button>
                        <ButtonSpinner label="Valider" isLoading={ apiCall ? submitting : false } callback={handleValidation} />
                    </div>
                }

                

            </div>

        </div>
    )
}


export default connect()(Modal);



