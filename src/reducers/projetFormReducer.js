
const FORM_MODALS_STATE = {

    modal: false,
    convention: false
};

export const formModalsReducer = (state=FORM_MODALS_STATE, action) => {

    console.log(action.type)

    switch(action.type) {

        case 'TOGGLE_MODAL':
            const { modalName, modalToggle} = action.payload;
            return { ...state, [modalName]: modalToggle, modal: modalToggle };

        default:
            return state;
    }

}

const AUTOCOMPLETE_STATE = {
    filtredSuggestions: [],
    showSuggestions: false,
};

export const autocompleteReducer = (state=AUTOCOMPLETE_STATE, action) => {

    switch(action.type) {

        case 'LOAD_SUGGESTIONS':
            const { filtredSuggestions } = action.payload;
            return { ...state, filtredSuggestions, showSuggestions: true };

        default:
            return state;

    }
}