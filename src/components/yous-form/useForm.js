import React, { useReducer, useContext, createContext } from 'react';

 
export const reducer = (state, action) => {

    console.log(`@@auto-complete/${action.type}`);

    switch (action.type) {

        case 'RESET':
            return { ...initialState, values: action.intialValues }; // attention de copier initialState

        case 'FIRST_TIME_VALIDATION':
            return { ...state, firstTimeValidation: action.value };
        case 'SET_SUBMITTING':
            return { ...state, submitting : action.submitting };
        case 'SET_TOUCHED':
            return { ...state, touched : { ...state.touched, [action.field]: action.touched } };
        case 'SET_DIRTY':
            return { ...state, dirty : { ...state.dirty, [action.field]: action.dirty } };
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
    dirty: {},
    submitting: false,
    firstTimeValidation: false
    // valid: false
}

// export const setProp = (prop, field, value) => ({ type: 'SET_PROP', prop, field, value }) 
export const setValues = (field, value) => ({ type: 'SET_VALUES', field, value }) 
export const setErrors = (field, error) => ({ type: 'SET_ERRORS', field, error }) 
export const setTouched = (field, touched) => ({ type: 'SET_TOUCHED', field, touched }) 
export const setDirty = (field, dirty) => ({ type: 'SET_DIRTY', field, dirty }) 
export const setSubmitting = (submitting) => ({ type: 'SET_SUBMITTING', submitting }) 
export const reset = (intialValues) => ({ type: 'RESET', intialValues }) 
export const setFirstTimeValidation = (value) => ({ type: 'FIRST_TIME_VALIDATION', value }) 
// export const setValid = (valid) => ({ type: 'SET_VALID', valid }) 

export const FormContext = createContext({});


export const FormProvider = ({ intialValues, rules, children }) => {

    const [state, dispatchForm] = useReducer(reducer, { ...initialState, values: intialValues })

    // console.log('Form Provider State ->', state)

    const validateFields = ({ checkAll=true }) => {

        // let nErrors = {}
        Object.entries(rules).forEach(([field, validators]) => {
            if( checkAll || state.touched[field] ) {
                validate(field, validators, state.values[field])
            }
        })
    }

    const validate = (field, validators, value) => {

        if ( validators === undefined ) return undefined

        for (let rule of validators) {
            let error = rule(value)
            // console.log(field, error)
            dispatchForm(setErrors(field, error))
            if( error !== undefined ) return error
        }

        return undefined
    }

    
    const onSubmit = (submit, editMode) => {
        // validateFields({})

        console.log('Submitting ...', state)
        console.log('firstTimeValidation -> ', state.firstTimeValidation)
        //if form is new mode && fields to be validated are not all dirty
        if( !state.firstTimeValidation && !editMode && Object.keys(state.dirty)
                        .filter(tField => rules[tField] !== undefined).length !== Object.keys(rules).length ){
            console.log('New & Not all dirty')
            dispatchForm(setFirstTimeValidation(true))
            validateFields({})
            return
        }

        //if form is new mode && 

        if( Object.entries(state.errors).some(([field, err]) => err !== undefined) ){
            console.log('Form has errors')
            return
        }
        // console.log('OKEY onSubmit')
        // return
        // console.log('editMode', editMode)

        // dispatchForm(setValid(true))
        submit()
    }

    const onChange = (field, value) => {
        
        dispatchForm(setValues(field, value))
        dispatchForm(setDirty(field, true))
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

    return (
        <>
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
        </>
    )
}

