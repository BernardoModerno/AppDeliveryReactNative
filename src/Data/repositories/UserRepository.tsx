import { AxiosError } from 'axios';
import { ImageInfo } from 'expo-image-picker';
import mime from 'mime';

import { User } from '../../Domain/entities/User';
import { UserRepository } from '../../Domain/repositories/UserRepository';
import {
  ApiDelivery,
  ApiDeliveryForImage,
} from '../sources/remote/api/ApiDelivery';
import {
  ResponseApiDelivery,
} from '../sources/remote/models/ResponseApiDelivery';

export class UserRepositoryImpl implements UserRepository {

    async update(user: User): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.put<ResponseApiDelivery>('/users/updateWithoutImage', user);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }

    async updateWithImage(user: User, file: ImageInfo): Promise<ResponseApiDelivery> {
        try {
            let data = new FormData();
            data.append('image', {
                // @ts-ignore
                uri: file.uri,
                name: file.uri.split('/').pop(),
                type: mime.getType(file.uri)!
            });
            data.append('user', JSON.stringify(user));
            const response = await ApiDeliveryForImage.put<ResponseApiDelivery>('/users/update', data);
            return Promise.resolve(response.data);

        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }

}