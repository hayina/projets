import { ATTACH_TYPE } from "../types";
import { store } from "../store";
import { logoutUser, hideModal } from "../actions";

export const asyncFunc = (f) => new Promise((resolve, reject) => {
    f();
    resolve();
})

let counter = 0;
export const uniqueID = () => counter++;

export const uniqueHtmlID = () => `uniq-${uniqueID()}`

// export const formatDate = (m) => {
//     return ("0" + m.getDate()).slice(-2)  + "/" + ("0" + (m.getMonth()+1)).slice(-2) + "/" + m.getFullYear()
// }

export const formatDate = (date, sep="/") => {
    date = new Date(date)
    return ("0" + date.getDate()).slice(-2)  + `${sep}` + ("0" + (date.getMonth()+1)).slice(-2) + `${sep}` + date.getFullYear()
}



export const isBefore = (date, before) => new Date(date).setHours(0,0,0,0) < new Date(before).setHours(0,0,0,0)
export const isAfter = (date, after) => new Date(date).setHours(0,0,0,0) > new Date(after).setHours(0,0,0,0)
export const isFuture = (date) => new Date(date).setHours(0,0,0,0) > new Date().setHours(0,0,0,0)
export const isPast = (date) => new Date(date).setHours(0,0,0,0) < new Date().setHours(0,0,0,0)



export const getAttachLink = ({ attachType, idMarche, date, label }) => 
    `${process.env.PUBLIC_URL}/attachments/${idMarche}/${attachType}/download?n=${label}&d=${formatDate(date, '-')}`


export const getOsImgLink = (props) => getAttachLink({ ...props, attachType: ATTACH_TYPE.OS })
export const getDecImgLink = (props) => getAttachLink({ ...props, attachType: ATTACH_TYPE.DEC })



export const toUrlParams = obj => Object.keys(obj)
                                                // .filter(key =>  obj[key] && obj[key].length !==0)
                                                .map(key => `${key}=${encodeURIComponent(obj[key])}`)
                                                .join('&')

export const urlParamsTo = (urlParams) => Object.fromEntries(new URLSearchParams(urlParams))


export const getItemFromStorage = (item) => localStorage.getItem(item)


export const setSigninTokens = ({ userInfo, token }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userInfo', userInfo);
}
export const deleteSigninTokens = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
}

export const logoutAndClean = () => {
    store.dispatch(logoutUser())
    store.dispatch(hideModal())
    deleteSigninTokens()
}





