import React, { useEffect } from 'react';

import {
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import { CustomTextInput } from '../../components/CustomTextInput';
import { RoundedButton } from '../../components/RoundedButton';
import { RootStackParamList } from '../../navigator/MainStackNavigator';
import styles from './Styles';
import useViewModel from './ViewModel';

interface Props extends StackScreenProps<RootStackParamList, 'HomeScreen'>{};

export const HomeScreen = ({navigation, route}: Props) => {

    const { email, password, errorMessage, onChange, login, user } = useViewModel();
    
    useEffect(() => {
        if (errorMessage !== '') {
            ToastAndroid.show(errorMessage, ToastAndroid.LONG);
        }
    }, [errorMessage])

    useEffect(() => {      
        if (user?.id !== null && user?.id !== undefined && user?.id !== '') {
            if (user.roles?.length! > 1) {
                navigation.replace('RolesScreen');
            }
            else {
                navigation.replace('ClientTabsNavigator');
            }
        }
    }, [user])
    
    return (
    // COLUMN
    <View style={styles.container}>
        <Image
            source={ require('../../../../assets/chef.jpg') } 
            style={ styles.imageBackground }
        />

        <View style={ styles.logoContainer }>
            <Image 
                source={ require('../../../../assets/logo.png') }
                style={ styles.logoImage }
            />

            <Text style={ styles.logoText }>FOOD APP</Text>
        </View>

        <View style={ styles.form }>

            <Text style={ styles.formText }>ENTRAR:</Text>
            
            <CustomTextInput 
                image={ require('../../../../assets/email.png') }
                placeholder='Email'
                keyboardType='email-address'
                property='email'
                onChangeText={ onChange }
                value={ email }
            />
        
            <CustomTextInput 
                image={ require('../../../../assets/password.png') }
                placeholder='Senha'
                keyboardType='default'
                property='password'
                onChangeText={ onChange }
                value={ password }
                secureTextEntry={ true }
            />

            <View style={{ marginTop: 30 }}>
                
                <RoundedButton text='LOGIN' onPress={ () => login()} />

            </View>

            <View style={ styles.formRegister }>
                <Text>Não tem conta?</Text>
                
                <TouchableOpacity onPress={ () => navigation.navigate('RegisterScreen') }>
                    <Text style={ styles.formRegisterText }>Registrar-se</Text>
                </TouchableOpacity>
                
            </View>

        </View>
        
    </View>
    );
}
    
