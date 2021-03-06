import React, { useState } from 'react';

import { allDescendantLeafsSelected, someDescendantLeafsSelected, findSelectedLeafs, findTreeParents, findTreeLeafs } from './helpers';

import './checkTree.css';


export const CheckTree = ({ items, selection, setSelection }) => {

    const [expand, setExpand] = useState([])

    
    // console.log(`selection`, selection)
    // console.log(`expand`, expand)

    const renderCheckTree = ({ items }) => {

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
                        className="hide"
                        type="checkbox"
                        checked={checked}
                        onChange={ (e) => {
                            setSelection(findSelectedLeafs(node, [...selection], e.target.checked))
                        }}
                    />

                    <div className="fa-container">
                        { node.children && node.children.length > 0 &&
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

                    <label className={`checkbox-label form-check-label ${checkClass} ${checkedInState ? 'bold-label' : ''}`}
                        htmlFor={`${node.path}`}>
                        {node.label.toLowerCase()} 
                        {/* - {node.path} */}
                    </label>

                    {node.children && node.children.length > 0 && showChildren && renderCheckTree({ items: node.children })}

                </div>
            )
        })



    }

    return (
        <div className="check-list-container">

            <i  className="fas fa-redo-alt reset-checkbox" onClick={ () => setSelection([]) } />
            <i  className="fas fa-redo-alt reset-checkbox" onClick={ () => setSelection(findTreeLeafs(items)) } />
            <i  className="fas fa-redo-alt reset-checkbox" onClick={ () => setExpand([]) } />
            <i  className="fas fa-redo-alt reset-checkbox" onClick={ () => setExpand(findTreeParents(items)) } />

            { renderCheckTree({ items }) }

        </div>
    )
}


export const NestedTree = ({items, onDelete}) => 

    
    items.map((item, i) => {

        const hasChildren = item.children && item.children.length > 0

        return (
            <div key={item.path} className={`item-tree-wr ${ hasChildren ? '':'mtm_ls' }`} >

                <i className={`fas fa-angle fa-checkbox fa-angle-${ hasChildren ? 'right':'right' }`}></i>
                <span className="leaf-info">
                    <i  
                        className="fa fa-times delete-item-list" 
                        onClick={ () => onDelete(item.path) }
                    />
                    <span className="item-label i-color">{item.label.toLowerCase()}</span>
                </span>

                { hasChildren && <NestedTree items={item.children} onDelete={onDelete} /> }

            </div>
        )

    })





