import React from 'react';

import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../../../App';
import { CustomTextInput } from '../../components/CustomTextInput';
import { RoundedButton } from '../../components/RoundedButton';
import styles from './Styles';
import useViewModel from './ViewModel';

export const HomeScreen = () => {

    const { email, password, onChange } = useViewModel();

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
    <View style={styles.container}>
        <Image
        source={ require('../../../../assets/chef.jpg') } 
        style={ styles.imageBackground }
        />
        <View style={styles.logoContainer}>
          <Image
              source={ require('../../../../assets/logo.png') }
              style={ styles.logoImage }
          />
          <Text style={ styles.logoText } >FOOD APP</Text>
        </View>
        <View style={ styles.form }>
           <Text style={styles.formText} >Entrar:</Text>

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
               <RoundedButton text='LOGIN' onPress={ () => {
                console.log('Email: ' + email);
                console.log('Password: ' + password);
               } } />
           </View>
   
           <View style={ styles.formRegister }>
               <Text>Não tem conta?</Text>
               <TouchableOpacity onPress={ () => navigation.navigate('RegisterScreen') } >
                   <Text style={ styles.formRegisterText }>Registrar-se</Text>
               </TouchableOpacity>
           </View>

        </View>
    </View>
    );
}
    
    
