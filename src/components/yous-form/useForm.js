import React, { useReducer, useContext, createContext, Fragment } from 'react';

 
export const reducer = (state, action) => {

    console.log(`@@auto-complete/${action.type}`);

    switch (action.type) {

        case 'RESET':
            return { ...initialState, values: action.intialValues };
        case 'SET_VALID':
            return { ...initialState, valid: action.valid };
        case 'SET_SUBMITTING':
            return { ...state, submitting : action.submitting };
        case 'SET_TOUCHED':
            return { ...state, touched : { ...state.touched, [action.field]: action.touched } };
        case 'SET_ERRORS':
            return { ...state, errors : { ...state.errors, [action.field]: action.error } };
        case 'SET_VALUES':
            return { ...state, values : { ...state.values, [action.field]: action.value } };
        case 'SET_PROP':
            return { ...state, [action.prop] : { ...[action.prop], [action.field]: action.value } };

        default:
            throw new Error();
    }

}

const initialState = {
    values: {},
    errors: {},
    touched: {},
    submitting: false,
    valid: false
}

export const setProp = (prop, field, value) => ({ type: 'SET_PROP', prop, field, value }) 
export const setValues = (field, value) => ({ type: 'SET_VALUES', field, value }) 
export const setErrors = (field, error) => ({ type: 'SET_ERRORS', field, error }) 
export const setTouched = (field, touched) => ({ type: 'SET_TOUCHED', field, touched }) 
export const setDirty = (field, dirty) => ({ type: 'SET_DIRTY', field, dirty }) 
export const setSubmitting = (submitting) => ({ type: 'SET_SUBMITTING', submitting }) 
export const reset = (intialValues) => ({ type: 'RESET', intialValues }) 
export const setValid = (valid) => ({ type: 'SET_VALID', valid }) 

export const FormContext = createContext({});

export const FormProvider = ({ intialValues, rules, children }) => {

    const [state, dispatchForm] = useReducer(reducer, { ...initialState, values: intialValues })

    // console.log('Form Provider State ->', state)

    const validateFields = ({checkAll=true}) => {
        Object.entries(rules).forEach(([field, validators]) => {
            if( ( checkAll || state.touched[field] ) ) {
                validate(field, validators, state.values[field])
            }
        })
    }

    const validate = (field, validators, value) => {

        if ( validators === undefined ) return

        for (let rule of validators) {
            let error = rule(value)
            // console.log(field, error)
            dispatchForm(setErrors(field, error))
            if( error !== undefined ) break
        }
    }

    const onSubmit = (submit, editMode) => {
        // validateFields({})


        console.log('Submitting ...')
        // Check if the form is touched
        if( !editMode && Object.keys(state.touched).length < 1  ){
            // dispatchForm(setValid(false))
            validateFields({})
            console.log('ERROR onSubmit')
            return
        }

        console.log('Errors  ---->  ', Object.entries(state.errors).some(([field, err]) => err !== undefined))
        if( Object.entries(state.errors).some(([field, err]) => err !== undefined) ){
            // dispatchForm(setValid(false))
            console.log('ERROR onSubmit')
            return
        }
        console.log('OKEY onSubmit')

        dispatchForm(setValid(true))
        submit()
    }

    const onChange = (field, value) => {
        dispatchForm(setValues(field, value))
        validate(field, rules[field], value)
    }

    const onFocus = (field) => {
        dispatchForm(setTouched(field, true))
        validateFields({checkAll: false})
    }

    return (
        <FormContext.Provider value={{ state, dispatchForm, onSubmit, onChange, onFocus }}>
           {children}
        </FormContext.Provider>
    )

}

export const Field = ({ name, children }) => {

    const { state, onChange, onFocus } = useContext(FormContext);

    // console.log(`Field`, state);


    return (
        <Fragment>
            { 
                children({ 
                    input: {
                        value: state.values[name], 
                        onChange: (e) => {
                            onChange(name, e.nativeEvent instanceof Event ? e.target.value : e)
                        }, 
                        onFocus: (e) => onFocus(name) 
                    },
                    meta: {
                        error: state.errors[name],
                    }       
                }) 
            }
        </Fragment>
    )
}

