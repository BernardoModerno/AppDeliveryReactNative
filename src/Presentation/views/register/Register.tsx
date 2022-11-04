import React from 'react';

import {
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../../../App';
import { CustomTextInput } from '../../components/CustomTextInput';
import { RoundedButton } from '../../components/RoundedButton';
import styles from './Styles';
import useViewModel from './ViewModel';

export const RegisterScreen = () => {

    const { name, lastname, email, image, phone, password, confirmPassword, onChange, register } = useViewModel();

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (

        <View style={styles.container}>
            <Image
            source={ require('../../../../assets/chef.jpg') } 
            style={ styles.imageBackground }
            />
            <View style={styles.logoContainer}>
              <Image
                  source={ require('../../../../assets/user_image.png') }
                  style={ styles.logoImage }
              />
              <Text style={ styles.logoText } >Selecione uma imagem</Text>
            </View>
            <View style={ styles.form }>
             <ScrollView>
                 <Text style={styles.formText} >Registrar-se:</Text>
     
                 <CustomTextInput 
                   placeholder='Nome'
                   keyboardType='default'
                   image={ require('../../../../assets/user.png') }
                   property='name'
                   onChangeText={ onChange }
                   value={ name }
                   />
     
     
                 <CustomTextInput 
                   placeholder='Sobrenome'
                   keyboardType='default'
                   image={ require('../../../../assets/my_user.png') }
                   property='lastname'
                   onChangeText={ onChange }
                   value={ lastname }
                   />
                 
                 <CustomTextInput 
                   placeholder='Email'
                   keyboardType='email-address'
                   image={ require('../../../../assets/email.png') }
                   property='email'
                   onChangeText={ onChange }
                   value={ email }
                   />
     
                 <CustomTextInput 
                   placeholder='Telefone'
                   keyboardType='numeric'
                   image={ require('../../../../assets/phone.png') }
                   property='phone'
                   onChangeText={ onChange }
                   value={ phone }
                   />
                 
                 <CustomTextInput 
                   placeholder='Senha'
                   keyboardType='default'
                   image={ require('../../../../assets/password.png') }
                   property='password'
                   onChangeText={ onChange }
                   value={ password }
                   secureTextEntry={ true }
                   />
                 
                 <CustomTextInput 
                   placeholder='Confirmar Senha'
                   keyboardType='default'
                   image={ require('../../../../assets/confirm_password.png') }
                   property='confirmPassword'
                   onChangeText={ onChange }
                   value={ confirmPassword }
                   secureTextEntry={ true }
                   />
       
                 <View style={{ marginTop: 30 }}>
                     <RoundedButton text='CONFIRMAR' onPress={ () => register() } />
                 </View>
            
            </ScrollView>
    
          </View>
        </View>
        );
    }
        
        