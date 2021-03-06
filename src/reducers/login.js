import types from "../types";

const initialState = {
    isAuthenticated: false,
    userInfo: {}
}

export const isAuthenticated = (state) => state.login.isAuthenticated
export const getUserInfo = (state) => state.login.userInfo
export const getUserID = (state) => state.login.userInfo.id
export const getRoles = (state) => state.login.userInfo.roles
export const getPermissions = (state) => state.login.userInfo.permissions
export const getFullName = (state) => `${state.login.userInfo.nom} ${state.login.userInfo.prenom}`

export const login = (state = initialState, action) => {

    switch (action.type) {
        case types.LOGIN: 
            console.log("LOGIN >", { isAuthenticated: true, userInfo: action.userInfo })
            return { isAuthenticated: true, userInfo: action.userInfo };
        case types.LOGOUT: 
            return initialState;
        default: 
            return state;
    }
}


// export const loginHelper = ({userInfo}) => {
//     dispatch(loginUser(userInfo))
//     localStorage.setItem('userInfo', JSON.stringify(userInfo));
//     history.push('/foo/search')
// }


