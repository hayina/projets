import React from 'react'

import './checkList.css';

const CheckList = ({items, selection, setSelection}) => {


    return (

        <div className="check-list-wr">
        
            {
                items.map((item, index) => {

                    const checked = selection.some(s => s.value === item.value)
                    
                    return (
                        <div className={ `check-item ${ checked ? 'checked' : '' }` } key={item.value}>
                        
                            <input 
                                id={item.value}
                                type="checkbox"
                                className="hide"
                                checked={ checked }
                                onChange={(e) => {

                                    let nSelection = [...selection]
                                    if (e.target.checked) {
                                        nSelection.push(item)
                                    } else {
                                        nSelection.splice(nSelection.indexOf(item), 1)
                                    }
                                    setSelection(nSelection)
                                }}
                            />

                            <i className={ `${ checked ? 'fas fa-check-square' : 'far fa-square' } check-color`}></i>
                            <label htmlFor={item.value} className={`form-check-label check-color bg-label`}>{item.label}</label>

                        
                        </div>
                    )

                })
            }
        </div>
    )
}

export default CheckList