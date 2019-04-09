import React from 'react'
import { Link } from "react-router-dom";


import './sideBar.css'
let SideBar = () => {


    const SideItem = ({url, label}) => (
        <div className="side-item">
            <Link to={url}>{label}</Link>
        </div>
    )

    return (

        <div className="side-bar">

            <div id="logo">
                <Link to={`/`}>
                    <img id="img_logo" alt="" src={`/images/logo.jpg`}></img>
                </Link>
            </div>
            <div className="nav-bar">
                <SideItem label="Ajouter Projet" url="/projets/new" />
                <SideItem label="Liste des Projets" url="/projets" />
                <SideItem label="Liste des utilisateurs" url="/users" />
            </div>

        </div>
    )

}

export default SideBar