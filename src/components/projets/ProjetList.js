/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import useAjaxFetch from '../hooks/useAjaxFetch';



import './projetList.css'
import { modalTypes } from '../modals/ModalRoot';
import { showModal } from '../../actions';
import { getProjets } from '../../reducers/externalForms';
import { CretereItem } from './components';
import SearchBar from './SearchBar';
import Percentage from './Percentage';

let ProjetList = ({dispatch}) => {


    const [projets, setProjets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(false);


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

        let cancel = false
        setLoading(true)



        useAjaxFetch({
            url: 'projets',
            success: (data) => {
                setTimeout(() => {
                    if(cancel) return
                    setProjets(data)
                    setLoading(false)
                },600)
            },
            error: (err) => {
                if(cancel) return
                setLoading(false)
                setErrors(true)
                // setProjets(_projets)
            }
        })
        return () => cancel = true
    }, [])

    const renderResultsList = () => (

        projets.length > 0 ?
        <React.Fragment>       
        <div className="projets-nav box-sh">
            { loading ? renderLoading() : 
                <div className="result-info">{ projets.length } Projets retrouvés</div> }
        </div>
        <div className="projets-results ">
        {

        projets.map((projet, index) => {

            return (
                <div className="projet-item box-sh" key={projet.id}>

                    <span className="ct_pr">
                        <Link to={`/projets/edit/${projet.id}`} className="ctr_ic edit-wr">editer</Link>
                        <a href="javascript:void(0)" className="ctr_ic delete-wr" onClick={ 
                            () =>  dispatch(showModal(modalTypes.ADD_DELETE, {
                                    onDanger: () => deleteProjet(projet.id, index)  ,
                                    dangerText: ["Voulez vous vraiment supprimer le projet ", 
                                    <strong>{projet.intitule}</strong>,  " ?"]
                                    // dangerText: `Voulez vous vraiment sûr supprimer le projet 
                                    // ${projet.intitule} ?`
                            }))
                        }>supprimer</a>
                        <i className="fas fa-ellipsis-v dp-t"></i>
                        {/* <svg class="j2dfb39" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                        </svg> */}
                    </span>
                    <div className="projet-label"><strong>{projet.id}.</strong> {projet.intitule}</div>
                    <div className="projet-loc">
                        <i className="_fa_lpr fas fa-map-marker-alt"></i>
                        <span className="loc-label">Commune Taourirt</span>
                    </div>
                    <div className="projet-mo">
                        <i className="_fa_lpr far fa-building"></i>
                        <span className="mo-label">Délégation Provincial Santé - Taourirt</span>
                    </div>
                    <div className="projet-per">
                        <Percentage percentage="40" />
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
            <SearchBar />
            { loading ? renderLoading() : ( !errors ? renderResultsList() : renderErrors() ) }
        </div>
    )



}

export default connect(
    (state) => ({
        // _projets: getProjets(state)
    })
)(ProjetList)