import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';


import './users.css'
// import UserForm from './UserForm';
import { showModal, arrayDeletingByIndex } from '../../actions';
import { modalTypes } from '../modals/ModalRoot';
import { getUsers } from '../../reducers/externalForms';

let UserList = ({dispatch, users}) => {

    

    useEffect(() => {

        dispatch(showModal(modalTypes.ADD_USER, {editMode: false }))
        return () => {}
    }, [])



    return (

        <div className="users-wr box-sh">

            <div className="nav-user">

                <div className="add-user" onClick={() => {
                        dispatch(showModal(modalTypes.ADD_USER, {editMode: false }))
                    }}>
                    <span className="ctr_ic2 l_ho">Ajouter un utilisateur</span> 
                    <i className="fas fa-user-plus fa-add-user" ></i>
                </div>
            </div>

            <div className="user-result">
                {   users.map((user,index) => {

                    return (
                        <div className="user-item" key={index}>
                            <span className="control-bar">
                                <span className="btn btn-link"
                                    onClick={ () => dispatch(showModal(modalTypes.ADD_USER, 
                                        { editMode: true, initUser: user, userIndex: index })) 
                                    }
                                >Edit
                                </span>
                                <span className="btn btn-link"
                                    onClick={ () =>  dispatch(showModal(modalTypes.ADD_DELETE, 
                                        {
                                            onDanger: () => dispatch(arrayDeletingByIndex('users', index)),
                                            dangerText: `Voulez vous vraiment supprimer l'utilisateur : 
                                            ${user.nom.toUpperCase()} 
                                            ${user.prenom.toUpperCase()} (${user.login}) ?`
                                        }))
                                    
                                     }
                                >Delete
                                </span>
                                <i className="fas fa-ellipsis-v"></i>
                            </span>
                            <div className="user-label"><strong>{index}.</strong> {user.nom} {user.prenom}</div>
                            {/* <div className="user-lastCon">{user.lastConnexion}</div> */}
                            <div className="user-dateCr">{user.dateCreation.toLocaleTimeString()}</div>
                        </div>
                    )
                    })
                }
            </div>

            {/* <UserForm /> */}

        </div>

        
    )
}


export default connect(
    (state) => ({
        users: getUsers(state),
    }),
)(UserList);
