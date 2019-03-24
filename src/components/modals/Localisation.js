import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import { addLocalisation, initLocalisation } from '../../actions';
import Modal from './Modal';
import { hideModal } from '../../actions';

import CheckList, { allDescendantLeafsSelected, nestedTree } from '../checkboxTree/CheckList';




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
            { value: 3, label: 'Guepard' },
        ]
    },
    {
        value: 2, label: 'Requins',
        children: [
            { value: 1, label: 'Great white shark' },
            { value: 2, label: 'Tiger shark' },
            { value: 3, label: 'Requin Marteau' },
            {
                value: 4, label: 'Chiens',
                children: [
                    { value: 1, label: 'Berger' },
                    { value: 2, label: 'Dobermann' },
                    { value: 3, label: 'Chiwawa' },
                    {
                        value: 4, label: 'Aigles',
                        children: [
                            { value: 1, label: 'Serf' },
                            { value: 2, label: 'Flaman Rose' },
                            { value: 3, label: 'Hiboux' },
                        ]
                    },
                ]
            },
        ]
    },
    {
        value: 3, label: 'Oiseaux',
        children: [
            { value: 1, label: 'Peroquet' },
            { value: 2, label: 'Moinaux' },
            { value: 3, label: 'Phenyx' },
        ]
    },
]


const mappedItems = mapItems(items)

let Localisation = ({ dispatch }) => {

    const [selection, setSelection] = useState([])
    // const checkListEl = useRef(null);
        
    const normalizeSelection = () => {

        // console.log('checkListEl.getSelection() ->', checkListEl.current.getSelection())
        dispatch(initLocalisation(selection))

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
 
                nestedTree(selection, mappedItems)
                // dispatch(hideModal())
            }}
            title="Choisir la localisation du projet"
        >

            <CheckList items={mappedItems}
                updateSelection={(paths) => setSelection(paths)}
                // ref={checkListEl}
            />
        </Modal>
    )
}


export default connect(    
    // (state) => ({
    //     localisations: getLocalisations(state),
    // })
)(Localisation)