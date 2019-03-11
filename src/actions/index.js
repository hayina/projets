import types from '../types'


/////////////// MODALS

// export const toggleModal = (modalName, modalToggle) => ({
//     type: types.TOGGLE_MODAL,
//     payload: { modalName, modalToggle }
// })

export const showModal = (modalType) => ({ type: types.SHOW_MODAL, modalType })

export const hideModal = () => ({ type: types.HIDE_MODAL })



