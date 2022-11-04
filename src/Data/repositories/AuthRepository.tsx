import { AxiosError } from 'axios';

import { User } from '../../Domain/entities/User';
import { AuthRepository } from '../../Domain/repositories/AuthRepository';
import { ApiDelivery } from '../sources/remote/api/ApiDelivery';
import {
  ResponseApiDelivery,
} from '../sources/remote/models/ResponseApiDelivery';

export class AuthRepositoryImpl implements AuthRepository {

    async register(user: User): Promise<ResponseApiDelivery> {
        try {
            
            const response = await ApiDelivery.post<ResponseApiDelivery>('/users/create', user);
            return Promise.resolve(response.data);

        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }

}