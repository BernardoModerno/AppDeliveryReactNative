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
            return Promise.resolve({ error: undefined, result: response.data });

        } catch (error) {
            let e = (error as Error).message;
            console.log('ERROR: ' + e);
            return Promise.resolve({ error: e, result: undefined })
        }
    }

}