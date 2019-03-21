import React, { useState } from 'react';
import { connect } from 'react-redux';

import Modal from './Modal';
import { hideModal } from '../../actions';

import CheckListNode from '../checkboxTree/CheckListNode2';




const mapItems = (items) => {

    const mapProperties = ({ items, parent=null, parentPath='', rootPath }) => {

        items.forEach(element => {

            if( parent ){
                element.parentValue = parent.value
                element.path = `${parentPath}.${element.value}`
                element.parentPath = parentPath
                element.rootPath = rootPath
            } else {
                element.path = `${element.value}`
                rootPath = element.path
            }

            element.leaf = element.children ? false : true

            if( element.children ){
                mapProperties({
                    items: element.children, 
                    parent: element,
                    parentPath: `${element.path}`,
                    rootPath
                })
            }
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
]
let CheckList = ({ dispatch }) => {


    return (

        <Modal
            handleValidation={() => {
                dispatch(hideModal())
            }}
            title="Choisir la localisation du projet"
        >
            <CheckListNode items={mapItems(items)} />
        </Modal>
    )
}


export default connect()(CheckList)