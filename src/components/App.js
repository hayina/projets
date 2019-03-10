import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

import ProjetForm from './forms/ProjetForm';
import Modal from './modals/Modal';
import Convention from './modals/Convention';


const App = (props) => {

    const { dispatch, projetForm } = props;

    return (

        <div className="app-container">

            <ProjetForm />

            { projetForm.modals.show && (
                <Modal
                    handleClick={ () => dispatch(submit('conventionForm')) }
                    title="ajouter un partenaire"
                    modalName='convention'
                >
                    { projetForm.modals.convention && <Convention /> }
                </Modal>
            )}

        </div>

    )
}

export default connect(
    (state) => ({
        projetForm: state.projetForm
    })
)(App);