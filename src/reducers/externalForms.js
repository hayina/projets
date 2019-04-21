import types from '../types';


const initialState = {
    // partners: [],
    // localisations: [],
    pointsFocaux: [
        // {
        //     value: 5,
        //     label: 'Sahli Hamzaoui'
        // },
        // {
        //     value: 4,
        //     label: 'Rachid Ech-choudany'
        // }
    ],
    projets: [],
}

export const getExtPartners = (state) => state.externalForms.partners;
export const getLocalisations = (state) => state.externalForms.localisations;
export const getPointsFocaux = (state) => state.externalForms.pointsFocaux;
export const getUsers = (state) => state.externalForms.users;
export const getProjets = (state) => state.externalForms.projets;

export const externalForms = (state = initialState, action) => {

    const { arrName, item, index, value, path } = action;
    let arrDel

    switch (action.type) {

        // PARTENAIRES
        case types.ADD_ITEM:
            return { ...state, [arrName]: [...state[arrName], item] }

        case types.UPDATE_ITEM:

            let arr = [...state[arrName]];
            arr[index] = item;
            return { ...state, [arrName]: arr }

        case types.DELETE_ITEM_BY_INDEX:
            arrDel = [...state[arrName]];
            arrDel.splice(index, 1);
            return { ...state, [arrName]: arrDel };

        case types.DELETE_ITEM_BY_VALUE:

            arrDel = [...state[arrName]]
            let indexOf = arrDel.indexOf(value)
            if (indexOf !== -1) {
                arrDel.splice(indexOf, 1);
                return { ...state, [arrName]: arrDel };
            }

            return state

        case types.DELETE_ITEM_BY_PATH:
            console.log(state[arrName])
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


export const getInitialFormValues = (state) => state.initialFormValues;

export const initialFormValues = (state = {}, action) => {

    if (action.type === types.EDIT_FORM_VALUES) {
        // let newState = { ...state, ...action.initialValues }
        // console.log('REDUCER initialFormValues --->', newState)
        return action.initialValues;
    }

    return state;
}