import * as ImagePicker from 'expo-image-picker';

import {
  ResponseApiDelivery,
} from '../../Data/sources/remote/models/ResponseApiDelivery';
import { User } from '../entities/User';

export interface AuthRepository {

    login(email: string, password: string): Promise<ResponseApiDelivery>;
    register(user: User): Promise<ResponseApiDelivery>
    registerWithImage(user: User, file: ImagePicker.ImageInfo): Promise<ResponseApiDelivery>

}