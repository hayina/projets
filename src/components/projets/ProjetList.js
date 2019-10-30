/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import useAjaxFetch from '../hooks/useAjaxFetch';
import './projetList.css'
import { setBreadCrumb } from '../../actions';
import SearchBar from './SearchBar';
import Percentage from './Percentage';
import DropDown from './DropDown';
import { USER_ROLES } from '../../types';
import { getRoles, getUserID, getUserType } from '../../reducers/login';
import { canHeEdit } from '../../security';

let ProjetList = ({dispatch, roles, userID, userType}) => {



    const [projets, setProjets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(false);
    const [filters, setFilters] = useState({});


    function deleteProjet(idProjet, index) {

        useAjaxFetch({
            url: `/projets/${idProjet}`,
            method: 'DELETE',
            success: () => {
                projets.splice(index, 1);
                setProjets([...projets])
            },
        })
    }

    useEffect(() => {
        dispatch(setBreadCrumb("Rechercher les projets"))
    }, [])

    useEffect(() => {
        
    

        console.log('filters', filters)

        if( Object.keys(filters).length === 0 ) return

        // if( ! filters.acheteur )

        let cancel = false
        setLoading(true)
        setErrors(false)

        useAjaxFetch({
            url: 'projets',
            params: filters,
            success: (data) => {
                if(cancel) return
                setProjets(data)
                setLoading(false)
            },
            error: () => {
                if(cancel) return
                setLoading(false)
                setErrors(true)
                // setProjets(_projets)
            }
        })
        return () => cancel = true
    }, [filters])






    const renderResultsList = () => (

        projets.length > 0 ?
        <React.Fragment>       
        <div className="projets-nav box-sh box-br">
            { loading ? renderLoading() : 
                <div className="result-info">{ projets.length } Projets retrouvés</div> }
        </div>
        <div className="projets-results ">
        {

        projets.map((projet, index) => {

         

            return (
                <div className="projet-item box-sh box-br no_dc" key={projet.id}>

                    {
                        canHeEdit(userID, projet.chargeSuivID, roles, userType) &&
                        <DropDown { ...{ projet, deleteProjet, index } } />
                    }

                    <div className="projet-label">
                        <Link to={`/projets/detail/${projet.id}`} >
                            <strong>{index+1}.</strong> {projet.intitule}
                        </Link>
                    </div>
                    {/* <div className="projet-label"><strong>{projet.id}.</strong> {projet.intitule}</div> */}

                    <div className="proj-infos-wr">                    

                        <div className="proj-infos">
                            <div className="projet-loc">
                                <i className="_fa_lpr fas fa-map-marker-alt"></i>
                                { 
                                    Object.keys(projet.localisations).map((key) => {
                                        return <span className="loc-label" key={key}>{projet.localisations[key]}</span>
                                    })
                                }
                                
                            </div>
                            <div className="projet-mo">
                                {/* <i className="_fa_lpr far fa-building"></i> */}
                                <i className="_fa_lpr fas fa-landmark"></i>
                                <span className="mo-label">{projet.maitreOuvrage}</span>
                            </div>
                        </div>
                        <div className="projet-per">
                            <Percentage percentage={projet.taux} />
                        </div>
                    </div>


                </div>
            )
        })
        }
        </div>
        </React.Fragment>   
        : <div className="empty-list">0 projets retrouvés</div>
    )

    const renderLoading = () => (
        <div className="loading-list box-sh">Loading ....</div>
    )
    const renderErrors = () => (
        <div className="api-error">Une erreur s'est produit<i className="fas fa-info-circle"></i></div>
    )

    return (
        <div className="projets-wr">
            <SearchBar setFilters={setFilters}/>
            { loading ? renderLoading() : ( !errors ? renderResultsList() : renderErrors() ) }
        </div>
    )



}

export default connect(
    (state) => ({
        roles: getRoles(state),
        userID: getUserID(state),
        userType: getUserType(state)
    })
)(ProjetList)