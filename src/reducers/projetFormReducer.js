const INITIAL_STATE = {

    status: null,
    values: {
        intitule: '',
        montant: ''
    },
    pending: null

};

export default (state=INITIAL_STATE, action) => {


    switch(action.type) {

        

        case 'INPUT_CHANGED':

            const { inputName, inputValue } = action.payload;
            const newState = { ...state }
            newState.values[inputName] = inputValue;
            return newState;

        default:
            return state;
    }

}