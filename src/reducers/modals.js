
const initialState = {
    modalType: undefined,
    modalProps: {}
}

export const modals = (state = initialState, action) => {

    switch (action.type) {
        case 'SHOW_MODAL':
            return {
                modalType: action.modalType,
                modalProps: action.modalProps
            }
        case 'HIDE_MODAL':
            return initialState
        default:
            return state
    }
}