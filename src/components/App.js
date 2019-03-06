import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

import ProjetForm from './forms/ProjetForm';
import Modal from './modals/Modal';
import Convention from './modals/Convention';


const App = (props) => {

    const { dispatch, formModals } = props;

    return (

        <div className="app-container">

            <ProjetForm />

            { formModals.modal && (
                <Modal
                    handleClick={() => dispatch(submit('conventionForm'))}
                    title="ADD PARTNER"
                    modalName='convention'
                >
                    {formModals.convention && <Convention />}
                </Modal>
            )}

        </div>

    )
}

export default connect(
    (state) => ({
        formModals: state.formModals
    })
)(App);