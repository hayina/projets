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

    return (
        <div id="dashboard-page">
        
            <h1>Dashboard</h1>
            <h2>{ sessionStorage.getItem("token") }</h2>
        </div>
    )
}

export default connect()(Dashboard)