import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';

import useAjaxFetch from '../hooks/useAjaxFetch';
import Percentage from './Percentage';
import { NestedTree } from '../checkboxTree/CheckTree';
import { nestedTree } from '../checkboxTree/helpers';

import './projetDetail.css'
import { setBreadCrumb, showModal } from '../../actions';
import { formatDate } from '../../helpers';
import DropDown from '../helpers/DropDown2';
import { modalTypes } from '../modals/ModalRoot';

const ProjetDetail = ({ match, history, dispatch }) => {

    const [loading, setLoading] = useState(false)
    const [marcheLoading, setMarcheLoading] = useState(false)
    const [errors, setErrors] = useState(false);
    const [projet, setProjet] = useState({});
    const [defaultMarche, setDefaultMarche] = useState({});
    const [marchesTypes, setMarchesTypes] = useState([]);



    useEffect(() => {


        dispatch(setBreadCrumb("Projet detail"))

        const { idProjet } = match.params

        setLoading(true)
        useAjaxFetch({
            url: `/projets/detail/${idProjet}`,
            success: ({projet, defaultMarche, marchesTypes}) => {
                console.log(projet)
                console.log(defaultMarche)
                setProjet(projet)
                setDefaultMarche(defaultMarche)
                setMarchesTypes(marchesTypes)
                setLoading(false)

            },
            error: (err) => setErrors(true)
        })


    }, [])


    const loadMarche = (idMarche) => {
    
        setMarcheLoading(true)
        useAjaxFetch({
            url: `/marches/detail/${idMarche}`,
            success: (data) => {
                console.log(data)
                setDefaultMarche(data)
                setMarcheLoading(false)

            },
            error: (err) => setErrors(true)
        })
    
    }

    const deleteMarche = (idMarche) => {
        useAjaxFetch({
            url: `/marches/${idMarche}`,
            method: 'DELETE',
            success: () => {
                setDefaultMarche({})
            },
            error: (err) => setErrors(true)
        })
    }




    const CalendarIcon = () => <i className="far fa-calendar-alt"></i>

    const LineInfo = ({ label, children }) => 
    children ?
        <div className="line-info">
            <label className="line-label">{label}</label>
            <span className="line-data">{children}</span>
        </div>
        :
        null


    

    const TreeInfo = ({nodes}) => 
        nodes.map((node, i) => (
            <div className="tree-item" key={i}>
                <div className="item-data">
                    {/* <i className="fas fa-angle fa-angle-right"></i> */}
                    <i className="fas fa-map-marker-alt"></i>
                    <div className="tree-item-label">{node.label.toLowerCase()}</div>
                </div>
                { node.children && node.children.length > 0 && <TreeInfo  nodes={node.children}/> }
            </div>
        ))

    

    return (
        <div id="pr-detail-wr" className={`box-sh box-br ${ loading ? 'waiting':'' }`}>
        
            <div className="pr-header _c_header">
                <div className="pr-title">{projet.intitule}</div>
                <div className="per-wr">
                    <Percentage percentage={projet.taux} />                
                </div>
            </div>

            <div className="prj-info-wr">

            <LineInfo label="Localisation">
                { projet.localisations && projet.localisations.length > 0 &&<TreeInfo nodes={projet.localisations} /> } 
            </LineInfo>

            {/* { projet.localisations && projet.localisations.length > 0 && } */}
            {/* <LineInfo label="Secteur">
                { projet.secteur ? projet.secteur.label : null }
            </LineInfo> */}

            <LineInfo label="Maître d'ouvrage">
                { projet.maitreOuvrage ? projet.maitreOuvrage.label : null }
            </LineInfo>

            <LineInfo label="Maître d'ouvrage délégué">
                { projet.maitreOuvrageDel ? projet.maitreOuvrageDel.label : null }
            </LineInfo>

            <LineInfo label="Montant">
                { projet.montant ? `${ Number(projet.montant).toLocaleString() } Dhs` : null }
            </LineInfo>
            <LineInfo label="Source financement">
                { projet.srcFinancement ? `${ projet.srcFinancement.label }` : null }
            </LineInfo>
                        
            <LineInfo label="Partenaires">
            {
                projet.partners && projet.partners.length > 0 &&
                projet.partners.map( ({partner, montant, srcFinancement}, i) => (
                    <div className="partner-item" key={i}>
                        <span className="ptr-name">{i+1}. {partner.label}</span>
                        <span className="ptr-montant">
                            <i className="fas fa-arrow-circle-right"></i>
                            { `${ Number(montant).toLocaleString() } dhs` }
                            <span className="ptr-src">{ srcFinancement && `(${ srcFinancement.label})` }</span>
                        </span>
                        
                    </div>
                ))
            }
            </LineInfo>

            </div>

            {
                marchesTypes && marchesTypes.length > 1 &&
                <div className="mh-wr">
                    <div className="_mh_2">Infos sur les marchés</div>
                    <div className="marches-tabs tabs-wr">
                    {
                        marchesTypes.map((mt, i) => {
                            return (
                                <div className="tab-item" key={i} onClick={ (e) => {
                                    [ ...document.querySelectorAll(".tab-item") ].forEach((node) => {
                                            node.classList.remove('active')
                                    })

                                    e.target.classList.add('active')
                                    loadMarche(mt.value)
                                }}>
                                    { mt.label }
                                </div>
                            )
                        })
                    }
                    
                    </div>
                </div>

            }

            {
                defaultMarche &&
                <div className={`def-marche-wr ${ marcheLoading ? 'waiting' : '' }`}>

                    <DropDown 
                    
                        links={[
                            {
                                label: 'Editer', 
                                callback: () => history.push(`/marches/edit/${defaultMarche.idMarche}`),
                            },
                            {
                                label: 'Supprimer',
                                callback: () => {
                                    dispatch(showModal(modalTypes.ADD_DELETE, {
                                        onDanger: () => deleteMarche(defaultMarche.idMarche)  ,
                                        dangerText: ["Voulez vous vraiment supprimer le marche ", <strong>{defaultMarche.intitule}</strong>, " ?"]
                                    }))
                                },
                            }

                        ]}
                    
                    />

                    
                    <div className="pm-h m-h">{ defaultMarche.intitule }</div>

                    <LineInfo label="Etat du marché">
                        { defaultMarche.marcheEtat ? defaultMarche.marcheEtat.label : '-' }
                    </LineInfo>
                    <LineInfo label="Délai d'execution">
                        { defaultMarche.delai ? `${defaultMarche.delai} mois` : '-' }
                    </LineInfo>
                    <LineInfo label="Montant">
                        { defaultMarche.montant ? `${Number(defaultMarche.montant).toLocaleString()} dhs` : '-' }
                    </LineInfo>
                    <LineInfo label="Num marché">
                        { defaultMarche.numMarche || '-' }
                    </LineInfo>

                    <LineInfo label="Date commencement">
                        <CalendarIcon />
                        { defaultMarche.dateStart ? 
                            <span className="l-date">{formatDate(new Date(defaultMarche.dateStart))}</span> : '-' }
                    </LineInfo>

                    <LineInfo label="Société(s) titulaire(s)">
                    {
                        defaultMarche.societes && defaultMarche.societes.length > 0 &&
                        defaultMarche.societes.map( ({value, label}, i) => (
                            <div className="l-item" key={value}>
                                <span className="l-data-lbl">{label}</span>
                            </div>
                        ))
                    }
                    </LineInfo>

                    <LineInfo label="Ordres de service">
                    {
                        defaultMarche.os && defaultMarche.os.length > 0 &&
                        defaultMarche.os.map( ({typeOs, dateOs, commentaire}, i) => (
                            <div className="l-item" key={i}>
                                <span className="l-date-w">
                                    <i className="far fa-calendar-alt"></i>
                                    <span className="l-date">
                                        { dateOs ? formatDate(new Date(dateOs)) : '-' }
                                    </span>
                                    <i className="fas fa-arrow-circle-right"></i>
                                    <span className="l-name">{typeOs.label}</span>
                                </span>
                                {/* <span className="l-com">{ commentaire }</span> */}
                                
                            </div>
                        ))
                    }
                    </LineInfo>

                    <LineInfo label="Taux avancement">
                    {
                        defaultMarche.taux && defaultMarche.taux.length > 0 &&
                        defaultMarche.taux.map( ({valueTaux, dateTaux, commentaire}, i) => (
                            <div className="l-item" key={i}>
                                <span className="l-date-w">
                                    <i className="far fa-calendar-alt"></i>
                                    <span className="l-date">
                                        { dateTaux ? formatDate(new Date(dateTaux)) : '-' }
                                    </span>
                                    <i className="fas fa-arrow-circle-right"></i>
                                    <span className="l-name">{(`0${valueTaux}`).slice(-2)}</span>
                                    <i className="fas fa-percent"></i>
                                </span>
                                {/* <span className="l-com">{ commentaire }</span> */}
                                
                            </div>
                        ))
                    }
                    </LineInfo>

                    <LineInfo label="Décomptes">
                    {
                        defaultMarche.decomptes && defaultMarche.decomptes.length > 0 &&
                        defaultMarche.decomptes.map( ({montant, dateDec, commentaire}, i) => (
                            <div className="l-item" key={i}>
                                <span className="l-date-w">
                                    <i className="far fa-calendar-alt"></i>
                                    <span className="l-date">
                                        { dateDec ? formatDate(new Date(dateDec)) : '-' }
                                    </span>
                                    <i className="fas fa-arrow-circle-right"></i>
                                    <span className="l-name">{`${Number(montant).toLocaleString()} dhs`}</span>
                                </span>
                                {/* <span className="l-com">{ commentaire }</span> */}
                                
                            </div>
                        ))
                    }
                    </LineInfo>

                    <LineInfo label="Date réception provisoire" >
                        <CalendarIcon />
                        { defaultMarche.dateReceptionProv ? 
                            <span className="l-date">{formatDate(new Date(defaultMarche.dateReceptionProv))}</span> : null }
                    </LineInfo>
                    <LineInfo label="Date réception définitive">
                        <CalendarIcon />
                        { defaultMarche.dateReceptionDef ? 
                            <span className="l-date">{formatDate(new Date(defaultMarche.dateReceptionDef))}</span> : null }
                    </LineInfo>

                </div>
            }


        
        
        </div>
    )

}


export default connect()(ProjetDetail)