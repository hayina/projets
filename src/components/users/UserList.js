import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { showModal, hideModal, setBreadCrumb } from '../../actions';
import { modalTypes } from '../modals/ModalRoot';
import useAjaxFetch from '../hooks/useAjaxFetch'


import './users.css'
import '../list.css'
import DropDown from '../helpers/DropDown2';

let UserList = ({ dispatch }) => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        // dispatch(showModal(modalTypes.ADD_USER, {editMode: false, addUser }))
        
        dispatch(setBreadCrumb("Gestion des utilisateurs"))

        setLoading(true)
        useAjaxFetch({
            url: 'users',
            method: 'GET',
            success: (data) => {
                setUsers(data)
                setLoading(false)
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

    const deleteUser = ({ id, nom, prenom }, index) => {

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

        <div className="users-wr" id="userPage">

            <div className="nav-user box-sh">

                <div className="result-info">
                {
                    loading ?
                    <span>Chargement des utilisateurs ...</span>
                    :
                    <>
                        <span>{ users.length } utilisateurs retrouvés</span>
                        <i className="fas fa-user-plus" 
                        onClick={() => dispatch(showModal(modalTypes.ADD_USER, {editMode: false, addUser }))} />
                    </>    
                }
                </div>

                {/* <div className="add-user blue-link l_ho" onClick={() => {
                        dispatch(showModal(modalTypes.ADD_USER, {editMode: false, addUser }))
                    }}>
                    Ajouter un utilisateur
                </div> */}



                {/* <div className="add-user blue-link l_ho" onClick={() => {
                        dispatch(showModal(modalTypes.MANAGE_ROLE, {}))
                    }}>
                    Gestion rôles
                </div> */}
            </div>
            

            {!loading &&
            <div className="user-result ">
                {   users.map((user, index) => {

                    return (
                        <div className="user-item " key={user.id}>

                            <div className="user-info">
                                <div className="user-label">{user.nom} {user.prenom}</div>
                                {/* <div className="user-lastCon">{user.lastConnexion}</div> */}
                                {/* <div className="user-dateCr">{user.dateCreation}</div> */}
                            </div>

                            {/* <span className="control-bar">
                                <span className="btn btn-link" onClick={ () => editUser(user.id, index) }>Edit</span>
                                <span className="btn btn-link" onClick={ () => deleteUser(user, index) }>Delete</span>
                                <i className="fas fa-ellipsis-v"></i>
                            </span> */}

                            <DropDown
                                links={[
                                    { label: 'Edit', callback: () => editUser(user.id, index) },
                                    { label: 'Delete', callback: () => deleteUser(user, index) }
                                ]}
                            />

                        </div>
                    )
                    })
                }
            </div>
            }

        </div>

        
    )
}


export default connect(
    // (state) => ({}),
)(UserList);
