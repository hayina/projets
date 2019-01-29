import React from 'react';

class Modal extends React.Component {




    render() {

        const { title, children } = this.props;

        return (
            <div className="pop-container">
            
                <div className="pop-header">
                    <div className="pop-title">{title}</div>
                
                </div>

                <div className="pop-content">
                    {children}
                </div>

                <div className="pop-validation">
                    <button className="btn btn-secondary">cancel</button>
                    <button type="submit" className="btn btn-primary">save</button>
                </div>
            
            </div>
        )
    }
}

export default Modal;