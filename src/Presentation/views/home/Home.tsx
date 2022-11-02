import React from 'react';

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../../../App';
import { CustomTextInput } from '../../components/CustomTextInput';
import { RoundedButton } from '../../components/RoundedButton';
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
        height: '40%',
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
        top: '15%'
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