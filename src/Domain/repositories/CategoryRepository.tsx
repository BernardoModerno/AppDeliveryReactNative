import * as ImagePicker from 'expo-image-picker';

import {
  ResponseApiDelivery,
} from '../../Data/sources/remote/models/ResponseApiDelivery';
import { Category } from '../entities/Category';

export interface CategoryRepository {

    getAll(): Promise<Category[]>;
    create(category: Category, file: ImagePicker.ImageInfo): Promise<ResponseApiDelivery>;
    update(category: Category): Promise<ResponseApiDelivery>;
    updateWithImage(category: Category, file: ImagePicker.ImageInfo): Promise<ResponseApiDelivery>;
    remove(id: string): Promise<ResponseApiDelivery>;
}