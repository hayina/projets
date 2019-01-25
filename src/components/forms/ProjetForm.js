import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

import * as actions from '../../actions'

import { required, number } from './validator'
import TextField from './form-fields/TextField'
import SelectField from './form-fields/SelectField'
import RadioField from './form-fields/RadioField'


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

                <Field 
                    name="intitule" 
                    component={TextField} 
                    label="intitulé" 
                    fieldType="textarea"
                    validate={ [required] } 
                />

                <Field 
                    name="mantant" 
                    component={TextField} 
                    label="mantant" 
                    fieldType="input"
                    validate={ [required, number] } 
                />

                <div className="form-group">
                    <label>conventionné</label>
                    <Field name="isConvention" component={RadioField} label="oui" valueField={1} />
                    <Field name="isConvention" component={RadioField} label="non" valueField={0} />
                </div>

                <Field 
                    name="commune" 
                    component={SelectField} 
                    label="commune" 
                    options={['taourirt', 'debdou', 'el aioun']}
                />

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