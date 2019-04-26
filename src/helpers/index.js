
export const asyncFunc = (f) => new Promise((resolve, reject) => {
    f();
    resolve();
})

let counter = 0;
export const uniqueID = () => counter++;

export const uniqueHtmlID = () => `uniq-${uniqueID()}`

export const formatDate = (m) => 
    ("0" + m.getUTCDate()).slice(-2)  + "/" +
    ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
    m.getUTCFullYear()
    // + " " +
    // ("0" + m.getUTCHours()).slice(-2) + ":" +
    // ("0" + m.getUTCMinutes()).slice(-2) + ":" +
    // ("0" + m.getUTCSeconds()).slice(-2);


