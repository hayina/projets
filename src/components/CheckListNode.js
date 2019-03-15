import React, { useState } from 'react';

const initialState = {
    // '.': [2],
    // '.1.': [1, 3],
    // '.3.': [3, 2, 5],
}




let CheckListNode = ({ nodes }) => {

    
    const [selected, setSelected] = useState(initialState);
    const [indeterminate, setIndeterminate] = useState([]);

    const renderCheckList = ({ nodes=[], path = '.', isParentChecked=false }) => {

        
        return (

            <div className="check-list-container">


                { console.log(`selected ---->`, selected) }
                { console.log(`indeterminate ---->`, indeterminate) }
                

                {nodes.map((node, index) => {

                    // const pathKey = [path]
                    let values = [ ...(selected[path] || []) ];
                    const indexOf = values.indexOf(node.value);
                    const checked = isParentChecked || ( indexOf !== -1 );
                    
                    return (

                    <div className="form-check" key={node.value}>
                        <input
                            id={`${node.label}`}
                            className="form-check-input"
                            type="checkbox"
                            checked={ checked }

                            onChange={(e) => {

                                if (e.target.checked) {
                                    values.push(node.value);
                                } else {
                                    values.splice(indexOf, 1);
                                }

                                if( values.length === 0 ){ // supprimer ce path 
                                    let { [path]: tempVal, ...newSelected } = selected;
                                    setSelected(newSelected);
                                } else {
                                    setSelected({ ...selected, [path]: values });

                                }


                                setIndeterminate([ ...indeterminate, path ])
                                
                            }}
                        />

                        <label className="form-check-label" htmlFor={`${node.label}`}>{node.value} - {node.label}</label>


                        <i className={`far fa-check-square form-checkbox-fa form-checked-fa ${
                            checked ? 'checked' : ''
                        }`}></i>
                        <i className={`far fa-square form-checkbox-fa form-not-checked-fa`}></i>

                        { node.children && 
                            renderCheckList({
                                nodes: node.children, 
                                path: `${path}${node.value}.`,
                                isParentChecked: checked
                            })
                        }
                    </div>
                )}
                
                )}

            </div>
        )
    }

    return renderCheckList({ nodes });
}


export default CheckListNode