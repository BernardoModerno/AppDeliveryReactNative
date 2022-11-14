import React, { useEffect } from 'react';

import {
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RoundedButton } from '../../../components/RoundedButton';
import { RootStackParamList } from '../../../navigator/MainStackNavigator';
import styles from './Styles';
import useViewModel from './ViewModel';

export const ProfileInfoScreen = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user, removeUserSession } = useViewModel();

  useEffect(() => {
    if (user.id === '') {
      navigation.replace('HomeScreen');
    }
  }, [user])
  

  return (
    <View style={ styles.container }>

        <Image
            source={ require('../../../../../assets/city.jpg') } 
            style={ styles.imageBackground }
        />
        
        <Pressable 
          style={ styles.logout }
          onPress={() => {
            removeUserSession();
          }}>
          <Image
                source={ require('../../../../../assets/logout.png') } 
                style={ styles.logoutImage }
            />
        </Pressable>
       
        <View style={ styles.logoContainer }>
            { 
              user?.image !== '' 
                &&
              <Image 
                source={{ uri: user?.image }}
                style={ styles.logoImage }
              />
            }
            
        </View>

        <View style={ styles.form }>
            <View style={ styles.formInfo }>
              <Image
                source={ require('../../../../../assets/user.png')}
                style={ styles.formImage }
              />
              <View style={ styles.formContent }>
                <Text>{ user?.name } {user?.lastname}</Text>
                <Text style={ styles.formTextDescription }>Nome do usuário</Text>
              </View>
            </View>
            
            <View style={ {...styles.formInfo, marginTop: 25} }>
              <Image
                source={ require('../../../../../assets/email.png')}
                style={ styles.formImage }
              />
              <View style={ styles.formContent }>
                <Text>{ user?.email }</Text>
                <Text style={ styles.formTextDescription }>Email</Text>
              </View>
            </View>

            <View style={ {...styles.formInfo, marginTop: 25, marginBottom: 70} }>
              <Image
                source={ require('../../../../../assets/phone.png')}
                style={ styles.formImage }
              />
              <View style={ styles.formContent }>
                <Text>{ user?.phone }</Text>
                <Text style={ styles.formTextDescription }>Telefone</Text>
              </View>
            </View>

            <RoundedButton
              onPress={() => {
                navigation.navigate('ProfileUpdateScreen', { user: user! })
              }}
              text='ATUALIZAR INFORMAÇÃO' />

        </View>

    </View>
  )
}




{/* <Button 
  onPress={() => {
    removeSession();
    navigation.navigate('HomeScreen');
  }}
  title='Cerrar sesion'
/> */}