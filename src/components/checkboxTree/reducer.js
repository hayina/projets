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

            if (indexOf !== -1) { // the parent is not checked
                newState.splice(indexOf, 1)
            }
            else { // the parent is checked instead
                // let ancestors = getPathsStartedWith(path)


            }


            return newState
    }
}


const getSelectParent = (items, path, statePaths) => {

    items.forEach((item) => {


        if(path.startsWith(item.path)) {

            if( statePaths.indexOf(item.path) !== -1 ) {
                statePaths.splice( statePaths.indexOf(item.path), 1 )
            }

            /// and now what ??

        }
    })

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

                    // console.log("isAllLeafsSelected -> ", isAllLeafsSelected, `"${item.path}"`)
                    // console.log("isAllChildrenSelected -> ", x)
                    if( isAllChildrenSelected(item) || isAllLeafsSelected() ){

                        pathToSelect = item.path
                        // statePaths = statePaths.filter(p => !p.startsWith(`${item.path}.`))
                        // statePaths.push(item.path)
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




