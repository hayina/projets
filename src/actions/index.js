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
export const arrayDeletingByIndex = (arrName, index) => ({ type: types.DELETE_ITEM_BY_INDEX, arrName, index })
export const arrayDeletingByValue = (arrName, value) => ({ type: types.DELETE_ITEM_BY_VALUE, arrName, value })
export const arrayDeletingByPath = (arrName, path) => ({ type: types.DELETE_ITEM_BY_PATH, arrName, path })
export const arrayUpdating = (arrName, item, index) => ({ type: types.UPDATE_ITEM, arrName, index, item })
export const arraySetting = (arrName, arrayVal) => ({ type: types.SET_ARRAY, arrName, arrayVal })

export const initFormValues = (initialValues) => ({ type: types.EDIT_FORM_VALUES, initialValues })


export const setCheckboxProp = (values, checkboxType, checkboxProp) => ({ 
        type: types.SET_CHECKBOX_PROP, 
        values, 
        checkboxType,
        checkboxProp
})






