import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";



let Header = () => {

    return (
        <nav className="nav-wr">
            <div className="nav-item">
                <Link to="/">Ajouter Projet</Link>
            </div>
            <div className="nav-item">
                <Link to="/projets">Liste des Projets</Link>
            </div>
        
        </nav>
    )
}

export default Header