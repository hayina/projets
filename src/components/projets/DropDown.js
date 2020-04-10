/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { showModal } from '../../actions';
import { modalTypes } from '../modals/ModalRoot';
import { accessPermissions } from '../../security';
import { getPermissions } from '../../reducers/login';
import { USER_PERMISSIONS } from '../../types';

const DropDown = ({ projet, index, deleteProjet, dispatch, permissions }) => {

    useEffect(() => {
        document.addEventListener('mousedown', clickOutSide);
        return () =>  document.removeEventListener('mousedown', clickOutSide);
    }, []);

    function clickOutSide(e) {

        if(e.which !== 1) return

        [ ...document.querySelectorAll("._3_bar.show-drop") ].forEach((node) => {
            if(!node.contains(e.target)) {
                node.classList.remove('show-drop')
            }
        })
    }

    return (
        <span className="_3_bar ct_pr ripple" onClick={(e) => {
            e.currentTarget.classList.toggle('show-drop')
        }}>
            <div className="_drop-down">
                <Link to={`/projets/edit/${projet.id}`} className="_dr-item">Editer projet</Link>

                {accessPermissions(permissions, USER_PERMISSIONS.DELETE_PROJECT) &&
                    <a 
                    href="javascript:void(0)" className="_dr-item" 
                    onClick={ 
                        () =>  dispatch(showModal(modalTypes.ADD_DELETE, {
                            onDanger: () => deleteProjet(projet.id, index)  ,
                            dangerText: ["Voulez vous vraiment supprimer le projet ", <strong>{projet.intitule}</strong>, " ?"]
                        }))
                    }>
                        Supprimer projet
                    </a>
                }
                <Link to={`/marches/new/${projet.id}`} className="_dr-item">Nouveau marché</Link>

                {
                    Object.keys(projet.marches).map((idMarch) => 
                        <Link to={`/marches/edit/${idMarch}`} className="_dr-item" key={idMarch}>
                            Editer { projet.marches[idMarch] }
                        </Link>
                    )
                }

            </div>
            <i className="fas fa-ellipsis-v dp-t"></i>
        </span>
    )
}


export default connect(
    (state) => ({
        permissions: getPermissions(state)
    })
)(DropDown)

