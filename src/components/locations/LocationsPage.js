import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setBreadCrumb } from '../../actions'


const LocationPage = ({ dispatch }) => {

    useEffect(() => {
        dispatch(setBreadCrumb("Localisation"))
    }, [])

    return (
        <h1>Localisation page</h1>
    )
}

export default connect()(LocationPage) 