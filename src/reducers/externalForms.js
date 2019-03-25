import types from '../types';


const initialState = {
    partners: [
        { partner: { id: 2, label: 'ONEE - Branche Eau' }, montant: '890000' },
        { partner: { id: 4, label: 'Commune Mestegmeur' }, montant: '640000' },
        { partner: { id: 30, label: 'Ministère de l\'Habitat et de la Politique de la Ville' }, montant: '10000000' }
    ],
    
    localisation:  ["1.1", "1.2", "2.4.4.2", "2.4.4.3", "3"]
}

export const getExtPartners = (state) => state.externalForms.partners;
export const getLocalisations = (state) => state.externalForms.localisation;

export const externalForms = (state = initialState, action) => {

    const { arrName, item, index, value, path } = action ;
    let arrDel

    switch (action.type) {

        // PARTENAIRES
        case types.ADD_ITEM:
            return { ...state, [arrName]: [ ...state[arrName], item ] }

        case types.UPDATE_ITEM:

            let arr = [ ...state[arrName] ];
            arr[index] = item;
            return { ...state, [arrName]: arr }

        case types.DELETE_ITEM_BY_INDEX:
            arrDel = [ ...state[arrName] ];
            arrDel.splice(index, 1);
            return { ...state, [arrName]: arrDel };

        case types.DELETE_ITEM_BY_VALUE:

            arrDel = [ ...state[arrName] ]
            let indexOf = arrDel.indexOf(value)
            if( indexOf !== -1 ) {
                arrDel.splice(indexOf, 1);
                return { ...state, [arrName]: arrDel };
            }

            return state

        case types.DELETE_ITEM_BY_PATH:
            let nState = state[arrName].filter(sPath => !`${sPath}.`.startsWith(`${path}.`)) 
            console.log(nState)
            return { ...state, [arrName]: nState };



        // LOCALISATION
        case types.SET_ARRAY:

            return { ...state, [arrName]: action.arrayVal }


        default:
            return state;
    }

}
