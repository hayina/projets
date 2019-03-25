import types from '../types';


const initialState = {
    partners: [
        { partner: { id: 2, label: 'ONEE - Branche Eau' }, montant: '890000' },
        { partner: { id: 4, label: 'Commune Mestegmeur' }, montant: '640000' },
        { partner: { id: 30, label: 'Ministère de l\'Habitat et de la Politique de la Ville' }, montant: '10000000' }
    ],
    
    localisation:  ["3.2", "3.3", "1.1", "1.2", "2.4.4.2", "2.4.4.3", "3.1"]
}

export const getExtPartners = (state) => state.externalForms.partners;
export const getLocalisations = (state) => state.externalForms.localisation;

export const externalForms = (state = initialState, action) => {

    const { arrName, item, index } = action ;

    switch (action.type) {

        // PARTENAIRES
        case types.ADD_ITEM:
            return { ...state, [arrName]: [ ...state[arrName], item ] }

        case types.UPDATE_ITEM:
                // WORONG !! STATE MUTATION
            // let arr = state[arrName];
            // arr[index] = item;
            // let newState = { ...state, [arrName]: [...arr] }
            let arr = [ ...state[arrName] ];
            arr[index] = item;
            return { ...state, [arrName]: arr }

        case types.DELETE_ITEM:
            let arrDel = [ ...state[arrName] ];
            arrDel.splice(index, 1);
            return { ...state, [arrName]: arrDel };


        // LOCALISATION
        case types.SET_ARRAY:

            return { ...state, [arrName]: action.arrayVal }


        default:
            return state;
    }

}
