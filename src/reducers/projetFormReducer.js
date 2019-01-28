const INITIAL_STATE = {};

export default (state=INITIAL_STATE, action) => {

    console.log(action.type)

    switch(action.type) {

        case 'LOAD_INIT_FORM_VALUES':
            return {...state, intitule: 'YOUSSEF PROJET INIT ...'};

        default:
            return state;
    }

}