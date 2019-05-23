import React, { useState } from 'react'
import CheckList from '../checkboxTree/CheckList';
import Modal from './Modal';


let CheckListModal = ({ vHandler, items, title, initialSelection=[] }) => {


    const [selection, setSelection] = useState(initialSelection)


    console.log('----> CheckListModal Rendering .........................')

    return (

        <Modal handleValidation={() => vHandler(selection) } title={title} >
            <CheckList
                items={items} 
                setSelection={setSelection} 
                selection={selection} 
            />
        </Modal>
    )
}

export default CheckListModal