import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import './header.css'

let Header = () => {

    const NavItem = ({url, label}) => (
        <div className="nav-item">
            <Link to={url}>{label}</Link>
        </div>
    )

    return (
        <nav className="nav-wr">


            <div className="header-right">
                <NavItem label="Déconnexion" url="/logout" />
            </div>

            

        
        </nav>
    )
}

export default Header