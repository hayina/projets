import types from "../types";



// export const getUsers = (state) => state.users;

export const users = (state = [], action) => {

    switch (action.type) {

        case types.ADD_USER:

            return [ ...state, action.values ]


        default:
            return state;
    }

}