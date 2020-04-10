import React, { useEffect, useState } from 'react';
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
import { isAuthenticated, getUserID, getRoles, getPermissions } from '../reducers/login';


import { createBrowserHistory } from 'history';
import { USER_PERMISSIONS, APP_LINKS } from '../types';
import { accessPermissions } from '../security';
import useAjaxFetch from './hooks/useAjaxFetch';
import { loginUser } from '../actions';
import { getItemFromStorage } from '../helpers';
import { accessRoute } from '../security';
import LocationPage from './locations/LocationsPage';
import ConventionPage from './conventions/ConventionPage';
export const history = createBrowserHistory();


const BreadCrumb = ({ label }) => (
    <div className="bread-crumb">
        <i className="fas fa-home"></i>
        <i className="fas fa-angle-right _fa-sep"></i>
        <span className="path-link">{label}</span>
    </div>
)


let ProtectedRoute = ({ component:Cp,
    authPermissions, isAuth, userID, roles, permissions, 
    dispatch, ...restProps }) => {

        
    console.log("ProtectedRoute ------>" + restProps.path)

    return (
        <Route {...restProps} render={ 
            props => {
                if(isAuth) { 

                    // console.log("authRole", authRole)
                    // console.log("path", restProps.path)

                    if( authPermissions 
                        && ! accessPermissions(permissions, authPermissions) 
                        ) {
                        return <ForbiddenRoute {...props} />  
                    }
                    
                    return <Cp {...props} />  
                    
                } else {
                    console.log("Redirect to login", restProps.path)
                    // return <Redirect to="/login" />
                    const { pathname, search }  = props.history.location
                    return <Login {...props} from={ `${pathname}${search}` } />
                }
            }
        }
        />
    )
}

ProtectedRoute = connect( state => ({
    isAuth: isAuthenticated(state),
    userID: getUserID(state),
    roles: getRoles(state),
    permissions: getPermissions(state),
}))(ProtectedRoute)

const App = ({ breadCrumb , isAuth, dispatch }) => {


    console.log("MAIN APP ------>")

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
                        {/* <Route path="/forbidden" exact component={ForbiddenRoute} /> */}

                        

                        <ProtectedRoute path="/" exact component={Dashboard} />
                        <ProtectedRoute path="/projets/" exact component={Dashboard} />
                        <ProtectedRoute path="/projets/dashboard" exact component={Dashboard} />

                        <ProtectedRoute path={APP_LINKS.SEARCH_PROJECT} exact component={ProjetList} />
                        <ProtectedRoute path="/projets/detail/:idProjet" exact component={ProjetDetail} />
                       
                        <ProtectedRoute path="/conventions" exact component={ConventionPage} />
                        <ProtectedRoute path="/locations" exact component={LocationPage} />

                        <ProtectedRoute 
                            authPermissions={[USER_PERMISSIONS.ADD_PROJECT]} 
                            path="/projets/new" exact component={ProjetForm} 
                        />



                        <ProtectedRoute 
                            authPermissions={[USER_PERMISSIONS.EDIT_PROJECT]}  
                            path="/projets/edit/:idProjet" exact component={ProjetForm} 
                        />

                        <ProtectedRoute 
                            authPermissions={[USER_PERMISSIONS.ADD_PROJECT]} 
                            path="/marches/new/:idProjet" exact component={MarcheForm}
                        />

                        <ProtectedRoute 
                            authPermissions={[USER_PERMISSIONS.EDIT_PROJECT]}  
                            path="/marches/edit/:idMarche" exact component={MarcheForm} 
                        />
                       
                        <ProtectedRoute 
                            authPermissions={[USER_PERMISSIONS.VIEW_USERS]} 
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
        breadCrumb: state.breadCrumb
    })
)(App);