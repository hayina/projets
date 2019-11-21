import React from 'react';

import './percentage.css'

const Percentage = ({percentage, animation=true}) => {

    // console.log("Percentage -> animation", animation)
    return (

        // <div className="flex-wrapper">
        // <div className="single-chart">
        <svg viewBox="0 0 36 36" className="circular-chart orange">
            <path className="circle-bg"
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* <path className={`circle`} */}
            <path 
                className={`circle circle-progress-animation`}
                // className={`circle ${ animation ? 'circle-progress-animation' : '' }`}
                strokeDasharray={`${percentage}, 100`}
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="percentage">{percentage}%</text>
        </svg>
        // </div>
        // </div>

    )
}

export default Percentage