import { useState } from 'react';

import {
  RegisterAuthUseCase,
} from '../../../Domain/useCases/auth/RegisterAuth';

const RegisterViewModel = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value })
    }

    const register = async () => {
        if (isValidForm()) {
            const response = await RegisterAuthUseCase(values);
            console.log('RESULT: ' + JSON.stringify(response));        
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

        return true;
    }

    return {
        ...values,
        onChange,
        register,
        errorMessage
    }
}

export default RegisterViewModel;
