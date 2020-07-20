import React , { useEffect } from 'react'
import { connect } from 'react-redux';

import { setBreadCrumb } from '../actions'
import { getItemFromStorage } from '../helpers';


const Dashboard = ({ dispatch }) => {


    useEffect(() => {
        dispatch(setBreadCrumb("Tableau de bord"))
    }, [])


    return (
        <div id="dashboard-page">
        
            <h1>Dashboard</h1>
            {/* <h3>{ getItemFromStorage("token") || "token unvailable" }</h3> */}
        </div>
    )
}

export default connect()(Dashboard)