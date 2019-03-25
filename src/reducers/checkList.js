import types from "../types";


const initialState = {
    localisation : {
        selection: [],
        expand: [],
        items: []
    }
}

export const findSelection = (state, checkboxType) => state.checkList[checkboxType].selection
export const findExpand = (state, checkboxType) => state.checkList[checkboxType].expand
export const findItems = (state, checkboxType) => state.checkList[checkboxType].items


export const checkList = (state=initialState, action) => {

    const { type, checkboxType, checkboxProp } = action

    switch(type) {

        case types.SET_CHECKBOX_PROP :
            return { ...state, [checkboxType]: { ...state[checkboxType], [checkboxProp]: action.values } }


        default:
            return state;

    }

}


