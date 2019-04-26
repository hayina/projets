import types from "../types";

const initialState = {
    modalType: undefined,
    modalProps: {}
}

export const isModal = (state) => state.modals.modalType ? true : false

export const modals = (state = initialState, action) => {

    // console.log('SHOW_MODAL', action.modalType)

    switch (action.type) {
        case types.SHOW_MODAL:
            return {
                modalType: action.modalType,
                modalProps: action.modalProps
            }
        case types.HIDE_MODAL:
            return initialState
        default:
            return state
    }
}