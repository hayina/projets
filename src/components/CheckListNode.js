import React, { useState } from 'react';

const initialState = [
    {
        path: '.',
        values: [1, 2]
    },
    {
        path: '.1.',
        values: [5, 8]
    },
    {
        path: '.5.',
        values: [3, 12]
    },
];




let CheckListNode = ({ nodes }) => {

    // console.log('CheckList', list);
    const [selected, setSelected] = useState([]);

    const checkListNode = (nodes, path='.') => {



        return (

            <div className="check-list-container">

                => ( {selected.map((i) => `${i} - `)} )
        
        {nodes.map((node, index) => (

                    <div className="form-check" key={node.id}>
                        <input
                            id={`${node.nom}`}
                            className="form-check-input"
                            type="checkbox"
                            checked={selected.indexOf(node.id) !== -1}

                            onChange={(e) => {

                                if (e.target.checked) {
                                    setSelected([...selected, node.id]);
                                } else {
                                    selected.splice(selected.indexOf(node.id), 1);
                                    setSelected([...selected]);
                                }
                            }}
                        />
                        <label className="form-check-label" htmlFor={`${node.nom}`}>{node.id} - {node.nom}</label>

                        {node.fractions && checkListNode(node.fractions, path)}
                    </div>
                ))}

            </div>
        )
    }

    return checkListNode(nodes);
}


export default CheckListNode