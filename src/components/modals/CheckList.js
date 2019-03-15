import React, { useState } from 'react';
import { connect } from 'react-redux';

import Modal from './Modal';
import { hideModal } from '../../actions';

import CheckListNode from '../CheckListNode';

import './checkList.css';

const nodes = [
    {
        value: 1, label: 'Big cats', 
        children: [
            { value: 1, label: 'Lion' },
            { value: 2, label: 'Leopard' },
            { value: 3, label: 'Guepard' },
            { value: 4, label: 'Tiger' },
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
        value: 3, label: 'Canidae',
        children: [
            { value: 1, label: 'Loup' },
            { value: 2, label: 'Lycaon' },
            { value: 3, label: 'Renard' },
            { value: 4, label: 'Coyote' },
            { 
                value: 5, label: 'Chien',
                children: [
                    { value: 1, label: 'Pitbull' },
                    { value: 2, label: 'Berger' },
                    { value: 3, label: 'Labrador' },
                    { value: 4, label: 'Chiwawa' },
                    { value: 5, label: 'Dobermann' },
                    { value: 6, label: 'Caniche' },
                ]
            },
        ]
    },
]
let CheckList = ({ dispatch }) => {

    // console.log('CheckList', list);
    const [items, setItems] = useState([])

    return (

        <Modal
            handleValidation={() => dispatch(hideModal())}
            title="Choisir la localisation du projet"
        >
            <CheckListNode nodes={nodes} />
        </Modal>
    )
}


export default connect()(CheckList)