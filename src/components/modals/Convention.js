import React from 'react';
import { Field, reduxForm, arrayPush } from 'redux-form';

import { TextField } from '../forms/form-fields/fields'
import Selected from '../forms/form-fields/Selected'
import { onSelectAC } from '../../actions/autocomplete';

const onSubmit = (formValues, dispatch) => {
    dispatch(arrayPush('projetForm', 'partners', formValues));
}

const formName = 'conventionForm';

class Convention extends React.Component {

    render() {

        const { handleSubmit, dispatch } = this.props;
        const props = { component: TextField, fieldType: 'input' }

        return (
            <div className="conv-container">
                <form onSubmit={ handleSubmit }>

                    <Selected label="Commune OUJDA ANGAD" value="3" />
                    
                    <Field name="name" label="Partenaire" {...props} 
                        reduxForm={{ form: formName, field: "name" }}
                        autoComplete={{
                            // name: 'partnerAC',
                            onSelect: (suggestion) => {
                                dispatch(onSelectAC(suggestion, 'partner'));
                            }
                        }}     
                    />
                    <Field name="montant" label="Montant" {...props} />
                    <Field name="signature" label="signature" 
                    autoComplete {...props} reduxForm={{ form: formName, field: "signature" }}/>
                </form >
            </div >
        )
    }

}

export default Convention = reduxForm({
    form: formName, 
    onSubmit
})(Convention)
