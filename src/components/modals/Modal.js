import React from 'react';

import './modal.css'



class Modal extends React.Component {




    render() {

        const { title, children, handleClick } = this.props;

        return (
            <div className="pop-container">

                <div className="pop-dialog">

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


export default Modal;

