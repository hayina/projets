import React, { useState } from 'react'

import { USER_PERMISSIONS, USER_ROLES } from "../types"
import ForbiddenRoute from "./ForbiddenRoute";



export const withForbbiden = (Cp) => (props) => {
    
    const [forbbiden, setForbbiden] = useState(false);
    return forbbiden ? <ForbiddenRoute /> : <Cp { ...props } setForbbiden={setForbbiden}   />
}



export const accessEditProject = (userID, chargeSuivID, roles) => {
    console.log("accessEditProject", userID, chargeSuivID, roles)
    return userID === chargeSuivID || accessRoles(roles, [USER_ROLES.SUPERVISOR_DIV, USER_ROLES.ADMIN])
}
 


// export const canUserAffect = (roles, userType) => isSupervisor(roles) || isAdmin(userType)
// export const canUserSaisir = (roles, userType) => canHeAccessRoute(roles, USER_ROLES.SAISIR_PROJET, userType)


export const accessRoles= (roles, authRole) => {

    if(authRole instanceof Array) {
        return roles.some( role => authRole.some( ar => ar === role) )
    } 
    else if(typeof authRole === 'string' || authRole instanceof String) {
        return roles.some( role => authRole === role )
    }

    return false
}

export const accessPermissions= (permissions, authPermissions) => {

    if(authPermissions instanceof Array) {
        return permissions.some( perm => authPermissions.some( authPerm => authPerm === perm) )
    } 
    else if(typeof authPermissions === 'string' || authPermissions instanceof String) {
        return permissions.some( perm => authPermissions === perm )
    }

    return false
}
