import * as ImagePicker from 'expo-image-picker';

import { UserRepositoryImpl } from '../../../Data/repositories/UserRepository';
import { User } from '../../entities/User';

const { updateWithImage } = new UserRepositoryImpl();

export const UpdateWithImageUserUseCase = async(user: User, file: ImagePicker.ImageInfo) => {
    return await updateWithImage(user, file);
}