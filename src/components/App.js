import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';


import ProjetForm from './forms/ProjetForm';
import ModalRoot from './modals/ModalRoot';
import ProjetList from './projets/ProjetList';
import Header from './Header';
import UserList from './users/UserList';
import SideBar from './SideBar';

import './app.css'
import MarcheForm from './marches/MarcheForm';
import ProjetDetail from './projets/ProjetDetail';

const App = ({breadCrumb}) => {

    // const { dispatch, projetForm } = props;

    return (

        <div className={`app-container`}>

            <Router>

                

                <SideBar />

                <section id="content">
                    <Header />

                    <div id="routes">
                        <div className="bread-crumb">
                            <i className="fas fa-home"></i>
                            <i className="fas fa-angle-right _fa-sep"></i>
                            <span className="path-link">{breadCrumb}</span>
                        </div>

                        <Route path="/" exact component={ProjetList} />
                        <Route path="/projets/new" exact component={ProjetForm} />
                        <Route path="/projets/edit/:idProjet" exact component={ProjetForm} />
                        <Route path="/projets/detail/:idProjet" exact component={ProjetDetail} />
                        <Route path="/projets" exact component={ProjetList} />
                        <Route path="/marches/new/:idProjet" exact component={MarcheForm} />
                        <Route path="/marches/edit/:idMarche" exact component={MarcheForm} />
                        <Route path="/users" exact component={UserList} />
                    </div>

                </section>


            </Router>

            <ModalRoot />

        </div>

    )
}

export default connect(
    (state) => ({
        breadCrumb: state.breadCrumb
    })
)(App);