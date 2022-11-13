import {
  useContext,
  useState,
} from 'react';

import { LoginAuthUseCase } from '../../../Domain/useCases/auth/LoginAuth';
import { UserContext } from '../../context/UserContext';

const HomeViewModel = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    // const { user, getUserSession } = useUserLocal();
    const { user, saveUserSession } = useContext( UserContext );
    console.log('USUARIO DE SESSÃO: ' + JSON.stringify(user));
    

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

    const login = async () => {
        if (isValidForm()) {
            const response =  await LoginAuthUseCase(values.email, values.password);
            console.log('RESPONSE: ' + JSON.stringify(response));
            if (!response.success) {
                setErrorMessage(response.message);
            }
            else {
                saveUserSession(response.data);
            }
        }
    }

    const isValidForm = (): boolean => {
        if (values.email === '') {
            setErrorMessage('Entre com seu email');
            return false;
        }
        if (values.password === '') {
            setErrorMessage('Entre com sua senha');
            return false;
        }

        return true;
    }

    return {
        ...values,
        user,
        onChange,
        login,
        errorMessage
    }
}

export default HomeViewModel;
