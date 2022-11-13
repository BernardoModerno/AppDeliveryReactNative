import * as ImagePicker from 'expo-image-picker';

import {
  ResponseApiDelivery,
} from '../../Data/sources/remote/models/ResponseApiDelivery';
import { User } from '../entities/User';

export interface UserRepository {

    update(user: User): Promise<ResponseApiDelivery>;
    updateWithImage(user: User, file: ImagePicker.ImageInfo): Promise<ResponseApiDelivery>;

}