import React from 'react';



class Modal extends React.Component {




    render() {

        const { title, children, handleClick } = this.props;

        return (
            <div className="pop-container">

                <div className="pop-header">
                    <div className="pop-title">
                        <h1>{title}</h1>
                    </div>
                </div>

                <div className="pop-content">
                    {children}
                </div>

                <div className="pop-validation">
                    <button className="btn btn-secondary">cancel</button>
                    <button type="submit" className="btn btn-primary"
                        onClick={ handleClick }
                    >
                        save
                    </button>
                </div>

            </div>
        )
    }
}


export default Modal;

