import {
  useContext,
  useState,
} from 'react';

import * as ImagePicker from 'expo-image-picker';

import {
  ResponseApiDelivery,
} from '../../../../../Data/sources/remote/models/ResponseApiDelivery';
import { Category } from '../../../../../Domain/entities/Category';
import { CategoryContext } from '../../../../context/CategoryContext';

const AdminCategoryUpdateViewModel = (category: Category) => {

    const [values, setValues] = useState(category);
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<ImagePicker.ImageInfo>()
    const { update, updateWithImage } = useContext(CategoryContext);

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

    const updateCategory = async () => {
        setLoading(true);
        let response = {} as ResponseApiDelivery;
        if (values.image?.includes('https://')) { // ATUALIZAR SEM IMAGEM
            response = await update(values);
        }
        else { // ATUALIZAR COM IMAGEM
            response = await updateWithImage(values, file!);
        }
        setLoading(false);
        setResponseMessage(response.message);
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        });

        if (!result.cancelled) {
            onChange('image', result.uri); // file://ksdajkaskj.png
            setFile(result);
        }
    }
    
    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        });

        if (!result.cancelled) {
            onChange('image', result.uri);
            setFile(result);
        }
    }

    
    return {
        ...values,
        onChange,
        takePhoto,
        pickImage,
        updateCategory,
        loading,
        responseMessage
    }
}

export default AdminCategoryUpdateViewModel;