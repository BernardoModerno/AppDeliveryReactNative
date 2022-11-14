import * as ImagePicker from 'expo-image-picker';

import {
  CategoryRepositoryImpl,
} from '../../../Data/repositories/CategoryRepository';
import { Category } from '../../entities/Category';

const { updateWithImage } = new CategoryRepositoryImpl();

export const UpdateWithImageCategoryUseCase = async (category: Category, file: ImagePicker.ImageInfo) => {
  return await updateWithImage(category, file);
}
