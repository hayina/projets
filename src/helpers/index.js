

export const asyncFunc = (f) => new Promise((resolve, reject) => {
    f();
    resolve();
})

let counter = 0;

export const uniqueID = () => {

    // let uniqueID

    // do {
    //     uniqueID=new Date().getTime();
    // } while (document.getElementById(uniqueID))

    console.log('uniqueID ->', counter)

    return counter++;
}

export const uniqueHtmlID = () => `uniq-${uniqueID()}`

