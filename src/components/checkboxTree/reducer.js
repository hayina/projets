export const initialState = []


export const reducer = (state, action) => {


    const { type, path, node, items, parentPath } = action


    console.log(type, `"${path}"`)


    let newState = []

    switch (type) {

        case 'INIT_SELECTION':
            return [...initialState];

        case 'ADD_VALUE':

            newState = [...state, path]
            let pathToSelect = getPathToSelect(items, path, parentPath, newState)

            newState = newState.filter(p => !p.startsWith(`${pathToSelect}.`))

            if( pathToSelect !== path )
                newState.push(pathToSelect)

            return newState;

        case 'DELETE_VALUE':

            newState = [...state]

            let indexOf = newState.indexOf(path)
            if (indexOf !== -1) { // this path is the one checked (exist in state)
                newState.splice(indexOf, 1)
            }
            else { // the parent is checked instead
 
                // Looking for the Parent path and all its leafs
                const {pathsToSelect, selectedParent} = getSelectParent(items, path, newState)
                // add all parent leafs to state
                newState.push(...pathsToSelect)
                // deselect parent path
                newState.splice(newState.indexOf(selectedParent), 1)
            }


            return newState
    }
}


const getSelectParent = (items, path, statePaths) => {

    // let leafs = [];
    let pathsToSelect = [];

    let selectedParent;


    // const selectLeafs = (parent) => {
    //     parent.children.forEach((item) => {
    //         if ( item.children ) { selectLeafs(item) }
    //         else { leafs.push(item.path) }
    //     })
    // }

    let checkedFound = false;
    const selectLeafs = (parent) => {


        parent.children.forEach((item) => {
            console.log(`forEach --------->`, item.path)

            if( item.path !== path ) {

                if( checkedFound || ! path.startsWith(item.path) || item.children === undefined )  {
                    pathsToSelect.push(item.path)
                } else {
                    selectLeafs(item) 
                }
                // if(checkedFound) {
                //     pathsToSelect.push(item.path)
                // } else {

                //     if( path.startsWith(item.path) && item.children ){
                //         selectLeafs(item) 
                //     } else {
                //         pathsToSelect.push(item.path)
                //     }
                // }


            } else {
                checkedFound = true
            }

        })
    }

    const searchTree = (items) => {

        items.forEach((item) => {
            
            console.log('searchTree ---->', item.path)

            if(path.startsWith(item.path)) {

                let indexOf = statePaths.indexOf(item.path)
                if( indexOf !== -1 ) { // THIS IS THE PARENT
                    console.log('THIS IS THE PARENT ---->', item.path)
                    selectedParent = item.path;
                    selectLeafs(item)
                } else {
                    searchTree(item.children)
                }

            }
        })
    }

    searchTree(items)
    console.log('Leafs to be selected ---->', pathsToSelect)
    return { pathsToSelect, selectedParent }
}

const getPathToSelect = (items, pathToSelect, path, statePaths) => {

    let leafs;
    // let pathToSelect;

    const updateLeafs = (parent) => {
        parent.children.forEach((item) => {
            if ( item.children ) { updateLeafs(item) }
            else { leafs.push(item.path) }
        })
    }

    const isAllChildrenSelected = ({children}) =>  children.every( ({path}) => statePaths.indexOf(path) !== -1 )
    const isAllLeafsSelected = () => leafs.every( leaf => statePaths.indexOf(leaf) !== -1 )

    const searchTree = (items) => {

        items.forEach((item) => {

            if (path.startsWith(item.path)) {

                console.log('---------> startsWith ->', item.path)

                if (item.children) {
                    leafs = []
                    updateLeafs(item)
                    console.log('Leafs ->', leafs)

                    if( isAllChildrenSelected(item) || isAllLeafsSelected() ){
                        pathToSelect = item.path
                    } else {
                        searchTree(item.children)
                    }
                }
            }
        })
    }

    searchTree(items)

    console.log('pathToSelect -------->', pathToSelect)

    return pathToSelect;
}




