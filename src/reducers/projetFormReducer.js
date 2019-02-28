
const FORM_MODALS_STATE = {

    modal: false,
    convention: false
};

export const formModalsReducer = (state=FORM_MODALS_STATE, action) => {

    // console.log(action.type)

    switch(action.type) {

        case 'TOGGLE_MODAL':
            const { modalName, modalToggle} = action.payload;
            return { ...state, [modalName]: modalToggle, modal: modalToggle };

        default:
            return state;
    }

}

