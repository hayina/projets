export const initialState = []


export const reducer = (state = [], action) => {

    const { type, node, items } = action
    console.log(type, ` ---> "${node.path}"`)

    switch (type) {

        case 'INIT_SELECTION':
            return [...initialState];

        case 'ADD_VALUE':

            return selectPath(items, node, [...state])

        case 'DELETE_VALUE':

            return [...initialState];
    }
}


const selectPath = (items, node, statePaths) => {

    
    const findNodeLeafs = (node) => {
        node.children.forEach((item) => {
            if (item.children) { findNodeLeafs(item) }
            else { leafs.push(item.path) }
        })
    }
    const isAllLeafsSelected = () => leafs.every( leaf => statePaths.indexOf(leaf) !== -1 )

    let leafs = []
    const selectLeafs = () => {
        // PARENT
        if (node.children) {
            
            findNodeLeafs(node)
            leafs.forEach((leaf) => {
                if( statePaths.indexOf(leaf, 1) === -1 )
                    statePaths.push(leaf)
            })
            
        }
        // LEAF
        else {
            statePaths.push(node.path)
        }
    }


    selectLeafs()


    return statePaths

    // items.forEach((item) => {

    //     if ( `${item.path}.`.startsWith(`${uiRootPath}.`) ) {


    //         // PARENT
    //         if (item.children) {
        
    //             let isChecked = statePaths.indexOf(item.path, 1) !== -1
    //             if( !isChecked) {
    //                 selectAllLeafs(node)
    //             }
                
    //         }
    //         // LEAF
    //         else {
        
    //         }

    //     }
        
    // })

}




