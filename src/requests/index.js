import axios from 'axios';


export const jsonplaceholder = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

export const apiServer = axios.create({
    baseURL: '/PROJETS/ajax',
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
    
})
// .interceptors.response.use( (response) => { 
//     // Do something with response data 
//     return response; 
// }, (error) => { 
//     // Do something with response error 
//     console.log('error interceptor')
//     return Promise.reject(error); 
// })
;

