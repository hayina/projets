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
import { SpinnerWh } from '../helpers';

let ProjetList = ({dispatch, roles, userID, userType}) => {


    const INITIAL_PAGE = 1
    const DEFAULT_SIZE = 10

    const [projets, setProjets] = useState([]);
    const [totalElements, setTotalElements] = useState(null);
    const [totalPages, setTotalPages] = useState(null);

    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
    const [pageSize, setPageSize] = useState(DEFAULT_SIZE);
    const [fromPaging, setFromPaging] = useState(false);
    const [filters, setFilters] = useState({});

    const [loading, setLoading] = useState(false);
    const [errors, setErrors]   = useState(false);

  

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
        console.log(">>>> useEffect -> Bread Crum -> runing ...")

        dispatch(setBreadCrumb("Rechercher les projets"))
    }, [])

    const itemIndexRef = useRef();
    // let itemIndexVar = 0;



    useEffect(() => {

        console.log(">>>> useEffect -> ajax -> runing ...", filters, currentPage)

        // console.log('filters', filters)

        if( Object.keys(filters).length === 0 ) return

        // if( ! filters.acheteur )

        let cancel = false

        setLoading(true)
        setErrors(false)

        const page = fromPaging ? currentPage : INITIAL_PAGE
        setCurrentPage(page)

        useAjaxFetch({
            url: 'projets',
            params: { 
                ...filters, 
                page: page, 
                count: !fromPaging 
            },
            success: (data) => {
                // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
                // sleep(3000).then(() => {})
                if(cancel) {
                    console.log("---------------------> cancel")
                    return
                }

                itemIndexRef.current = projets.length


                console.log("---> itemIndexRef", itemIndexRef.current)
                // console.log("---> itemIndexVar ->", itemIndexVar)

                setProjets(fromPaging ? [ ...projets, ...data.content ] : data.content)
                if(!fromPaging) {
                    setTotalElements(data.totalElements)
                    setTotalPages(Math.ceil(data.totalElements/pageSize))
                }
                
            },
            error: () => {
                if(cancel) return
                setErrors(true)
            },
            always: () => {
                if(cancel) return
                setLoading(false)
                setFromPaging(false)



            }
        })
        return () => cancel = true
    }, [filters, currentPage])

    const loadNextPage = () => {

        setLoading(true) // just to increase race condition
        setCurrentPage(currentPage+1)
        setFromPaging(true)


    }

    const ResultsList = () => {

        console.log("ResultsList ->", itemIndexRef.current, projets.length)

        return (
            <div className="projets-results">
                { projets.map((projet, index) => <Line {...{ projet, index }} key={projet.id}/>) }
            </div>
        )
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
                        <strong>{index+1}.</strong>({projet.daysFromLastRepriseTilNow}) - {projet.intitule} 
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
                        <Percentage percentage={projet.taux} animation={false} />
                    </div>
                </div>


            </div>
        )
    }

    const ResultsInfo = () => (
        <div className="projets-nav box-sh box-br">
            {/* { loading ? <Loading /> :  */}
                <div className="result-info">{ totalElements } Projets retrouvés</div> 
         {/* } */}
        </div>
    )





    const EmptyList = () => <div className="empty-list">0 projets retrouvés</div>

    const Loading = () => (
        <div className="loading-list box-sh">Loading ....</div>
    )

    const Errors = () => (
        <div className="api-error">Une erreur s'est produit<i className="fas fa-info-circle"></i></div>
    )

    const PagingLoader = () => {
        
        const pagingLoader = fromPaging && loading
        return currentPage !== totalPages &&
        (
            <div className={`paging-loader ${ pagingLoader ? 'disabled' : '' }`} >
                <i className="fas fa-chevron-down" onClick={loadNextPage}></i>
                <div className="text-pager" onClick={loadNextPage}>
                    { !pagingLoader ? `Plus de resultats (${currentPage}/${totalPages})` : "" }
                </div>
                <div className={`spinner-container ${ pagingLoader ? "" : "center-flex" }`}>
                    {/* <SpinnerWh /> */}
                    { pagingLoader ? <SpinnerWh /> : 
                        <i className="fas fa-angle-double-up go-up" onClick={() => window.scrollTo(0, 0)}></i> 
                    }
                </div>
            </div>
        )
    }

    const ResultsWrapper = () => (

        projets.length > 0 ?
        <>       
            <ResultsInfo />
            <ResultsList />
            <PagingLoader />
        </>   
        : 
        <EmptyList />
    )


    console.log("> page projets search is rendering ...", {
        projets: projets.length,
        totalElements,
        totalPages,
        currentPage,
        pageSize,
        fromPaging,
        filters,
        loading,
        errors,
    })
    // console.log("projets", projets.length)
    // console.log("loading", loading)
    // console.log("fromPaging", fromPaging)
    // console.log("currentPage", currentPage)

    return (
        <div className="projets-wr" id="search-projet-page">
            <SearchBar setFilters={setFilters}/>
            { (!fromPaging && loading) ? <Loading /> : ( !errors ? <ResultsWrapper /> : <Errors /> ) }
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