import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';

import {
  RegisterWithImageAuthUseCase,
} from '../../../Domain/useCases/auth/RegisterWithImageAuth';
import {
  SaveUserLocalUseCase,
} from '../../../Domain/useCases/userLocal/SaveUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';

const RegisterViewModel = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        image: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<ImagePicker.ImageInfo>()
    const { user, getUserSession } = useUserLocal();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        });

        if (!result.cancelled) {
            onChange('image', result.uri);
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

    const register = async () => {
        if (isValidForm()) {
            setLoading(true);
            // const response = await RegisterAuthUseCase(values);
            const response = await RegisterWithImageAuthUseCase(values, file!);
            setLoading(false);
            console.log('RESULT: ' + JSON.stringify(response));        
            if (response.success) {
                await SaveUserLocalUseCase(response.data);
                getUserSession();
            }
            else {
                setErrorMessage(response.message);
            }
        }
    }

    const isValidForm = (): boolean => {
        if (values.name === '') {
            setErrorMessage('Entre com seu nombe');
            return false;
        }
        if (values.lastname === '') {
            setErrorMessage('Entre com seu sobrenome');
            return false;
        }
        if (values.email === '') {
            setErrorMessage('Entre com seu email');
            return false;
        }
        if (values.phone === '') {
            setErrorMessage('Entre com seu telefone');
            return false;
        }
        if (values.password === '') {
            setErrorMessage('Entre com sua senha');
            return false;
        }
        if (values.confirmPassword === '') {
            setErrorMessage('Entre com sua confirmação de senha');
            return false;
        }
        if (values.password !== values.confirmPassword) {
            setErrorMessage('As senhas não coincidem');
            return false;
        }
        if (values.image === '') {
            setErrorMessage('Selecione uma imagem');
            return false;
        }

        return true;
    }

    return {
        ...values,
        onChange,
        register,
        pickImage,
        takePhoto,
        errorMessage,
        loading,
        user
    }
}

export default RegisterViewModel;
