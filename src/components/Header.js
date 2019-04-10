/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import './header.css'

let Header = () => {

    // const NavItem = ({url, label}) => (
    //     <div className="nav-item">
    //         <Link to={url}>{label}</Link>
    //     </div>
    // )

    return (
        <nav className="header">

            <div id="logo">
                <Link to={`/`}>
                    <img id="img_logo" alt="" src={`/images/logo.jpg`}></img>
                </Link>
            </div>

            <div className="logo-label">
                Suivi des projets au niveau de la Province de Taourirt
            </div>

            <div className="user-profile">


                {/* <span className="user-name">YOUSSEF LECHQAR</span> */}

                <div className="dropdown show">

                    <a
                        className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Youssef Lechqar
                    </a>
                    {/* <div className="dropdown-toggle" id="dropdownMenuLink"></div> */}



                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">

                     
                            
                            <Link className="dropdown-item" to="/logout">
                                <i className="fas fa-power-off"></i>
                                <span className="dropdown-label">Déconnexion</span>
                            </Link>
                            
                            <Link className="dropdown-item" to="/profile">
                                <i className="fas fa-user-circle"></i>
                                <span className="dropdown-label">Mon profile</span>
                            </Link>
              

                    </div>
                </div>



            </div>





        </nav>
    )
}

export default Header