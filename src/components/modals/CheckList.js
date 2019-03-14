import React from 'react';
import { connect } from 'react-redux';

import Modal from './Modal';
import { hideModal } from '../../actions';

import './checkList.css';


let CheckList = ({ list, dispatch }) => {

    return (

        <Modal
            handleValidation={() => dispatch(hideModal())  }
            title="Choisir la localisation du projet"
        >
            <div className="check-list-container">


                LIST ({list})
            {/* {   list.map((el) => (
                    <div className="form-check" key={el.id}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                        />
                        <label className="form-check-label">{el.nom}</label>
                    </div>
                )) 
            } */}

            </div>
        </Modal>
    )
}


export default connect()(CheckList)