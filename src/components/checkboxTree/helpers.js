

export const findSelectedLeafs = (uiNode, statePaths, checked) => {
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


// ["1.1", "1.2", "1.3"] => ["1"]
export const convertToSelectionByParent = (leafsSelection, items) => {

    if( leafsSelection === undefined || leafsSelection.length === 0 ) return []

    let selection = [ ...leafsSelection ]

    const searchTree = (items) => {
        items.forEach((item) => {
            // on peut optimiser par just who startWith ...
            if( selection.some(sPath => `${sPath}.`.startsWith(`${item.path}.`)) ) {
            
                if (item.children) {
                    if (allDescendantLeafsSelected(item, selection)) {
                        // we delete the leafs
                        selection = selection.filter(path => !`${path}.`.startsWith(`${item.path}.`)) 
                        // we add the parent
                        selection.push(item.path)
                    } else {
                        searchTree(item.children)
                    }
                }
            }
        })
    }

    searchTree(items)
    return selection 
}

// ["1"] => ["1.1", "1.2", "1.3"]
export const convertToSelectionByLeafs = (parentSelection, items) => {

    if( parentSelection === undefined || parentSelection.length === 0 ) return []

    let selection = [ ...parentSelection ] 

    const searchTree = (items) => {
        items.forEach((item) => {
            if (item.children) {

                let indexOf = selection.indexOf(item.path)
                // if the parent is checked
                if ( indexOf !== -1 ) {
                    // we delete the parent
                    selection.splice(indexOf, 1)
                    // we add his descendant leafs
                    selection.push(...allDescendantLeafs(item))
                } else {
                    searchTree(item.children)
                }
            }
        })
    }

    searchTree(items)
    return selection 
}


export const nestedTree = (selection, items) => {   

    const uiNestedTree = []
    const searchTree = (items, parent) => {
        items.forEach((item) => {
            if ( selection.some((loc) => `${loc}.`.startsWith(`${item.path}.`)) ) {

                let node = { 
                    value : item.value, 
                    label: item.label, 
                    path: item.path,
                    inState: selection.includes(item.path) 
                }

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



export const allDescendantLeafs = (node) => {
    let leafs = []
    const searchTree = ({ children, path }) => {
        if (children) children.forEach(item => searchTree(item))
        else leafs.push(path)
    }
    searchTree(node);
    return leafs;
}

export const someDescendantLeafsSelected = (node, selection) => {
    return allDescendantLeafs(node).some(leaf => selection.indexOf(leaf) !== -1)
}

export const allDescendantLeafsSelected = (node, selection) => {
    return allDescendantLeafs(node).every(leaf => selection.indexOf(leaf) !== -1)
}