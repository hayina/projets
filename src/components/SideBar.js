import React from 'react'
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';

import { getRoles, getPermissions } from '../reducers/login';

import './sideBar.css'
import { accessPermissions } from '../security';
import { USER_PERMISSIONS } from '../types';
// import { canUserSaisir, isAdmin } from '../security';

let SideBar = ({ permissions, roles }) => {


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

                {accessPermissions(permissions, [USER_PERMISSIONS.ADD_PROJECT]) && 
                    <SideItem label="Ajouter Projet" url="/projets/new" >
                        <i className="_fa_sb fas fa-industry"></i>
                    </SideItem>
                }

                {accessPermissions(permissions, [USER_PERMISSIONS.VIEW_CONVENTION]) && 
                    <SideItem label="Liste des Conventions" url="/conventions" />
                }       

                {accessPermissions(permissions, [USER_PERMISSIONS.VIEW_LOCATION]) && 
                    <SideItem label="Gestion des localisations" url="/locations" >
                        <i className="_fa_sb fas fa-map-marker-alt"></i>
                    </SideItem>
                }   

                {accessPermissions(permissions, [USER_PERMISSIONS.VIEW_USERS]) && 
                <SideItem label="Gestion des utilisateurs" url="/users" >
                    <i className="_fa_sb fas fa-users-cog"></i>
                </SideItem>
                }
         

            </div>

        </div>
    )

}


export default connect((state) => ({ 
    permissions: getPermissions(state),
    roles: getRoles(state),
}))(SideBar);