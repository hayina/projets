import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux';

import useAjaxFetch from '../hooks/useAjaxFetch';
import Percentage from './Percentage';


import './projetDetail.css'
import { setBreadCrumb, showModal, setModalProps, hideModal } from '../../actions';
import { formatDate } from '../../helpers';
import DropDown from '../helpers/DropDown2';
import { modalTypes } from '../modals/ModalRoot';
import { ATTACH_TYPE, TYPE_OS, MONTH_DAYS, USER_PERMISSIONS } from '../../types';
import { ResourcesLine } from '../attachments';
import { ApiError, SpinnerWh } from '../helpers';
import { accessPermissions, accessEditProject } from '../../security';
import { getPermissions, getUserID, getRoles } from '../../reducers/login';



const CalendarIcon = () => <i className="far fa-calendar-alt"></i>

const LineInfo = ({ label, children }) => (
    children ?
    <div className="line-info">
        <label className="line-label">{label}</label>
        <span className="line-data">{children}</span>
    </div>
    :
    null
)

const TreeInfo = ({ nodes }) => (
    nodes.map((node, i) => (
        <div className="tree-item" key={i}>
            <div className="item-data">
                {/* <i className="fas fa-angle fa-angle-right"></i> */}
                <i className="fas fa-map-marker-alt"></i>
                <div className="tree-item-label">{node.label.toLowerCase()}</div>
            </div>
            {node.children && node.children.length > 0 && <TreeInfo nodes={node.children} />}
        </div>
    ))
)

