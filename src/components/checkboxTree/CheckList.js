import React, { useReducer, useState } from 'react';

import './checkList.css';

export const reducer = (state = [], action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'INIT_SELECTION':
            action.updateSelection([])
            return [];
        case 'ON_CHANGE':
            let newState = selectPath(action.node, [...state], action.checked)
            action.updateSelection(newState) // for the modal parent
            return newState
    }
}

const selectPath = (uiNode, statePaths, checked) => {
    const selectLeafs = ({ children, path }) => {
        if (children) { children.forEach(item => selectLeafs(item)) }
        else {
            let indexOf = statePaths.indexOf(path)
            if (!checked) { statePaths.splice(indexOf, 1) }
            else if (indexOf === -1) { statePaths.push(path) }
        }
    }
    selectLeafs(uiNode)
    return statePaths
}

export const nestedTree = (selection, items) => {   
    const uiNestedTree = []
    const searchTree = (items, parent) => {
        items.forEach((item) => {
            if ( selection.some((loc) => `${loc}.`.startsWith(`${item.path}.`)) ) {

                let node = { value : item.value, label: item.label }

                if( parent ) { parent.children.push(node) } 
                else { uiNestedTree.push(node) }

                if (item.children) {
                    node.children = []
                    searchTree(item.children, node)
                }
            }
        })
    }
    searchTree(items)
    console.log(`Nested Tree ----->`, uiNestedTree)
    return uiNestedTree
}

export const allDescendantLeafsSelected = (node, selection) => 
                            allDescendantLeafs(node).every(leaf => selection.indexOf(leaf) !== -1)
export const allDescendantLeafs = (node) => {
    let leafs = []
    const searchTree = ({ children, path }) => {
        if (children) children.forEach(item => searchTree(item))
        else leafs.push(path)
    }
    searchTree(node);
    return leafs;
}
export const someDescendantLeafsSelected = (node, selection) => 
                            allDescendantLeafs(node).some(leaf => selection.indexOf(leaf) !== -1)

const CheckList = ({ items, updateSelection }) => {

    const [selection, dispatch] = useReducer(reducer, []);
    const [expand, setExpand] = useState([])

    const getSelection = () => selection

    console.log(`selection`, selection)
    console.log(`expand`, expand)


    const renderCheckList = ({ nodes = [] }) => (

        nodes.map((node, index) => {

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

                <div className="form-check item-check" key={node.value}>
                    <input
                        id={`${node.path}`}
                        className="form-check-input"
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => dispatch({
                            type: 'ON_CHANGE', node, checked: e.target.checked,
                            updateSelection
                        })}
                    />
                    <div className="fa-container">
                        {node.children &&
                        <span className="fa-wr">
                            <i
                                className={`fas fa-angle fa-checkbox ${ showChildren ? 'fa-angle-down' : 'fa-angle-right' }`}
                                onClick={() => {
                                    let iExp = expand.indexOf(node.path)
                                    if (iExp !== -1) {
                                        expand.splice(iExp, 1)
                                        setExpand([...expand])
                                    } else {
                                        setExpand([...expand, node.path])
                                    }

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
                    {node.children && showChildren && renderCheckList({ nodes: node.children })}
                </div>
            )
        })



    )

    return (
        <div className="check-list-container">
            <i className="fas fa-redo-alt reset-checkbox"
                onClick={() => dispatch({ type: 'INIT_SELECTION', updateSelection })}
            />
            {renderCheckList({ nodes: items })}
            </div>
    )
}


export default CheckList    