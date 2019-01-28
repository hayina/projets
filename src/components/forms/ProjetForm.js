import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

import * as actions from '../../actions'

import { required, number } from './validator'
import TextField from './form-fields/TextField'
import SelectField from './form-fields/SelectField'
import RadioField from './form-fields/RadioField'


class ProjetForm extends Component {

    componentDidMount(){
        // initialize the form

        this.props.initFormValues();
    }

    onSubmit(formValues) {
        console.log(formValues)
    }

    render() {

        // props from redux
        const { handleSubmit, initialValues } = this.props;
        // const { formValuesChange, form } = this.props;

        console.log(`initialValues -> `,initialValues)

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
                    name="montant" 
                    component={TextField} 
                    label="montant" 
                    fieldType="input"
                    validate={ [required, number] } 
                />

                <div className="form-group">
                    <label>conventionné</label>
                    <Field name="isConvention" component={RadioField} label="non" valueField={false} />
                    <Field name="isConvention" component={RadioField} label="oui" valueField={true} />
                </div>

                <Field 
                    name="secteur" 
                    component={SelectField} 
                    label="commune" 
                    options={['santé', 'education', 'eau potable', 'électricité', 'routes & voiries', 'autres']}
                    validate={ [required] } 
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


// connecting with the redux-form hoc
ProjetForm =  reduxForm({
    form: 'projetForm'
})(ProjetForm)


// connecting with the redux hoc
export default connect(
    // MapStateToProps
    (state) => ({
        initialValues: state.initialValues
    }),
    //MapDispatchToProps
    {
        initFormValues: actions.initFormValues
    }
)
(ProjetForm);
  
// const mapStateToProps = (state) => { return { form: state.form } }

// export default connect(
//     mapStateToProps,
//     actions
// )(ProjetForm);