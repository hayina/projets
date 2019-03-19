export const initialState = []


export const reducer = (state, action) => {


    const { type, path, node, items, parentPath } = action


    console.log(type,`"${path}"`)


    let newState = []

    switch (type) {

        case 'INIT_SELECTION':
            return [ ...initialState ];

        case 'ADD_VALUE':
            

            ///
            if( hasChildren(node) ) {

                // deselect all children
                newState = state.filter( p => ! p.startsWith(path) )

                //
                newState.push(path)
            }
            else {
                newState = [ ...state, path ]
            }

            ///

            return newState;



        case 'DELETE_VALUE':

            newState = [ ...state ]
            let indexOf = newState.indexOf(path)

            if( indexOf !== -1 ){ // the parent is not checked
                newState.splice(indexOf, 1)
            }
            else { // the parent is checked instead
                // let ancestors = getPathsStartedWith(path)
            }


            return newState;




    }
}

const getPathToSelect = (path, parentPath, items, stateItems) => {

    // path = "1.5.3"
    // parentPath = "1.5"
    // stateItems = ["1.1", "1.2", "1.5.1", "1.5.2"]
    const parentPathArray = parentPath.split(".") // [ '1', '5' ]
    // const pathArray = path.split(".") // [ '1', '5', '3' ]

    parentPathArray.forEach((p) => {

    })


    // paths = [ "1", "1.5", "1.5.3"]
    let pathV = ""
    paths.forEach((p) => {
        let pathV = pathV + ""

    })

}

const allDescendantLeafs = (node) => {
    let leafs = []
    let searchTree = node => {
        const { children } = node
        if( children && children.length ) {
            searchTree(children)
        }
        else {
            leafs.push(node)
        }
    }
    searchTree(node);
    return leafs
}


const allDescendantLeafsSelected = (node) => {

    return node.children
}

const hasChildren = ({ children }) => {
    return children && children.length > 0
}
