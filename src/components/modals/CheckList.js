import React, {useState} from 'react';
import { connect } from 'react-redux';

import Modal from './Modal';
import { hideModal } from '../../actions';

import CheckListNode from '../CheckListNode';

import './checkList.css';


let CheckList = ({ nodes, dispatch }) => {

    // console.log('CheckList', list);
    const [ items, setItems ] = useState([])

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