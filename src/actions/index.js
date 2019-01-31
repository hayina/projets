

export const formValuesChange = (inputValue, inputName) => (
    {
        type: 'INPUT_CHANGED',
        payload: { inputValue, inputName }
    }
);


export const initFormValues = () => (
    {
        type: 'LOAD_INIT_FORM_VALUES'
    }
);


///////////////

export const toggleModal = (modalName, modalToggle) => ({
    type: 'TOGGLE_MODAL',
    payload: { modalName, modalToggle }
})



