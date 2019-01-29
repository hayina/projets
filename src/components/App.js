import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

import ProjetForm from './forms/ProjetForm'
import Modal from './modals/Modal'
import Convention from './modals/Convention'


const App = (props) => {

    const { dispatch } = props;

    return (

        <div>
            {/* <h1>PROJET FORMULAIRE</h1>
            <ProjetForm /> */}

            <h1>popup</h1>

            <Modal 
                handleClick={() => dispatch(submit('conventionForm'))}
                title="ADD PARTNER"
            >
                <Convention/>  
            </Modal>

        </div>

    )
}

export default connect()(App);