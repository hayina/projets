import React from 'react';
import {connect} from 'react-redux';

import { toggleModal } from '../../actions'

import './modal.css'



class Modal extends React.Component {


    constructor(props) {
        super(props);
        this.modalDialogRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.modalDialogRef.current && !this.modalDialogRef.current.contains(event.target)) {
            this.props.toggleModal(this.props.modalName, false);
        }
    }

    // i need this promise cauz the modal component when it toggle to false 
    // it destroy the convention form so the sumbit function dont get called
    doSaving = (f) => new Promise((resolve, reject) => {
        f();
        resolve();
    })

    handleClickValidation = () => {
        const { toggleModal, handleClick, modalName } = this.props;
        this.doSaving(handleClick).then(
            () => toggleModal(modalName, false)
        );
    }

    render() {

        const { title, children, toggleModal, modalName } = this.props;

        return (
            <div className="pop-container">

                <div className="pop-dialog" ref={this.modalDialogRef}>

                    <div className="pop-header">
                        <div className="pop-title">{title}</div>
                    </div>

                    <div className="pop-content">
                        {children}
                    </div>

                    <div className="pop-validation">
                        <button className="btn btn-secondary" 
                            onClick={() => toggleModal(modalName, false)} >Annuler</button>
                        <button type="submit" className="btn btn-primary"
                            onClick={this.handleClickValidation} >Valider</button>
                    </div>
                </div>

            </div>
        )
    }
}


export default connect(
    // map state to props function
    null,
    //map actions dispatch to props
    { toggleModal }
)(Modal);



