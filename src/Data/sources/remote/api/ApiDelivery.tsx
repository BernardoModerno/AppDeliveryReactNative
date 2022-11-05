import axios from 'axios';

const ApiDelivery = axios.create({
    baseURL: 'http://172.28.16.1:3000/api',
    headers: {
        'Content-type': 'application/json'
    }
})

export { ApiDelivery };