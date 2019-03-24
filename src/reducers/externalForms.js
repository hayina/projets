import types from '../types';


const initialState = {
    partners: [
        { partner: { id: 2, label: 'ONEE - Branche Eau' }, montant: '890000' },
        { partner: { id: 4, label: 'Commune Mestegmeur' }, montant: '640000' },
        { partner: { id: 30, label: 'Ministère de l\'Habitat et de la Politique de la Ville' }, montant: '10000000' }
    ],
    
    localisation: []
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

                // GOOD APPROCH
            // let arr = [ ...state[arrName] ];
            // arr[index] = item;
            // let newState = { ...state, [arrName]: arr }
            // console.log(`Mutation --------------------> (${index})`)
            // // console.log(`[${arrName}]`, state[arrName] === newState[arrName])
            // console.log(`[${arrName}][$[index]]`, state[arrName][index] === newState[arrName][index])
            // console.log(`Mutation --------------------> (0)`)
            // // console.log(`[${arrName}]`, state[arrName] === newState[arrName])
            // console.log(`[${arrName}][$[index]]`, state[arrName][0] === newState[arrName][0])
            // return newState

            let arr = [ ...state[arrName] ];
            arr[index] = item;
            return { ...state, [arrName]: arr }

        case types.DELETE_ITEM:
            let arrDel = [ ...state[arrName] ];
            arrDel.splice(index, 1);
            return { ...state, [arrName]: arrDel };


        // LOCALISATION
        case types.ADD_ITEM_LOCALISATION:
            
            // console.log('ADD_ITEM_LOCALISATION', [ ...state.localisation, action.path ])
            // return { ...state, localisation: [ ...state.localisation, action.path ] }
            let newLoc = state.localisation.filter((loc) => !`${loc}.`.startsWith(`${action.path}.`)) 
            newLoc.push(action.path)
            console.log('ADD_ITEM_LOCALISATION', newLoc)
            return {  
              ...state, 
              localisation: newLoc 
            }
        case types.INIT_LOCALISATION:
            return { ...state, localisation: action.intialState }

        default:
            return state;
    }

}
