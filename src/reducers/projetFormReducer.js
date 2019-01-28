const INITIAL_STATE = {

    intitule: 'YOUSSEF PROJET',
    montant: 300000,
    secteur: 'santé',
    isConvention: false

};

export default (state=INITIAL_STATE, action) => {

    switch(action.type) {

        case 'LOAD_INIT_FORM_VALUES':
            return {...state, intitule: 'YOUSSEF PROJET INIT ...'};

        default:
            return state;
    }

}