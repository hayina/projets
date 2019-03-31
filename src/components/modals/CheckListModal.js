import React, { useState, useEffect, useCallback } from 'react'
import CheckList from '../checkboxTree/CheckList';
import Modal from './Modal';


let CheckListModal = ({ vHandler, items, title, initialSelection=[] }) => {


    const [selection, setSelection] = useState(initialSelection)

    
    // const getFetchUrl = useCallback(() => {
    //     console.log('useCallback')
    // }, [selection]);

    // const getFetchUrl2 = () => {
    //     console.log('useCallback')
    // };

    // useEffect(() => {
    //     console.log('useEffect')
    //     return () => {
    //         console.log('return useEffect')
    //     }
    // }, [getFetchUrl])


   
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