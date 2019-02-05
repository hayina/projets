import axios from 'axios';


export const jsonplaceholder = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

export const apiServer = axios.create({
    baseURL: '/PROJETS/ajax',
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
});

// /get_partners?q=c