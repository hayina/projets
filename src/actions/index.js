import types from '../types'


/////////////// MODALS

// export const toggleModal = (modalName, modalToggle) => ({
//     type: types.TOGGLE_MODAL,
//     payload: { modalName, modalToggle }
// })

export const showModal = (modalType) => ({ type: types.SHOW_MODAL, modalType })

export const hideModal = () => ({ type: types.HIDE_MODAL })


export const arrayPushing = (arrName, item) => ({ type: types.ADD_ITEM, arrName, item })
export const arrayDeleting = (arrName, index) => ({ type: types.DELETE_ITEM, arrName, index })



