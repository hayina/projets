import React from 'react';

class Convention extends React.Component {

    render() {

        return (
            <div className="conv-container">

                <div className="partners-container">
                    <div className="modal-form-line">
                        <label htmlFor="">Partner</label>
                        <input type="text" />
                    </div>
                    <div className="modal-form-line">
                        <label htmlFor="">Montant</label>
                        <input type="text" />
                    </div>


                </div>
                <div id="add-partner" className="add-buttom-btn">add partner</div>

            </div>
        )
    }

}

export default Convention;