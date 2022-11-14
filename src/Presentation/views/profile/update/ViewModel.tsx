import {
  useContext,
  useState,
} from 'react';

import * as ImagePicker from 'expo-image-picker';

import {
  ResponseApiDelivery,
} from '../../../../Data/sources/remote/models/ResponseApiDelivery';
import { User } from '../../../../Domain/entities/User';
import { UpdateUserUseCase } from '../../../../Domain/useCases/user/UpdateUser';
import {
  UpdateWithImageUserUseCase,
} from '../../../../Domain/useCases/user/UpdateWithImageUser';
import { UserContext } from '../../../context/UserContext';
import { useUserLocal } from '../../../hooks/useUserLocal';

const ProfileUpdateViewModel = (user: User) => {

    const [values, setValues] = useState(user);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<ImagePicker.ImageInfo>()
    const { getUserSession } = useUserLocal();
    const { saveUserSession } = useContext( UserContext );

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

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value })
    }
    
    const onChangeInfoUpdate = (name: string, lastname: string, phone: string) => {
        setValues({ ...values, name, lastname, phone})
    }

    const update = async () => {
        if (isValidForm()) {
            setLoading(true);
            
            let response  = {} as ResponseApiDelivery;

            if (values.image?.includes('https://')) {
                response = await UpdateUserUseCase(values);
            }
            else {
                response = await UpdateWithImageUserUseCase(values, file!);
            }
            
            setLoading(false);
            console.log('RESULT: ' + JSON.stringify(response));        
            if (response.success) {
                saveUserSession(response.data);
                setSuccessMessage(response.message);
            }
            else {
                setErrorMessage(response.message);
            }
        }
    }

    const isValidForm = (): boolean => {
        if (values.name === '') {
            setErrorMessage('Entre com seu nome');
            return false;
        }
        if (values.lastname === '') {
            setErrorMessage('Entre com seu sobrenome');
            return false;
        }
        if (values.phone === '') {
            setErrorMessage('Entre com seu telefone');
            return false;
        }
        
        return true;
    }

    return {
        ...values,
        onChange,
        update,
        pickImage,
        takePhoto,
        onChangeInfoUpdate,
        errorMessage,
        successMessage,
        loading,
        user
    }
}

export default ProfileUpdateViewModel;
