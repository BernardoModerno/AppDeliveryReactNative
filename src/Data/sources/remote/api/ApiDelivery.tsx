import axios from 'axios';

import { User } from '../../../../Domain/entities/User';
import { LocalStorage } from '../../local/LocalStorage';

const ApiDelivery = axios.create({
    baseURL: 'http://172.24.96.1:3000/api',
    headers: {
        'Content-type': 'application/json'
    }
})

const ApiDeliveryForImage = axios.create({
    baseURL: 'http://172.24.96.1:3000/api',
    headers: {
        'Content-type': 'multipart/form-data',
        'accept': 'application/json',
    }
});

// INTERCEPTORS
ApiDelivery.interceptors.request.use(
    async(config) => {
        const data = await LocalStorage().getItem('user');
        if (data) {
            const user: User = JSON.parse(data as any);
            config.headers!['Authorization'] = user?.session_token!
        }
        return config;
    }
);

ApiDeliveryForImage.interceptors.request.use(
    async(config) => {
        const data = await LocalStorage().getItem('user');
        if (data) {
            const user: User = JSON.parse(data as any);
            config.headers!['Authorization'] = user?.session_token!
        }
        return config;
    }
);

export { ApiDelivery, ApiDeliveryForImage };