import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { showModal, hideModal, setBreadCrumb } from '../../actions';
import { modalTypes } from '../modals/ModalRoot';
import useAjaxFetch from '../hooks/useAjaxFetch'


import './users.css'
import '../list.css'

let UserList = ({ dispatch }) => {

    const [users, setUsers] = useState([])

    useEffect(() => {

        dispatch(setBreadCrumb("Gestion des utilisateurs"))


        useAjaxFetch({
            url: 'users',
            method: 'GET',
            success: (data) => {
                setUsers(data)
            }
            
        })
        return () => {}
    }, [])

    const addUser = (user) => {
        setUsers([ ...users, user])
    }
    const updateUser = (user, index) => {
        let nwUsers = [ ...users ];
        nwUsers[index] = user;
        setUsers(nwUsers);
    }

    const deleteUser = ({id, nom, prenom}, index) => {

        dispatch(showModal(modalTypes.ADD_DELETE, 
            {
                onDanger: () => useAjaxFetch({
                    url: `users/${id}`,
                    method: 'DELETE',
                    success: () => {
                        users.splice(index, 1)
                        setUsers([ ...users])
                        dispatch(hideModal())
                    }
                }),
                dangerText: `Voulez vous vraiment supprimer l'utilisateur : 
                ${nom.toUpperCase()} 
                ${prenom.toUpperCase()} ?`
            }))


    }

    const editUser = (id, index) => {

        dispatch(showModal(modalTypes.ADD_USER, 
            { editMode: true, userToEdit: id, userIndex: index, updateUser })) 
    }


    return (

        <div className="users-wr box-sh">

            <div className="nav-user">

                <div className="add-user" onClick={() => {
                        dispatch(showModal(modalTypes.ADD_USER, {editMode: false, addUser }))
                    }}>
                    <span className="ctr_ic2 l_ho">Ajouter un utilisateur</span> 
                    <i className="fas fa-user-plus fa-add-user" ></i>
                </div>
            </div>

            <div className="user-result">
                {   users.map((user, index) => {

                    return (
                        <div className="user-item mtem_ls" key={user.id}>

                            <div className="user-info">
                                <div className="user-label">{user.id}. {user.nom} {user.prenom}</div>
                                {/* <div className="user-lastCon">{user.lastConnexion}</div> */}
                                {/* <div className="user-dateCr">{user.dateCreation}</div> */}
                            </div>

                            <span className="control-bar">
                                <span className="btn btn-link" onClick={ () => editUser(user.id, index) }>Edit</span>
                                <span className="btn btn-link" onClick={ () => deleteUser(user, index) }>Delete</span>
                                <i className="fas fa-ellipsis-v"></i>
                            </span>

                        </div>
                    )
                    })
                }
            </div>

        </div>

        
    )
}


export default connect(
    // (state) => ({}),
)(UserList);
