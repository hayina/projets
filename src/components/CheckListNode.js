import React, { useState, useReducer } from 'react';

const initialState = {
    // '.': [2],
    // '.1.': [1, 3],
    // '.3.': [3, 2, 5],
}


const reducer = (state, action) => {


    const { type, path, value, values, parentNode, parentPath, level } = action

    // let pathValues = [ ...( state[ path ] || [] ) ];
    let pathValues = state[path] || [];
    let parentPathValues = state[parentPath] || [];


    console.log(type)
    // console.log(`"${path}" -> ${value} -> ${values}`)
    console.log(`"${path}" -> (${pathValues}) -> ${value}`)

    switch (type) {

        case 'INIT_SELECTION':
            return { ...initialState };

        case 'ADD_VALUE_TO_PATH':

            /// delete children path
            // value
            // level
            for (const [key, value] of Object.entries(state)) { 

                const array = key.slice(1, -1).split('.');
                console.log("key", key, array)
            }

            if (level > 1) {
                let parentChildrenLength = parentNode.children ? parentNode.children.length : 0
                console.log(`-> ${parentChildrenLength}`)

                if ( pathValues.length + 1 === parentChildrenLength ) {
                    let { [path]: pathToRemove, ...newState } = state;
                    return { ...newState, [parentPath]: [ ...parentPathValues, parentNode.value] };
                }
            }
            return { ...state, [path]: [...pathValues, value] };

        case 'ADD_VALUES_TO_PATH':
            return { ...state, [path]: [...pathValues, ...values] };

        case 'DELETE_VALUE_FROM_PATH':

            // console.log(pathValues)


            if (pathValues.length === 1) {
                let { [path]: pathToRemove, ...newState } = state;
                return newState;
            }
            pathValues.splice(pathValues.indexOf(value), 1)
            return { ...state, [path]: [...pathValues] };



    }
}

let CheckListNode = ({ nodes }) => {


    const [selection, dispatch] = useReducer(reducer, initialState);
    // const [indeterminate, setIndeterminate] = useState([]);


    const showAfterTimeout = () => {
    }

    const renderCheckList = ({
        nodes = [], path = '.', level = 1,
        parentNode, parentPath, isParentChecked = false
    }) => {

        console.log(`Selection ---->`, selection)

        return (

            <div className="check-list-container">

                {nodes.map((node, index) => {

                    const { children } = node;

                    let pathValues = selection[path] || [];
                    let indexOfNodeValue = pathValues.indexOf(node.value);

                    const pathForChildren = `${path}${node.value}.`;
                    let selectedChildrenLength = 0;
                    let childrenLength = children ? children.length : 0

                    if (selection[pathForChildren]) {
                        selectedChildrenLength = selection[pathForChildren].length;
                        console.log('selectedChildrenLength', selectedChildrenLength)
                        console.log('childrenLength', children.length)
                    }

                    const checked = isParentChecked || (indexOfNodeValue !== -1)
                    // || (childrenLength > 0 && childrenLength === selectedChildrenLength)


                    let checkClass = '', checkFontAwesome = ''
                    if (checked) {
                        checkClass = 'checked'
                        checkFontAwesome = `fa-check-square  form-check-fa`
                    }
                    else if (selectedChildrenLength > 0) {
                        checkClass = 'indeterminate'
                        checkFontAwesome = `fa-minus-square  form-minus-fa`
                    }
                    else if (selectedChildrenLength === 0) {
                        checkFontAwesome = ` fa-square form-empty-fa`
                    }

                    checkFontAwesome = <i className={`far form-checkbox-fa ${checkFontAwesome} ${checkClass}`} />


                    return (

                        <div className="form-check" key={node.value}>
                            <input
                                id={`${node.label}`}
                                className="form-check-input"
                                type="checkbox"
                                checked={checked}

                                onChange={(e) => {

                                    console.log('IS Checked ->', e.target.checked, `"${path}" -> "${parentPath}"`)

                                    if (e.target.checked) {
                                        // pathValues.push(node.value);
                                        dispatch({
                                            type: 'ADD_VALUE_TO_PATH',
                                            value: node.value,
                                            path,
                                            parentPath,
                                            parentNode,
                                            level
                                        })
                                    }

                                    // CHECKED FALSE
                                    else {




                                        // if (level > 1) {
                                        console.log(`isParentChecked ---->`, isParentChecked)
                                        // selected[parentPath].indexOf(parentNode.value) !== -1 OR
                                        if (isParentChecked) {

                                            // console.log(`DELETE_VALUE_FROM_PATH ---->`, parentNode.value, parentPath)

                                            dispatch({
                                                type: 'DELETE_VALUE_FROM_PATH',
                                                value: parentNode.value,
                                                path: parentPath
                                            })

                                            dispatch({
                                                type: 'ADD_VALUES_TO_PATH',
                                                values: parentNode.children.reduce((newValues, { value }) => {
                                                    if (value !== node.value)
                                                        newValues.push(value)
                                                    return newValues
                                                }, []),
                                                path
                                            })


                                        }
                                        else {

                                            dispatch({
                                                type: 'DELETE_VALUE_FROM_PATH',
                                                value: node.value,
                                                path
                                            })
                                        }
                                        // }
                                    }

                                    console.log(`level ---->`, level)
                                    //Stackoverflow question
                                    // setTimeout(() => showAfterTimeout(), 1000)

                                }}
                            />

                            {checkFontAwesome}


                            <label className={`form-check-label ${checkClass}`} htmlFor={`${node.label}`}>
                                {node.value} - {node.label} ({level})
                            </label>


                            {children &&
                                renderCheckList({
                                    nodes: children,
                                    parentNode: node,
                                    parentPath: path,
                                    path: pathForChildren,
                                    isParentChecked: checked,
                                    level: level + 1,
                                    // childrenLength: children.length,
                                })
                            }
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
                onClick={() => {
                    // setIndeterminate([]);
                    dispatch({ type: 'INIT_SELECTION' });
                }}
            />
            {renderCheckList({ nodes })}
        </React.Fragment>
    )
}


export default CheckListNode