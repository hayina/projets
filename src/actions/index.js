

export const formValuesChange = (inputValue, inputName) => {



    return {
        type: 'INPUT_CHANGED',
        payload: {inputValue, inputName}
    }
}