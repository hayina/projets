import React, { useState, useReducer } from 'react';

import { reducer, initialState } from './reducer';

const CheckListNode = ({ items }) => {

    const [selection, dispatch] = useReducer(reducer, initialState);

    const renderCheckList = ({ nodes = [], parentPath = '', isParentChecked=false }) => {

        console.log(`Selection ---->`, selection)
        // console.log(`isParentChecked ---->`, isParentChecked)

        return (

            <div className="check-list-container">

                {nodes.map((node, index) => {

                    const path = `${parentPath}${node.value}`;
                    const { children } = node;

                    // let selection = selection || [];
                    let indexOf = selection.indexOf(path);
                    const checkedInState = indexOf !== -1
                    const checked = isParentChecked || checkedInState

                    let checkClass = '', checkFontAwesome = ''
                    if (checked) {
                        checkClass = 'checked'
                        checkFontAwesome = `fa-check-square  form-check-fa`
                    } else {
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


                                    if (e.target.checked) {
                                        // pathValues.push(node.value);
                                        dispatch({
                                            type: 'ADD_VALUE',
                                            path,
                                            parentPath,
                                            node,
                                            items
                                        })
                                    }

                                    // CHECKED FALSE
                                    else {
                                        dispatch({
                                            type: 'DELETE_VALUE',
                                            path,
                                        })
                                    }



                                }}
                            />

                            {checkFontAwesome}


                            <label 
                                className={`form-check-label ${checkClass} ${ checkedInState ? 'font-weight-bold':'' }`} 
                                htmlFor={`${node.label}`}
                            >
                                {node.value} - {node.label} - "{node.path}"
                            </label>


                            {children &&
                                renderCheckList({
                                    nodes: children,
                                    parentPath: `${path}.`,
                                    isParentChecked: checked,
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
            {renderCheckList({ nodes: items })}
        </React.Fragment>
    )
}


export default CheckListNode    