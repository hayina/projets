

export const asyncFunc = (f) => new Promise((resolve, reject) => {
    f();
    resolve();
})