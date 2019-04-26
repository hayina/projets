import types from '../types'



//////// INITIAL_STATE
const INITIAL_STATE = {};


//////// SELECTORS
export const getPartnerAC = (state) => state.autoCompletes.partner

export const autoCompletes = (state=INITIAL_STATE, action) => {

    switch(action.type) {

        case types.AC_SELECT:
            const { suggestion, name } = action.payload;
            return { ...state, [name]: suggestion };

        case types.AC_INIT:
            return { ...state, [action.name]: null  };

        default:
            return state;
    }

}

