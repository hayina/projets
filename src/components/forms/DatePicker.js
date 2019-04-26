import React, { useEffect, useState } from 'react';


const DatePicker = ({input, meta : { touched, error } }) => {

    return (
        <input type="text" className="datepicker"  {...input}/>
    )


}


export default DatePicker