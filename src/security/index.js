import React, { useState } from 'react'

import { USER_ROLES, USER_TYPES } from "../types"
import ForbiddenRoute from "./ForbiddenRoute";



export const withForbbiden = (Cp) => (props) => {
    
    const [forbbiden, setForbbiden] = useState(false);
    return forbbiden ? <ForbiddenRoute /> : <Cp { ...props } setForbbiden={setForbbiden}   />
}


export const canHeEdit = (userID, chargeSuivID, roles, userType) => {
    return userID === chargeSuivID 
        || roles.some((role) => role === USER_ROLES.CONTROLER_PROJET || role === USER_ROLES.VALIDER_PROJET )
        || userType === USER_TYPES.ADMIN
}

export const canHeAffect = (roles, userType) => {
    return roles.some((role) => role === USER_ROLES.AFFECTER_PROJET )
    || userType === USER_TYPES.ADMIN
        
}

export const canHeAccessRoute= (roles, authRole, userType) => {
    return roles.some((role) => role === authRole )
    || userType === USER_TYPES.ADMIN
        
}