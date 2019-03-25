import React, { useState } from 'react';

import { allDescendantLeafsSelected, someDescendantLeafsSelected, findSelectedLeafs } from './helpers';

import './checkList.css';


export const CheckList = ({ items, selection, setSelection }) => {

    const [expand, setExpand] = useState([])

    
    console.log(`selection`, selection)
    console.log(`expand`, expand)

    const renderCheckList = ({ items }) => {

        return items.map((node, index) => {

            const checkedInState = selection.indexOf(node.path) !== -1
            const checked = checkedInState || allDescendantLeafsSelected(node, selection)

            let checkClass = '', checkFontAwesome = ''
            if (checked) {
                checkClass = 'checked'
                checkFontAwesome = `fas fa-check-square form-check-fa`
            } else if (someDescendantLeafsSelected(node, selection)) {
                checkClass = 'indeterminate'
                checkFontAwesome = `fas fa-minus-square form-minus-fa`
            } else {
                checkFontAwesome = `far fa-square form-empty-fa`
            }

            checkFontAwesome = <i className={
                `form-checkbox-fa fa-checkbox ${checkFontAwesome} ${checkClass} ${checkedInState ? 'checbox-bold' : ''}`
            } />

            let showChildren = expand.includes(node.path)
   

            return (

                <div className="form-check item-check" key={node.path}>

                    <input
                        id={`${node.path}`}
                        className="form-check-input"
                        type="checkbox"
                        checked={checked}
                        onChange={ (e) => {
                            setSelection(findSelectedLeafs(node, [...selection], e.target.checked))
                        }}
                    />

                    <div className="fa-container">
                        { node.children &&
                            <span className="fa-wr">
                                <i
                                    className={`fas fa-angle fa-checkbox ${ showChildren ? 'fa-angle-down' : 'fa-angle-right' }`}
                                    onClick={() => {

                                        let iExp = expand.indexOf(node.path)
                                        let newExpand = [...expand]

                                        if (iExp !== -1) { newExpand.splice(iExp, 1) } 
                                        else { newExpand.push(node.path) }

                                        setExpand(newExpand) 
                                    }}
                                />
                            </span>
                        }

                        {checkFontAwesome}

                    </div>

                    <label className={`form-check-label ${checkClass} ${checkedInState ? 'bold-label' : ''}`}
                        htmlFor={`${node.path}`}>
                        {node.label} - {node.path}
                    </label>

                    {node.children && showChildren && renderCheckList({ items: node.children })}

                </div>
            )
        })



    }

    return (
        <div className="check-list-container">

            <i  className="fas fa-redo-alt reset-checkbox" onClick={ () => setSelection([]) } />
            <i  className="fas fa-redo-alt reset-checkbox" onClick={ () => setExpand([]) } />

            { renderCheckList({ items }) }

        </div>
    )
}


export const NestedTree = ({items}) => 

    items.map((item) => 

        <div key={item.path} className="item-wr item-info" >
            <i className="fa fa-times delete-item-list"
                onClick={() => console.log(item.path)}></i>

            <i className="fas fa-angle fa-checkbox fa-angle-right"></i>
            <span className="item-label">{item.label} </span>
            { item.children && <NestedTree items={item.children} /> }
        </div>

    )


