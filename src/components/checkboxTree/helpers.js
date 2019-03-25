

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

export const normalizeSelectionByParent = (leafsSelection, items) => {

    let selectionByParent = [ ...leafsSelection ] || []

    const searchTree = (items) => {
        items.forEach((item) => {
            if (item.children) {
                if (allDescendantLeafsSelected(item, selectionByParent)) {
                    selectionByParent = selectionByParent
                                                .filter(path => !`${path}.`.startsWith(`${item.path}.`)) 
                    selectionByParent.push(item.path)
                } else {
                    searchTree(item.children)
                }
            }
        })
    }

    searchTree(items)
    return selectionByParent 
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