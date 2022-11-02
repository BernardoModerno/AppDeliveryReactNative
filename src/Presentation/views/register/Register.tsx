import React from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../../../App';
import { CustomTextInput } from '../../components/CustomTextInput';
import { RoundedButton } from '../../components/RoundedButton';
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
    
            </View>
        </View>
        );
    }
        
        
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        bottom: '30%'
    }, 
    form: {
        width: '100%',
        height: '70%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        padding: 30
    },
    formText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    formIcon: {
        width: 25,
        height: 25,
        marginTop: 5
    },
    formInput: {
        flexDirection: 'row',
        marginTop: 30,
    },
    formTextInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA',
        marginLeft: 15
    },
    formRegister: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    formRegisterText: {
        fontStyle: 'italic',
        color: 'orange',
        borderBottomWidth: 1,
        borderBottomColor: 'orange',
        fontWeight: 'bold',
        marginLeft: 10
    },
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '5%',
        alignItems: 'center'
    },
    logoImage: {
        width: 100,
        height: 100
    },
    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold'
    },
    
});