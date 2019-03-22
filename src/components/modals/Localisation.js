import React, { useState, useReducer } from 'react';
import { connect } from 'react-redux';

import { addLocalisation, initLocalisation } from '../../actions';
import { getLocalisations } from '../../reducers/externalForms';
import Modal from './Modal';
import { hideModal } from '../../actions';

import CheckList, { allDescendantLeafsSelected } from '../checkboxTree/CheckList';




const mapItems = (items) => {

    console.log(`Mapping items -------------------------------------> !!!`)

    const mapProperties = ({ items, parentPath }) => {

        items.forEach(el => {

            if (parentPath) el.path = `${parentPath}.${el.value}`
            else el.path = `${el.value}`

            if (el.children)
                mapProperties({ items: el.children, parentPath: `${el.path}` })
        });

    }

    mapProperties({ items })
    return items
}



const items = [
    {
        value: 1, label: 'Big cats',
        children: [
            { value: 1, label: 'Lion' },
            { value: 2, label: 'Leopard' },
            { value: 4, label: 'Guepard' },
        ]
    },
    {
        value: 2, label: 'Requins',
        children: [
            { value: 1, label: 'Great white shark' },
            { value: 2, label: 'Tiger shark' },
            { value: 3, label: 'Requin Marteau' },
        ]
    },
    {
        value: 3, label: 'Requins',
        children: [
            { value: 1, label: 'Great white shark' },
            { value: 2, label: 'Tiger shark' },
            { value: 3, label: 'Requin Marteau' },
            {
                value: 4, label: 'Requins',
                children: [
                    { value: 1, label: 'Great white shark' },
                    { value: 2, label: 'Tiger shark' },
                    { value: 3, label: 'Requin Marteau' },
                    {
                        value: 4, label: 'Requins',
                        children: [
                            { value: 1, label: 'Great white shark' },
                            { value: 2, label: 'Tiger shark' },
                            { value: 3, label: 'Requin Marteau' },
                        ]
                    },
                ]
            },
        ]
    },
    {
        value: 4, label: 'Requins',
        children: [
            { value: 1, label: 'Great white shark' },
            { value: 2, label: 'Tiger shark' },
            { value: 3, label: 'Requin Marteau' },
        ]
    },
]


const mappedItems = mapItems(items)
const reducer = (state, action) => {
    if( action.type === 'ADD_VALUE') {

        console.log(`Normalized selection IN REDUCER`, [...state, action.path])
        return [...state, action.path]
    }
    else if( action.type === 'INIT') {
        return []
    }
        
}
let Localisation = ({ dispatch, localisations }) => {

    const [selection, setSelection] = useState([])
    const [normalizedSelection, selectionDispatch] = useReducer(reducer, [])
        



    const normalizeSelection = () => {

        dispatch(initLocalisation())

        const searchTree = (items) => {
            items.forEach((item) => {
                if (item.children) {
                    if (allDescendantLeafsSelected(item, selection)) {
                        // console.log(`all Descendant Leafs Selected ->`, item.path)
                        dispatch(addLocalisation(item.path))
                    } else {
                        searchTree(item.children)
                    }
                }
            })
        }

        searchTree(mappedItems)
        
    }

    return (



        <Modal
            handleValidation={() => {
                normalizeSelection()
 

                // dispatch(hideModal())
            }}
            title="Choisir la localisation du projet"
        >

            <CheckList items={mappedItems}
                updateSelection={(paths) => setSelection(paths)}
            />
        </Modal>
    )
}


export default connect(    
    (state) => ({
        localisations: getLocalisations(state),
    })
)(Localisation)