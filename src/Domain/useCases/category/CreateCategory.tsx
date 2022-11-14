import * as ImagePicker from 'expo-image-picker';

import {
  CategoryRepositoryImpl,
} from '../../../Data/repositories/CategoryRepository';
import { Category } from '../../entities/Category';

const { create } = new CategoryRepositoryImpl();

export const CreateCategoryUseCase = async (category: Category, file: ImagePicker.ImageInfo) => {
  return await create(category, file);
}
