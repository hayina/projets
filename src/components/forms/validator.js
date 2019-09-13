

export const required = value => value  ? undefined : 'Ce champs est obligatoire'

export const percentage = value => value && (value > 100 || value < 0)  ? 'Valeur incorrect' : undefined
    // value || typeof value === 'number' ? undefined : 'Required'

    

export const number = value =>
    value && isNaN(Number(value)) ? 'Ce champs doit être un nombre' : undefined

export const integer = value => {
    return value && isNaN(parseInt(value, 10))
    ? 'Ce champs doit être un nombre naturel' : undefined
}

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address' : undefined

export const phoneNumber = value =>
    value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits' : undefined

export const alphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters' : undefined

export const emptyArray = array => array && array.length === 0 ? 'Ce champs est obligatoire' : undefined

    
