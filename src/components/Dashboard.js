import React , { useEffect } from 'react'
import { connect } from 'react-redux';

import { setBreadCrumb } from '../actions'


const Dashboard = ({ dispatch }) => {


    useEffect(() => {
        dispatch(setBreadCrumb("Tableau de bord"))
    }, [])

    // setTimeout(function(){
    //     console.log("First function call...");
    //  }, 2000);

    //  setTimeout(function(){
    //     console.log("No time function call...");
    //  });

    const onKeyDown = (e) => {

        const keyCode = e.keyCode || e.which;
        //ENTER
        console.log(keyCode)

    }

    return (
        <div id="dashboard-page">
        
            <h1>Dashboard</h1>
            <input onKeyDown={onKeyDown} type="text"/>
            <h2>{ sessionStorage.getItem("token") }</h2>
        </div>
    )
}

export default connect()(Dashboard)