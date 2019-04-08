import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';


import ProjetForm from './forms/ProjetForm';
import ModalRoot from './modals/ModalRoot';
import ProjetList from './projets/ProjetList';
import Header from './Header';



const App = () => {

    // const { dispatch, projetForm } = props;

    return (

        <div className={`app-container`}>

            <Router>

                <Header />

                <Route path="/" exact component={ProjetForm} />
                <Route path="/projets/edit/:idProjet" exact component={ProjetForm} />
                <Route path="/projets" exact component={ProjetList} />


            </Router>

            <ModalRoot />

        </div>

    )
}

export default connect(
    // (state) => ({
    //     modal: isModal(state)
    // })
)(App);