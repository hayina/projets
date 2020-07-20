import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import { setBreadCrumb } from '../actions';



let NotFoundPage = ({ dispatch }) => {


    useEffect(() => {
        dispatch(setBreadCrumb("Tableau de bord"))
    }, [])


    return (
        <h1>404</h1>
    )
}

export default connect()(NotFoundPage)