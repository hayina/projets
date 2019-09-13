import React , { useEffect } from 'react'
import { connect } from 'react-redux';

import { setBreadCrumb } from '../actions'


const Dashboard = ({ dispatch }) => {


    useEffect(() => {
        dispatch(setBreadCrumb("Tableau de bord"))
    }, [])

    return (
        <div id="dashboard-page">
        
            <h1>Dashboard</h1>
        </div>
    )
}

export default connect()(Dashboard)