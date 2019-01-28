import React from 'react';

import ProjetForm from './forms/ProjetForm'
import Modal from './modals/Modal'
import Convention from './modals/Convention'


const App = () => {

    return (

        <div>
            {/* <h1>PROJET FORMULAIRE</h1>
            <ProjetForm /> */}

            <h1>popup</h1>

            <Modal>
                <Convention />  
            </Modal>

        </div>

    )
}

export default App;