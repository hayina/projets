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
import { getRoles, getUserID, getUserType } from '../../reducers/login';
import { canUserEdit } from '../../security';
import { SpinnerWh, ApiError } from '../helpers';
import { APP_LINKS } from '../../types';
import { toUrlParams } from '../../helpers';

let ProjetList = ({dispatch, roles, userID, userType, history, match}) => {


    const INITIAL_PAGE = 1
    const DEFAULT_SIZE = 10
    

    // const initialState = {
    //     results: {
    //         projets: [],
    //         totalElements: null,
    //         totalPages: null
    //     }

    // }

    const [projets, setProjets] = useState([]);
    const [totalElements, setTotalElements] = useState(null);
    const [totalPages, setTotalPages] = useState(null);

    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
    const [pageSize, setPageSize] = useState(DEFAULT_SIZE);
    const [fromPaging, setFromPaging] = useState(false);
    const [filters, setFilters] = useState({});

    const [loading, setLoading] = useState(false);
    const [errors, setErrors]   = useState(false);

    const loadingFromPaging = loading && fromPaging  
    const loadingFromCriteria = loading && !fromPaging  


    useEffect(() => {
        console.log(">>>> useEffect -> Bread Crum ...")

        dispatch(setBreadCrumb("Rechercher les projets"))
    }, [])



    const paramsRef = useRef(null)
    paramsRef.current = history.location.search
    // console.log("paramsRef =============>")
    // console.log(paramsRef.current)
    // // console.log(history.location.search)
    // console.log("history =============>", history)



    // useEffect(() => {
    //     console.log(">>>> useEffect -> params ...", paramsRef.current)
    //     // deserialise url to obj
    //     console.log(paramsToObj(paramsRef.current.substring(1)))
        
    //     setFilters(paramsToObj(paramsRef.current.substring(1))) 
    // }, [paramsRef.current])

    const deleteProjet = (idProjet, index) => {
        
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

        console.log(">>>> useEffect -> ajax -> runing ...", filters, "page -> ", currentPage)

        if( Object.keys(filters).length === 0 ) return

        let cancel = false

        setLoading(true)
        setErrors(false)
        const page = fromPaging ? currentPage+1 : INITIAL_PAGE
        setCurrentPage(page)
     

        // history.push({
        //     pathname: APP_LINKS.SEARCH_PROJECT,
        //     search: `?${ toUrlParams(filters) }`
        //     // search: `?${ params(filters) }`
        // })


        // return

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

                if(!fromPaging) {
                    setTotalElements(data.totalElements)
                    setTotalPages(Math.ceil(data.totalElements/pageSize))
                } else {
                    setFromPaging(false)
                }

                setLoading(false)
                setProjets(prev => fromPaging ? [ ...prev, ...data.content ] : data.content)
                
            },
            error: () => {
                if(cancel) return
                setErrors(true)
                setLoading(false)
                setFromPaging(false)
            },
            // always: () => {
            //     if(cancel) return
                
            // }
        })



        return () => cancel = true
    }, [filters])
    // }, [paramsRef.current, currentPage])

    
    


    const loadNextPage = () => {

        // setLoading(true) // just to increase race condition
        setFromPaging(true)
        setFilters({ ...filters })

    }

    const ResultsList = () => {

        // console.log("ResultsList ->", projets.length)

        return (
            <div className="projets-results">
                { projets.map((projet, index) => <Line projet={projet} index={index} key={projet.id}/>) }
            </div>
        )
    }

    const highlightText = (text, higlight) => {
        // Split text on higlight term, include term itself into parts, ignore case
        var parts = text.split(new RegExp(`(${higlight})`, 'gi'));
        return (
            <span>{parts.map(part => part.toLowerCase() === higlight.toLowerCase() ? 
                <span className="highlight-text">{part}</span> : part)}
            </span>)
    }

    const Line = ({ projet, index }) => {
        
        // const animate = index >= itemIndexRef.current
        return (
            <div className="projet-item box-sh box-br no_dc">

                {
                    canUserEdit(userID, projet.chargeSuivID, roles, userType) &&
                    <DropDown { ...{ projet, deleteProjet, index } } />
                }

                <div className="projet-label">
                    <Link to={`/projets/detail/${projet.id}`} >
                        <strong>{index+1}. </strong>
                        {/* <strong>{projet.id}.({projet.daysFromLastRepriseTilNow})</strong> */}
                        
                        { filters.intitule && filters.intitule.length > 0 ? highlightText(projet.intitule, filters.intitule) : projet.intitule } 
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
                        <Percentage percentage={ projet.taux || 0 } animation={false} />
                    </div>
                </div>


            </div>
        )
    }

    const ResultsInfo = () => (
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

    const PagingLoader = () => {
        
        
        return currentPage !== totalPages &&
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

            <ResultsInfo />
            { 
                !loadingFromCriteria && (
                    ! errors ? 
                    (
                        projets.length > 0 && (
                            <>       
                                <ResultsList />
                                <PagingLoader />
                            </>   
                        )
                        // : 
                        // <EmptyList />
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
        userType: getUserType(state)
    })
)(ProjetList)