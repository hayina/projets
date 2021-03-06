/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import useAjaxFetch from '../hooks/useAjaxFetch';
import './projetList.css'
import { setBreadCrumb } from '../../actions';
import SearchBar from './SearchBar';
import Percentage from './Percentage';
import DropDown from './DropDown';
import { getRoles, getUserID, getPermissions } from '../../reducers/login';
import { SpinnerWh, ApiError } from '../helpers';
import { accessEditProject } from '../../security';



const INITIAL_PAGE = 1
const DEFAULT_SIZE = 10

const initialState = {
    projets: [],
    totalElements: null,
    totalPages: null,
    currentPage: INITIAL_PAGE,
    pageSize: DEFAULT_SIZE,
    fromPaging: false,
    loading: false,
    errors: false,
}

let ProjetList = ({dispatch, roles, userID, history}) => {



    const [state, setState] = useState(initialState);
    const [filters, setFilters] = useState({});


    const { projets, totalElements, totalPages, currentPage, pageSize, fromPaging, loading, errors } = state
    const loadingFromPaging = loading && fromPaging  
    const loadingFromCriteria = loading && !fromPaging  


    useEffect(() => {
        dispatch(setBreadCrumb("Rechercher les projets"))
    }, [])



    const paramsRef = useRef(null)
    paramsRef.current = history.location.search


    const deleteProjet = (idProjet, index) => {
        
        useAjaxFetch({
            url: `/projets/${idProjet}`,
            method: 'DELETE',
            success: () => {
                projets.splice(index, 1);
                setState({ ...state, projets: [ ...state.projets ] })
            },
        })
    }



    useEffect(() => {

        console.log(">>>> useEffect -> filters ...", filters)

        if( Object.keys(filters).length === 0 ) return

        let cancel = false
        const page = fromPaging ? currentPage+1 : INITIAL_PAGE
        const preCallState = { ...state, loading: true, errors: false, currentPage: page }
        setState(preCallState)


        useAjaxFetch({
            url: 'projets',
            params: { 
                ...filters, 
                page, 
                size: pageSize,
                count: !fromPaging 
            },
            success: (data) => {

                if(cancel) return

                const newState = {}
 
                newState.loading = false
                newState.projets = fromPaging ? [ ...state.projets, ...data.content ] : data.content
                newState.fromPaging = false

                if(!fromPaging) {
                    newState.totalElements = data.totalElements
                    newState.totalPages = Math.ceil(data.totalElements/pageSize)
                } 
                
                setState({ ...preCallState, ...newState })
            },
            error: () => {
                if(cancel) return
                setState({ ...preCallState, loading: false, errors: true, fromPaging: false })
            }
        })



        return () => cancel = true
    }, [filters])

    const loadNextPage = () => {
        setState({ ...state, fromPaging: true })
        setFilters({ ...filters })
    }



    const highlightText = (text, higlight) => {
        /**
         * Split text on higlight term, include term itself into parts, ignore case
         */
        var parts = text.split(new RegExp(`(${higlight})`, 'gi'));
        return (
            <span>{parts.map(part => part.toLowerCase() === higlight.toLowerCase() ? 
                <span className="highlight-text">{part}</span> : part)}
            </span>)
    }

    const renderResultsList = () => {
        

        return (
            <div className="projets-results">
                { projets.map((projet, index) => (
                <div className="projet-item box-sh box-br no_dc" key={projet.id}>

                {
                    accessEditProject(userID, projet.chargeSuivID, roles) &&
                    <DropDown { ...{ projet, deleteProjet, index } } />
                }

                <div className="projet-label">
                    <Link to={`/projets/detail/${projet.id}`} >
                        <strong>{index+1}. </strong>
                        {/* <strong>{projet.id}.({projet.daysFromLastRepriseTilNow})</strong> */}
                        
                        { filters.intitule && filters.intitule.length > 0 ? 
                            highlightText(projet.intitule, filters.intitule) : projet.intitule } 
                    </Link>
                </div>
                {/* <div className="projet-label"><strong>{projet.id}.</strong> {projet.intitule}</div> */}

                <div className="proj-infos-wr">                    

                    <div className="proj-infos">
                        <div className="projet-loc">
                            <i className="_fa_lpr fas fa-map-marker-alt"></i>
                            { 
                                Object.keys(projet.localisations).map((key) => (
                                    <span className="loc-label" key={key}>{projet.localisations[key]}</span>
                                ))
                            }
                            
                        </div>
                        <div className="projet-mo">
                            {/* <i className="_fa_lpr far fa-building"></i> */}
                            <i className="_fa_lpr fas fa-landmark"></i>
                            <span className="mo-label">{projet.maitreOuvrage}</span>
                        </div>
                    </div>
                    <div className="projet-per">
                        <Percentage percentage={ projet.taux || 0 } animation={false} />
                    </div>
                </div>


            </div>
            ))}
            </div>
        )
    }

    const renderResultsInfo = () => (
        <div className="projets-nav nav-with-loader">
            <div className="result-info">
                { loadingFromCriteria ? `Chargement ....` : `${totalElements} resultats`}
            </div> 
            {
                loadingFromCriteria && (
                    <div className={`spinner-container`}>
                        <SpinnerWh />
                    </div>
                )
            }
        </div>
    )



    // const Errors = () => (
    //     <div className="api-error">Une erreur s'est produit<i className="fas fa-info-circle"></i></div>
    // )

    const renderPagingLoader = () => {
        
        
        return (loading || currentPage !== totalPages) &&
        (
            <div className={`paging-loader nav-with-loader ${ loadingFromPaging ? 'disabled' : '' }`} >
                <i className="fas fa-chevron-down" onClick={loadNextPage}></i>
                <div className="text-pager" onClick={loadNextPage}>
                    { !loadingFromPaging ? `Plus de resultats (${currentPage}/${totalPages})` : "" }
                </div>
                <div className={`spinner-container ${ loadingFromPaging ? "" : "center-flex" }`}>
                    {/* <SpinnerWh /> */}
                    { loadingFromPaging ? <SpinnerWh /> : 
                        <i className="fas fa-angle-double-up go-up" onClick={() => window.scrollTo(0, 0)}></i> 
                    }
                </div>
            </div>
        )
    }

    console.log("=> page projets search is rendering ...")

    return (
        <div className="projets-wr" id="search-projet-page">
            <SearchBar setFilters={setFilters} />

            { renderResultsInfo() }
            { 
                ! loadingFromCriteria && (
                    ! errors ? 
                    (
                        projets.length > 0 && (
                            <>
                                { renderResultsList() }
                                { renderPagingLoader() }
                            </>                             
                        )
                    )
                    : 
                    <ApiError />
                )
            }

      </div>

    )



}

export default connect(
    (state) => ({
        roles: getRoles(state),
        userID: getUserID(state),
        permissions: getPermissions(state),
    })
)(ProjetList)