const ProjetDetail = ({ match, history, dispatch, permissions, userID, roles }) => {

    const [loading, setLoading] = useState(false)
    const [marcheLoading, setMarcheLoading] = useState(false)
    const [errors, setErrors] = useState(null);
    
    const [projet, setProjet] = useState({});
    const [defaultMarche, setDefaultMarche] = useState({});
    const [marchesTypes, setMarchesTypes] = useState([]);
    const [activeMarcheTab, setActiveMarcheTab] = useState(null);

    const ERRORS = Object.freeze({ LOAD_PROJECT: 1, LOAD_MARCHE: 2 })


    const { idProjet } = match.params

    useEffect(() => {


        dispatch(setBreadCrumb("Projet detail"))


        setErrors(null)
        setLoading(true)
        useAjaxFetch({
            url: `/projets/detail/${idProjet}`,
            success: ({ projet, defaultMarche, marchesTypes }) => {

                // setTimeout(() => {
                    
                // console.log(projet)
                // console.log(defaultMarche)
                if (defaultMarche && defaultMarche.osStart.length > 0) {
                    defaultMarche.os.unshift(defaultMarche.osStart[0])
                }
                setProjet(projet)
                setDefaultMarche(defaultMarche)
                if (defaultMarche) setActiveMarcheTab(defaultMarche.idMarche)
                setMarchesTypes(marchesTypes)
                setLoading(false)

                // }, 1000);

            },
            error: (err) => setErrors(ERRORS.LOAD_PROJECT)
        })


    }, [])


    const projectLinks = []

    /**
     * Check if user have permissions & roles to edit the project
     */
    const editProjectPermission = projet.chargeSuivi && accessEditProject(userID, projet.chargeSuivi.value, roles)
    if( editProjectPermission ) {

        projectLinks.push({
            label: 'Editer',
            callback: () => history.push(`/projets/edit/${idProjet}`),
        })

        /**
         * Check if the user have the permission to delete a project
         */
        if(accessPermissions(permissions, USER_PERMISSIONS.DELETE_PROJECT)) {
    
            projectLinks.push({
                label: 'Supprimer',
                callback: () => {
                    dispatch(showModal(modalTypes.ADD_DELETE, {
                        handleValidation: () => deleteProjet(),
                        dangerText: <span>Voulez vous vraiment supprimer le projet <strong>{projet.intitule}</strong> ?</span>,
                        apiCall: true, fading: false
                    }))
                },
            })
        }
    }


    const loadMarche = (idMarche) => {

        setErrors(null)
        setMarcheLoading(true)
        useAjaxFetch({
            url: `/marches/detail/${idMarche}`,
            success: (data) => {
                // setTimeout(() => {
                // console.log(data)
                if (data.osStart.length > 0) {
                    data.os.unshift(data.osStart[0])
                }
                setDefaultMarche(data)
                setMarcheLoading(false)
                // }, 10000000);
                
            },
            error: (err) => {
                
                setErrors(ERRORS.LOAD_MARCHE)
            },
            // always: () => 
        })

    }

    const deleteMarche = (idMarche) => {

        dispatch(setModalProps({ errors: null, submitting: true }))
        useAjaxFetch({
            url: `/marches/${idMarche}`,
            method: 'DELETE',
            success: () => {
                const newMarches = marchesTypes.filter(m => m.value !== idMarche)
                setActiveMarcheTab(newMarches.length > 0 ? newMarches[0].value : null)
                setDefaultMarche(newMarches.length > 0 ? loadMarche(newMarches[0].value) : null)
                setMarchesTypes(newMarches)
                dispatch(setModalProps({ submitting: false }))
                dispatch(hideModal())
            },
            error: (err) => dispatch(setModalProps({ submitting: false, errors: true }))
        })
    }

    const deleteProjet = () => {

        dispatch(setModalProps({ errors: null, submitting: true }))
        useAjaxFetch({
            url: `/projets/${idProjet}`,
            method: 'DELETE',
            success: () => {
                dispatch(setModalProps({ submitting: false }))
                history.push(`/projets/search`)
            },
            error: (err) => dispatch(setModalProps({ submitting: false, errors: true }))
        })
    }


    const renderProjectInfo = () => (
        <>
        { projectLinks.length !== 0 && 
            <div className="setting-projet">
                <DropDown links={projectLinks} />
            </div>
        }
        <div className="pr-header _c_header">
            <div className="pr-title">{projet.intitule}</div>
            <div className="per-wr">
                <Percentage percentage={ projet.taux } />
                
            </div>
        </div>

        <div className="prj-info-wr">

            

            <LineInfo label="Localisation">
                {projet.localisations && projet.localisations.length > 0 && <TreeInfo nodes={projet.localisations} />}
            </LineInfo>

            <LineInfo label="Secteur">
                {projet.secteur ? `${projet.secteur.label}` : null}
            </LineInfo>

            <LineInfo label="Maître d'ouvrage">
                {projet.maitreOuvrage ? projet.maitreOuvrage.label : null}
            </LineInfo>

            <LineInfo label="Maître d'ouvrage délégué">
                {projet.maitreOuvrageDel ? projet.maitreOuvrageDel.label : null}
            </LineInfo>

            <LineInfo label="Montant">
                {projet.montant ? `${Number(projet.montant).toLocaleString()} Dhs` : null}
            </LineInfo>

            <LineInfo label="Source financement">
                {projet.srcFinancement ? `${projet.srcFinancement.label}` : null}
            </LineInfo>

            <LineInfo label="Année d'execution">
                {projet.anneeProjet ? `${projet.anneeProjet}` : null}
            </LineInfo>



            <LineInfo label="Partenaires">
                {
                    projet.partners && projet.partners.length > 0 &&
                    projet.partners.map(({ partner, montant, srcFinancement }, i) => (
                        <div className="partner-item" key={i}>
                            <span className="ptr-name">{i + 1}. {partner.label}</span>
                            <span className="ptr-montant">
                                <i className="fas fa-arrow-circle-right"></i>
                                {`${Number(montant).toLocaleString()} dhs`}
                                <span className="ptr-src">{srcFinancement && `(${srcFinancement.label})`}</span>
                            </span>

                        </div>
                    ))
                }
            </LineInfo>

            <LineInfo label="Chargé de Suivi">
                {projet.chargeSuivi ? `${projet.chargeSuivi.label}` : null}
            </LineInfo>

        </div>
        </>
    )

    const renderMarchesTabs = () => (

        <div className="mh-wr">
            <div className="_mh_2">Infos sur les marchés ({activeMarcheTab})</div>
            <div className="marches-tabs tabs-wr">
                {
                    marchesTypes.map((mt, i) => {
                        return (
                            <div
                                className={`tab-item ${activeMarcheTab === mt.value ? 'active' : ''}`}
                                key={i} onClick={(e) => {
                                    setActiveMarcheTab(mt.value)
                                    loadMarche(mt.value)
                                }}>
                                {mt.label}


                                {/* { activeMarcheTab === mt.value && marcheLoading ? <div className="btn-loader"></div> : null } */}
                            </div>
                            // <div className="tab-item" key={i} onClick={ (e) => {
                            //     [ ...document.querySelectorAll(".tab-item") ].forEach((node) => {
                            //             node.classList.remove('active')
                            //     })

                            //     e.target.classList.add('active')
                            //     loadMarche(mt.value)
                            // }}>
                            //     { mt.label }
                            // </div>
                        )
                    })
                }

            </div>
        </div>
    )

    const isOs = defaultMarche && defaultMarche.os && defaultMarche.os.length > 0
    const isOsText = isOs && !defaultMarche.dateReceptionProv 
    const isOsArret = isOs && defaultMarche.os.length > 1
    const workMonths = isOs && Math.floor(defaultMarche.workDays/MONTH_DAYS)
    const moduloWorkDays = isOs && defaultMarche.workDays%MONTH_DAYS
    const isDelaiExp = isOs && defaultMarche.workDays > defaultMarche.delai * MONTH_DAYS

    const isSte = defaultMarche && defaultMarche.societes && defaultMarche.societes.length > 0
    const manySte = isSte && defaultMarche.societes.length > 1 ? "s" : ""

    const renderMarchesInfo = () => (

        <div className={`def-marche-wr ${ marcheLoading && 'is-loading'  }`}>

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
                                handleValidation: () => deleteMarche(defaultMarche.idMarche),
                                dangerText: <span>Voulez vous vraiment supprimer le marche <strong>{defaultMarche.intitule}</strong> ?</span>,
                                apiCall: true, fading: false
                            }))
                        }
                    }
                ]}
            />

            <div className="pm-h m-h">{defaultMarche.intitule}</div>

            <LineInfo label="Etat du marché">
                {defaultMarche.marcheEtat ? defaultMarche.marcheEtat.label : '-'}
            </LineInfo>
            {/* <LineInfo label="Délai d'execution">
                {defaultMarche.delai ? `${defaultMarche.delai} mois` : '-'}
            </LineInfo> */}
            <LineInfo label="Délai d'execution">
            {
                defaultMarche.delai ? (
                    <>
                    <span>{defaultMarche.delai} mois</span>
                    {
                        isDelaiExp ? (
                            <span className="delai-exp">
                                <i className="fas fa-exclamation"></i>
                                délai dépassé
                            </span>
                            )
                            : null
                    }
                    </>
                )
                : '-'


            }
            </LineInfo>
            <LineInfo label="Montant">
                {defaultMarche.montant ? `${Number(defaultMarche.montant).toLocaleString()} dhs` : '-'}
            </LineInfo>
            <LineInfo label="Num marché">
                {defaultMarche.numMarche || '-'}
            </LineInfo>

            <LineInfo label={`Société${manySte} titulaire${manySte}`}>
                {
                    isSte &&
                    defaultMarche.societes.map(({ value, label }, i) => (
                        <div className="l-item" key={value}>
                            <span className="l-data-lbl">{label}</span>
                        </div>
                    ))
                }
            </LineInfo>

            { isOsText && (
                <div className="work-days-wr">
                    <span>
                        La durée d'exécution du marché jusqu'à ce jour{ isOsArret ? ', en comptant les arrêts, ' : ' ' }est de 
                        <strong> {defaultMarche.workDays}</strong> jours, on est dans le <strong>{workMonths+1}{ workMonths<1 ? 'er':'ème'} mois</strong>.</span>
                </div>
            )}

            <LineInfo label="Ordres de service">
                {
                    isOs && 
                    defaultMarche.os.map(({ typeOs, dateOs, resources = [], commentaire }, i) => (
                    <div className="l-item" key={i}>
                        <span className="l-date-w">
                            {/* {i}. */}
                            <i className="far fa-calendar-alt"></i>
                            <span className="l-date nbr-font">
                                {dateOs ? formatDate(new Date(dateOs)) : '-'}
                            </span>
                        </span>
                        <span>
                            {/* <i className="fas fa-arrow-circle-right"></i> */}
                            <i className={`far fa-os fa-${typeOs.value === TYPE_OS.ARRET ? 'pause' : 'play'}-circle`}></i>
                            <span className="l-name">{typeOs.label}</span>
                        </span>

                        <ResourcesLine
                            resourcesProps={{ attachments: resources, imageDisplay: true, url: true }}
                            attachType={ATTACH_TYPE.OS}
                            idMarche={defaultMarche.idMarche}
                            dateRes={dateOs}
                        />

                        {/* <span className="l-com">{ commentaire }</span> */}

                    </div>
                    ))
                }
            </LineInfo>


            <LineInfo label="Décomptes">
                {
                    defaultMarche.decomptes && defaultMarche.decomptes.length > 0 &&
                    defaultMarche.decomptes.map(({ montant, dateDec, resources = [], commentaire }, i) => (
                        <div className="l-item" key={i}>
                            <span className="l-date-w">
                                <i className="far fa-calendar-alt"></i>
                                <span className="l-date nbr-font">
                                    {dateDec ? formatDate(new Date(dateDec)) : '-'}
                                </span>
                            </span>
                            <span>
                                <i className="fas fa-arrow-circle-right"></i>
                                <span className="l-name">{`${Number(montant).toLocaleString()} dhs`}</span>
                            </span>

                            <ResourcesLine
                                resourcesProps={{ attachments: resources, imageDisplay: true, url: true }}
                                attachType={ATTACH_TYPE.DEC}
                                idMarche={defaultMarche.idMarche}
                                dateRes={dateDec}
                            />

                            {/* <span className="l-com">{ commentaire }</span> */}

                        </div>
                    ))
                }
            </LineInfo>

            <LineInfo label="Taux avancement">
                {
                    defaultMarche.taux && defaultMarche.taux.length > 0 &&
                    defaultMarche.taux.map(({ valueTaux, dateTaux, commentaire }, i) => (
                        <div className="l-item" key={i}>
                            <span className="l-date-w">
                                <i className="far fa-calendar-alt"></i>
                                <span className="l-date nbr-font">
                                    {dateTaux ? formatDate(new Date(dateTaux)) : '-'}
                                </span>
                            </span>
                            <span>
                                <i className="fas fa-arrow-circle-right"></i>
                                <span className="l-name nbr-font">{(`0${valueTaux}`).slice(-2)}</span>
                                <i className="fas fa-percent"></i>
                            </span>


                            {/* <span className="l-com">{ commentaire }</span> */}

                        </div>
                    ))
                }
            </LineInfo>

            { defaultMarche.dateReceptionProv && (
                <div className="work-days-wr">
                    <span>
                        La durée d'exécution du marché{ isOsArret ? ', en comptant les arrêts, ' : ' ' }est de  
                        <strong> {workMonths} mois et {moduloWorkDays} jours</strong>.
                    </span>
                </div>
            )}

            <LineInfo label="Date réception provisoire" >

                {defaultMarche.dateReceptionProv ?
                    <>
                        <CalendarIcon />
                        <span className="l-date">{formatDate(new Date(defaultMarche.dateReceptionProv))}</span>
                    </>
                    : null
                }
            </LineInfo>
            <LineInfo label="Date réception définitive">
                {defaultMarche.dateReceptionDef ?
                    <>
                        <CalendarIcon />
                        <span className="l-date">{formatDate(new Date(defaultMarche.dateReceptionDef))}</span>
                    </>
                    : null
                }
            </LineInfo>

        </div>
    )

    const renderLoading = () => (
        <div className="pr-detail-loading">
            Chargement des informations du projet ...
            <div className={`spinner-container`}>
                <SpinnerWh />
            </div>
        </div>
    )

    return (


        <div id="pr-detail-wr" className={`box-sh box-br`}>

            {
                loading ?
                renderLoading()
                :
                errors !== ERRORS.LOAD_PROJECT ? (
          
                    <>
                        { renderProjectInfo() }

                        { marchesTypes && marchesTypes.length > 0 && renderMarchesTabs() }

                        { errors !== ERRORS.LOAD_MARCHE ? defaultMarche && renderMarchesInfo() : <ApiError/> }

                        {   editProjectPermission &&
                            <div className="new-marche">
                                <Link to={`/marches/new/${projet.id}`} className="_dr-item">Nouveau marché</Link>
                                <i className="fas fa-plus"></i>
                                {/* <i class="fa fa-arrow-right"></i> */}
                            </div>
                        }
                    </>
                )
                :
                <ApiError/>
                }
        </div>
        

    )

}


export default connect(
    (state) => ({
        permissions: getPermissions(state),
        userID: getUserID(state),
        roles: getRoles(state),
    })
)(ProjetDetail)