
const FORM_MODALS_STATE = {

    // modal: false,
    // convention: false,

    modals: {
        show: false,
        convention: false
    },

    autoCompletes: {
        partner: { selected: false, suggestion: null }
    }

};

export const projetForm = (state=FORM_MODALS_STATE, action) => {

    switch(action.type) {

        case 'AC_SELECT':
            const { suggestion, name } = action.payload;
            return { ...state, autoCompletes: { ...state.autoCompletes, [name]: {selected: true, suggestion } } };

        case 'TOGGLE_MODAL':
            const { modalName, modalToggle } = action.payload;
            return { ...state, modals: { ...state.modals, [modalName]: modalToggle, show: modalToggle } };

        default:
            return state;
    }

}

