import React from 'react'


////////////// SIMPLE FIELD

export const SimpleFormLine = ({ children, label, meta }) => {

    // console.log('SimpleField RENDERING ---------------------------->')

    // const hasErors = errors !== undefined ? true : false
    return (
        <div className={`sf-line`}>
            {label && <label className={`sf-label af_lb`}>{label}</label>}
            {/* <div className="sf-line-wr"> */}
            <div className={`sf-data`}>{children}</div>
            {meta.error && <div className="sf-error error-feedback">{meta.error}</div>}
            {/* </div> */}
        </div>
    )
}

////////////// SIMPLE FIELD

export const TextInput = ({ input, label, meta, placeholder = '', type = 'text', autoComplete = 'off' }) => (
    <SimpleFormLine label={label} meta={meta}>
        <input
            type={type} placeholder={placeholder} autoComplete={autoComplete}
            className={`form-control sf-inp ${ meta.error ? 'has-errors' : '' }`}
            {...input}
        />
    </SimpleFormLine>
)

export const SfSelect = ({ input, meta, label, options, defaultLabel = "Choisir ..." }) => {



    return (
        <SimpleFormLine label={label} meta={meta} >
            <select
                className={`form-control sf-select`}
                {...input}
            >
                <option value='' >{defaultLabel}</option>
                {options.map((op) => <option key={op.value} value={op.value}>{op.label}</option>)}
            </select>
        </SimpleFormLine>
    )
}