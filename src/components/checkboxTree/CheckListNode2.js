import React, { useReducer } from 'react';

import './checkList.css';

export const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_SELECTION':
            return [];
        case 'ON_CHANGE':
            return selectPath(action.node, [...state], action.checked)
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


const CheckListNode = ({ items }) => {

    const [selection, dispatch] = useReducer(reducer, []);
    console.log(selection)
    const allDescendantLeafsSelected = (node) => allDescendantLeafs(node).every( leaf => selection.indexOf(leaf) !== -1 )
    const allDescendantLeafs = (node) => {
        let leafs = []
        const searchTree = ({children, path}) => {
            if (children) children.forEach(item => searchTree(item))
            else leafs.push(path)
        }
        searchTree(node);
        return leafs;
    }
    const someDescendantLeafsSelected = (node) => allDescendantLeafs(node).some( leaf => selection.indexOf(leaf) !== -1 )
    const renderCheckList = ({ nodes = [] }) => {

        return (

            <div className="check-list-container">

                {nodes.map((node, index) => {

                    const checkedInState = selection.indexOf(node.path) !== -1
                    const checked = checkedInState || allDescendantLeafsSelected(node)

                    let checkClass = '', checkFontAwesome = ''
                    if (checked) {
                        checkClass = 'checked'
                        checkFontAwesome = `fa-check-square form-check-fa`
                    } else if (someDescendantLeafsSelected(node)) {
                        checkClass = 'indeterminate'
                        checkFontAwesome = `fa-minus-square form-minus-fa`
                    } else {
                        checkFontAwesome = `fa-square form-empty-fa`
                    }

                    checkFontAwesome = <i className={
                        `far form-checkbox-fa ${checkFontAwesome} ${checkClass} ${ checkedInState ? 'checbox-bold':'' }`
                    }/>


                    return (

                        <div className="form-check" key={node.value}>
                            <input
                                id={`${node.path}`}
                                className="form-check-input"
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => dispatch({ type: 'ON_CHANGE', node, checked: e.target.checked })}
                            />
                            {checkFontAwesome}
                            <label className={`form-check-label ${checkClass} ${ checkedInState ? 'bold-label':'' }`} 
                                htmlFor={`${node.path}`}>
                                {node.label}
                            </label>
                            { node.children && renderCheckList({ nodes: node.children }) }
                        </div>
                    )
                }

                )}

            </div>
        )
    }

    return (
        <React.Fragment>
            <i className="fas fa-redo-alt reset-checkbox"
                onClick={ () => dispatch({ type: 'INIT_SELECTION' }) }
            />
            {renderCheckList({ nodes: items })}
        </React.Fragment>
    )
}


export default CheckListNode    