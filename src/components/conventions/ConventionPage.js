import React, { useEffect } from 'react'
import { setBreadCrumb } from '../../actions'
import { connect } from 'react-redux'


let ConventionPage = ({ dispatch }) => {

    useEffect(() => {
        dispatch(setBreadCrumb("Convention"))
    }, [])

    return (
        <h1>Convention page</h1>
    )
}

export default connect()(ConventionPage)
