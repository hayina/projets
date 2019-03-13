import React from 'react';
import { connect } from 'react-redux';


import ProjetForm from './forms/ProjetForm';
import ModalRoot from './modals/ModalRoot';



const App = (props) => {

    // const { dispatch, projetForm } = props;

    return (

        <div className="app-container">

            <ProjetForm />

            <ModalRoot />

            {/* { projetForm.modals.show && (
                <Modal
                    handleClick={ () => dispatch(submit('conventionForm')) }
                    title="ajouter un partenaire"
                    modalName='convention'
                >
                    { projetForm.modals.convention && <Convention /> }
                </Modal>
            )} */}

        </div>

    )
}

export default connect(
    (state) => ({
        projetForm: state.projetForm
    })
)(App);