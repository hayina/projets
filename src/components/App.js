import React, { useEffect } from 'react';
import { BrowserRouter , Route, Redirect } from "react-router-dom";
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
import Dashboard from './Dashboard';
import Login from './Login';
import { isAuthenticated, getUserID, getProfile, getRoles } from '../reducers/login';


import { createBrowserHistory } from 'history';
import { USER_ROLES } from '../types';
export const history = createBrowserHistory();


const BreadCrumb = ({ label }) => (
    <div className="bread-crumb">
        <i className="fas fa-home"></i>
        <i className="fas fa-angle-right _fa-sep"></i>
        <span className="path-link">{label}</span>
    </div>
)

const isAuth = Cp => {

    // if(!isAuthenticated) { return <Login />  }
    // if(!isAuthenticated) { history.push("/login") }

    let AuthCp = ({ isAuthenticated, ...props }) => {



        if(isAuthenticated) { return <Cp {...props} />  }
        // if(!isAuthenticated) { return <Login />  }

// 
        return <Login />
        // return <Redirect to='/login' />
        // history.push("/login")
        
    }

    return connect( (state) => ({ isAuthenticated: isAuthenticated(state) }) )(AuthCp)
}


// ProtectedRoute = connect((state) => ({ isAuth: isAuthenticated(state) }))(ProtectedRoute);


let ProtectedRoute = ({ component:Cp, authRole, own=false, ...restProps }) => {

        
    // console.log("restProps", restProps)

    return (
        <Route {...restProps} render={ 
            props => {
                if(isAuth) { 
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
    isAuth: isAuthenticated(state)
}))(ProtectedRoute)

const App = ({ breadCrumb , isAuth, userID, profile, roles }) => {




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

                        

                        <ProtectedRoute path="/" exact component={Dashboard} />
                        <ProtectedRoute path="/projets/" exact component={Dashboard} />
                        <ProtectedRoute path="/projets/dashboard" exact component={Dashboard} />

                        <ProtectedRoute path="/projets/detail/:idProjet" exact component={ProjetDetail} />
                        <ProtectedRoute path="/projets/search" exact component={ProjetList} />
                       
                        <ProtectedRoute authRole={USER_ROLES.ajouter_projet} own={true}
                            path="/projets/new" exact component={ProjetForm} 
                        />

                        <ProtectedRoute authRole={USER_ROLES.ajouter_projet} own={true} 
                            path="/projets/edit/:idProjet" exact component={ProjetForm} 
                        />

                        <ProtectedRoute authRole={USER_ROLES.ajouter_projet} own={true}
                            path="/marches/new/:idProjet" exact component={MarcheForm}
                        />

                        {/* <Route path="/marches/edit/:idMarche" exact component={MarcheForm} /> */}
                        <ProtectedRoute authRole={USER_ROLES.ajouter_projet} own={true} 
                            path="/marches/edit/:idMarche" exact component={MarcheForm} 
                        />
                       
                        <ProtectedRoute authRole={USER_ROLES.gestion_users} path="/users" exact component={UserList} />

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
        profile: getProfile(state),
        roles: getRoles(state),
        breadCrumb: state.breadCrumb
    })
)(App);