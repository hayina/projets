import React, { useState } from 'react'
import CheckList from '../checkboxTree/CheckList';
import Modal from './Modal';


let CheckListModal = ({ vHandler, items, title, initialSelection=[] }) => {


    const [selection, setSelection] = useState(initialSelection)

   
    console.log('----> CheckListModal Rendering .........................')

    return (

        <Modal
            handleValidation={() => {
                console.log('CheckListModal ---> handleValidation')
                vHandler(selection)
                // dispatch(
                //     arraySetting('localisation', convertToSelectionByParent(selection, items))
                // )
 
                // nestedTree(selection, mappedItems)
                // dispatch(hideModal())
            }}
            title={title}
        >

            <CheckList
                items={items} 
                setSelection={setSelection} 
                selection={selection} 
            />
        </Modal>
    )
}

export default CheckListModal