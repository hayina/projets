import types from '../types'


/////////////// MODALS

// export const toggleModal = (modalName, modalToggle) => ({
//     type: types.TOGGLE_MODAL,
//     payload: { modalName, modalToggle }
// })

export const showModal = (modalType, modalProps) => ({ type: types.SHOW_MODAL, modalType, modalProps })

export const hideModal = () => ({ type: types.HIDE_MODAL })


export const addLocalisation = (path) => ({ type: types.ADD_ITEM_LOCALISATION, path })
export const initLocalisation = (intialState) => ({ type: types.INIT_LOCALISATION, intialState })

export const arrayPushing = (arrName, item) => ({ type: types.ADD_ITEM, arrName, item })
export const arrayDeleting = (arrName, index) => ({ type: types.DELETE_ITEM, arrName, index })
export const arrayUpdating = (arrName, item, index) => ({ type: types.UPDATE_ITEM, arrName, index, item })



