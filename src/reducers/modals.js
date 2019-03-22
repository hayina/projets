
const initialState = {
    modalType: undefined,
    modalProps: {}
}

export const modals = (state = initialState, action) => {

    // console.log('SHOW_MODAL', action.modalType)

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