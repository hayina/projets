import React, { useEffect } from 'react';
import { BrowserRouter , Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';


import ProjetForm from './forms/ProjetForm';
import ModalRoot from './modals/ModalRoot';
import ProjetList from './projets/ProjetList';
import Header from './Header';
import UserList from './users/UserList';
import SideBar from './SideBar';
import ForbiddenRoute from '../security/ForbiddenRoute'

import './app.css'
import MarcheForm from './marches/MarcheForm';
import ProjetDetail from './projets/ProjetDetail';
import Dashboard from './Dashboard';
import Login from './Login';
import { isAuthenticated, getUserID, getUserType, getRoles } from '../reducers/login';


import { createBrowserHistory } from 'history';
import { USER_ROLES } from '../types';
import { canHeAccessRoute } from '../security';
export const history = createBrowserHistory();


const BreadCrumb = ({ label }) => (
    <div className="bread-crumb">
        <i className="fas fa-home"></i>
        <i className="fas fa-angle-right _fa-sep"></i>
        <span className="path-link">{label}</span>
    </div>
)


let ProtectedRoute = ({ component:Cp, authRole, isAuth, userID, userType, roles, ...restProps }) => {

        
    

    return (
        <Route {...restProps} render={ 
            props => {
                if(isAuth) { 

                    // console.log("authRole", authRole)
                    // console.log("path", restProps.path)

                    if( authRole && ! canHeAccessRoute(roles, authRole, userType) ) {
                        return <ForbiddenRoute {...props} />  
                    }
                    
                    return <Cp {...props} />  
                    
                } else {
                    console.log("Redirect to login", restProps.path)
                    // return <Redirect to="/login" />
                    return <Login {...props} />
                }
            }
        }
        />
    )
}

ProtectedRoute = connect( state => ({
    isAuth: isAuthenticated(state),
    userID: getUserID(state),
    userType: getUserType(state),
    roles: getRoles(state),
}))(ProtectedRoute)

const App = ({ breadCrumb , isAuth, userID, userType, roles }) => {




    // console.log("MAIN APP ------>")

    return (

        <div className={`app-container`}>

            <BrowserRouter basename={'/PROJET-API/routes/'}>

     

                { isAuth && <SideBar /> }

                {/* <Login/> */}

                <section id="content">
                    <Header />

                    <div id="routes">


                        <BreadCrumb label={breadCrumb} />

                        <Route path="/login" exact component={Login} />
                        <Route path="/forbidden" exact component={ForbiddenRoute} />

                        

                        <ProtectedRoute path="/" exact component={Dashboard} />
                        <ProtectedRoute path="/projets/" exact component={Dashboard} />
                        <ProtectedRoute path="/projets/dashboard" exact component={Dashboard} />

                        <ProtectedRoute path="/projets/detail/:idProjet" exact component={ProjetDetail} />
                        <ProtectedRoute path="/projets/search" exact component={ProjetList} />
                       

                        <ProtectedRoute 
                            authRole={USER_ROLES.SAISIR_PROJET} 
                            path="/projets/new" exact component={ProjetForm} 
                        />



                        <ProtectedRoute authRole={USER_ROLES.SAISIR_PROJET}  
                            path="/projets/edit/:idProjet" exact component={ProjetForm} 
                        />

                        <ProtectedRoute authRole={USER_ROLES.SAISIR_PROJET} 
                            path="/marches/new/:idProjet" exact component={MarcheForm}
                        />

                        <ProtectedRoute authRole={USER_ROLES.SAISIR_PROJET}  
                            path="/marches/edit/:idMarche" exact component={MarcheForm} 
                        />
                       
                        <ProtectedRoute 
                            authRole={USER_ROLES.GESTION_UTILISATEURS} 
                            path="/users" exact component={UserList} 
                        />

                    </div>

                </section>


            </BrowserRouter>

            <ModalRoot />

        </div>

    )
}

export default connect(
    (state) => ({
        isAuth: isAuthenticated(state),
        userID: getUserID(state),
        userType: getUserType(state),
        roles: getRoles(state),
        breadCrumb: state.breadCrumb
    })
)(App);