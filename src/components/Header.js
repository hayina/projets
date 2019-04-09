import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";



let Header = () => {

    const NavItem = ({url, label}) => (
        <div className="nav-item">
            <Link to={url}>{label}</Link>
        </div>
    )

    return (
        <nav className="nav-wr">

            <NavItem label="Ajouter Projet" url="/projets/new" />
            <NavItem label="Liste des Projets" url="/projets" />
            <NavItem label="Liste des utilisateurs" url="/users" />
            

        
        </nav>
    )
}

export default Header