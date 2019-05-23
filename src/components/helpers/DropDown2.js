/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react';


const DropDown = ({ links }) => {

    useEffect(() => {
        document.addEventListener('mousedown', clickOutSide);
        return () =>  document.removeEventListener('mousedown', clickOutSide);
    }, []);

    function clickOutSide(e) {

        if(e.which !== 1) return

        [ ...document.querySelectorAll("._3_bar.show-drop") ].forEach((node) => {
            if(!node.contains(e.target)) {
                node.classList.remove('show-drop')
            }
        })
    }

    return (
        <span className="_3_bar ct_pr ripple" onClick={(e) => e.currentTarget.classList.toggle('show-drop')}>
            <div className="_drop-down">
            {
                links.map(({callback, label}, i) => (
                    <span className="_dr-item" key={i} onClick={ () => callback() }>{label}</span>
                ))
            }
            </div>
            <i className="fas fa-ellipsis-v dp-t"></i>
        </span>
    )
}


export default DropDown

