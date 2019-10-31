import React, { useState } from 'react'

import { USER_ROLES, USER_TYPES } from "../types"
import ForbiddenRoute from "./ForbiddenRoute";



export const withForbbiden = (Cp) => (props) => {
    
    const [forbbiden, setForbbiden] = useState(false);
    return forbbiden ? <ForbiddenRoute /> : <Cp { ...props } setForbbiden={setForbbiden}   />
}

const supervisorRoles = [ USER_ROLES.CONTROLER_PROJET, USER_ROLES.VALIDER_PROJET, USER_ROLES.AFFECTER_PROJET ]

export const isSupervisor = (roles) => roles.some((role) => supervisorRoles.some(supRole => supRole === role))
export const isAdmin = (userType) => userType === USER_TYPES.ADMIN


export const canUserEdit = (userID, chargeSuivID, roles, userType) => userID === chargeSuivID 
        || isSupervisor(roles)
        || isAdmin(userType)


export const canUserAffect = (roles, userType) => isSupervisor(roles) || isAdmin(userType)
export const canUserSaisir = (roles, userType) => canHeAccessRoute(roles, USER_ROLES.SAISIR_PROJET, userType)


export const canHeAccessRoute= (roles, authRole, userType) => roles.some((role) => role === authRole ) || isAdmin(userType)
