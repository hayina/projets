import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';


import ProjetForm from './forms/ProjetForm';
import ModalRoot from './modals/ModalRoot';
import ProjetList from './projets/ProjetList';
import Header from './Header';
import UserList from './users/UserList';



const App = () => {

    // const { dispatch, projetForm } = props;

    return (

        <div className={`app-container`}>

            <Router>

                <Header />

                <Route path="/" exact component={UserList} />

                <Route path="/projets/new" exact component={ProjetForm} />
                <Route path="/projets/edit/:idProjet" exact component={ProjetForm} />
                <Route path="/projets" exact component={ProjetList} />

                <Route path="/users" exact component={UserList} />


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