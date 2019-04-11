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

let ProjetList = ({dispatch, _projets}) => {


    const [projets, setProjets] = useState([]);
    const [loading, setLoading] = useState(false);


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

    function deleteAllProjets() {

        useAjaxFetch({
            url: `/projets`,
            method: 'DELETE',
            success: () => {

            },
        })

        return false
    }

    useEffect(() => {

        let cancel = false
        setLoading(true)
        useAjaxFetch({
            url: 'projets',
            success: (data) => {
                if(cancel) return
                setProjets(data)
                setLoading(false)
            },
            error: (err) => {
                setLoading(false)
                setProjets(_projets)
            }
        })
        return () => cancel = true
    }, [])

    return (
        <div className="projets-wr">

            <SearchBar />

        {   loading ? 
            (<div className="loading-list box-sh">Loading ....</div>)
            :
            projets.length > 0 ?

            (  
            <React.Fragment>       
            <div className="projets-nav box-sh">
                <a href="javascript:void(0)" className="delete-wr" onClick={ 
                    () =>  dispatch(showModal(modalTypes.ADD_DELETE, 
                        {
                            onDanger: () => deleteAllProjets() ,
                            dangerText: `Voulez vous vraiment sûr supprimer tous les projets ?`
                        }))
                }>Supprimer tout</a>
            </div>

            <div className="projets-results box-sh">
            {

            projets.map((projet, index) => {

                return (
                    <div className="projet-item" key={projet.id}>
                        <div className="projet-label"><strong>{projet.id}.</strong> {projet.intitule}</div>
                        <span className="control-bar fv_align">
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
                        </span>
                    </div>
                )
            })
            }
            </div>
            </React.Fragment>   
            
            )
            :
            <div className="empty-list">0 projets retrouvés</div>
        }
        
        
        </div>
    )



}

export default connect(
    (state) => ({
        _projets: getProjets(state)
    })
)(ProjetList)