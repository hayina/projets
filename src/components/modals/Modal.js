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
            console.log('You clicked outside of me!');
            this.props.toggleModal(this.props.modalName, false);
        }
    }

    render() {

        const { title, children, handleClick } = this.props;

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
                        <button className="btn btn-secondary">Annuler</button>
                        <button type="submit" className="btn btn-primary"
                            onClick={handleClick}
                        >Valider</button>
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



