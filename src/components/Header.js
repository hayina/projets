/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";

import './header.css'
import { isAuthenticated, getFullName } from '../reducers/login';
import { logoutAndClean } from '../helpers';
// import { history } from './App';



let Header = ({ isAuth, fullName, history }) => {

    const logout = () => {

        logoutAndClean()
        history.push('/') 

    }

    // console.log('public url : ', process.env.PUBLIC_URL)

    return (
        <nav id="pageHeader" className="header">

            <div id="logo">
                <Link to={`/`}>
                    {/* <img id="img_logo" alt="" src={`/images/logo.jpg`}></img> */}
                    <img id="img_logo" alt="" src={`${process.env.PUBLIC_URL}/images/logo.jpg`}></img>
                </Link>
            </div>

            <div className="logo-label">
                Suivi des projets au niveau de la Province de Taourirt
            </div>

            {/* { !isAuth && 
                <span className="login-link l_ho" onClick={ () =>  history.push('/login') }>Connexion</span>
            } */}

            { isAuth &&
            <div className="user-profile">


                {/* <span className="user-name">YOUSSEF LECHQAR</span> */}

                <div className="dropdown show">

                    <a
                        className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        { fullName }
                    </a>
                    {/* <div className="dropdown-toggle" id="dropdownMenuLink"></div> */}



                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">

                     
                            
                            <span className="dropdown-item" onClick={ logout } >
                                <i className="fas fa-power-off"></i>
                                <span className="dropdown-label">Déconnexion</span>
                            </span>
                            
                            <Link className="dropdown-item" to="/profile">
                                <i className="fas fa-user-circle"></i>
                                <span className="dropdown-label">Mon profile</span>
                            </Link>
              

                    </div>
                </div>



            </div>
            }





        </nav>
    )
}

export default connect((state) => ({ 
    isAuth: isAuthenticated(state),
    fullName: getFullName(state)
}))(withRouter(Header));


