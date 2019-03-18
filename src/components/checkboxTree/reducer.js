export const initialState = []


export const reducer = (state, action) => {


    const { type, path, node } = action


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
