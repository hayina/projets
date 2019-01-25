import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

import * as actions from '../../actions'
import { required, number } from './validator'
import InputField from './form-fields/InputField'


class ProjetForm extends Component {

    

    onSubmit(formValues) {
        console.log(formValues)
    }

    render() {

        // props from redux
        const { handleSubmit } = this.props;
        // const { formValuesChange, form } = this.props;
  

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>

                <Field name="intitule" component={InputField} label="intitulé" validate={[required]}/>
                <Field name="mantant" component={InputField} label="mantant" validate={[required, number]} />
                <button type="submit" className="btn btn-primary">Submit</button>

            </form>
        )
    }
}

// const validate = (formValues) => {

//     const errors = {}
//     if(!formValues.intitule){
//         errors.intitule = 'Requierd !';
//     }

//     return errors;
// }

export default reduxForm({
    form: 'projetForm'
})(ProjetForm)

  
// const mapStateToProps = (state) => { return { form: state.form } }

// export default connect(
//     mapStateToProps,
//     actions
// )(ProjetForm);