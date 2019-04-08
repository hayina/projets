import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import useAjaxFetch from '../hooks/useAjaxFetch';



import './projetList.css'

let ProjetList = () => {


    const [projets, setProjets] = useState([]);
    const [loading, setLoading] = useState(false);


    function deleteProjet(idProjet) {

        useAjaxFetch({
            url: `/projets/${idProjet}`,
            method: 'DELETE',
            success: () => {

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
        })
        return () => cancel = true
    }, [])

    return (
        <div className="projets-wr">

            <a href="javascript:void(0)" className="delete-wr" onClick={ () => deleteAllProjets() }>DELETE ALL</a>

        {   loading ? 
            (<div className="loading-list">Loading ....</div>)
            :
            projets.length > 0 ?
            projets.map(projet => {

                return (
                    <div className="projet-item" key={projet.id}>
                        <span className="control-bar">
                            <Link to={`/projets/edit/${projet.id}`} className="edit-wr edit-projet">Edit</Link>
                            <span className="delete-wr" onClick={ () => deleteProjet(projet.id) }>Delete</span>
                            <i className="fas fa-ellipsis-v"></i>
                        </span>
                        <div className="projet-label"><strong>{projet.id}.</strong> {projet.intitule}</div>
                    </div>
                )
            })
            :
            <div className="empty-list">0 projets retrouvés</div>
        }
        
        
        </div>
    )



}

export default ProjetList