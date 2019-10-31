import React from 'react'
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';

import { getUserType, getRoles } from '../reducers/login';

import './sideBar.css'
import { canUserSaisir, isAdmin } from '../security';

let SideBar = ({ userType, roles }) => {


    const SideItem = ({ url, label, children=(<i className="_fa_sb fas fa-bars"></i>) }) => (
        <div className="side-item">
            
            <NavLink exact className="side-link" activeClassName="active" to={url}>
                {children}
                <label>{label}</label>
            </NavLink>
        </div>
        // <div className="side-item">
        //     <i class="fas fa-bars"></i>
        //     <NavLink exact className="side-link" activeClassName="active" to={url}>{label}</NavLink>
        // </div>
    )

    return (

        <div className="side-bar">


            <div className="nav-bar">

                <SideItem label="Tableau de bord" url="/projets/" >
                    <i className="_fa_sb fas fa-chart-bar"></i>
                </SideItem>

                <SideItem label="Liste des Projets" url="/projets/search" >
                    <i className="_fa_sb fas fa-poll-h"></i>
                </SideItem>

                {
                    canUserSaisir(roles, userType) && 
                    <SideItem label="Ajouter Projet" url="/projets/new" >
                        <i className="_fa_sb fas fa-industry"></i>
                    </SideItem>
                }

                { 
                    isAdmin(userType) && 
                    <>
                    <SideItem label="Liste des Conventions" url="/conventions" />
                    <SideItem label="Gestion des localisations" url="/localisations" >
                        <i className="_fa_sb fas fa-map-marker-alt"></i>
                    </SideItem>


                    <SideItem label="Gestion des utilisateurs" url="/users" >
                        <i className="_fa_sb fas fa-users-cog"></i>
                    </SideItem>
                    </>
                }

            </div>

        </div>
    )

}


export default connect((state) => ({ 
    userType: getUserType(state),
    roles: getRoles(state),
}))(SideBar);