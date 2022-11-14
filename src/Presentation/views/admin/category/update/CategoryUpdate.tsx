import React, {
  useEffect,
  useState,
} from 'react';

import {
  ActivityIndicator,
  Image,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import { CustomTextInput } from '../../../../components/CustomTextInput';
import { ModalPickImage } from '../../../../components/ModalPickImage';
import { RoundedButton } from '../../../../components/RoundedButton';
import {
  CategoryStackParamList,
} from '../../../../navigator/AdminCategoryNavigator';
import {
  MyColors,
  MyStyles,
} from '../../../../theme/AppTheme';
import styles from './Styles';
import useViewModel from './ViewModel';

interface Props extends StackScreenProps<CategoryStackParamList, 'AdminCategoryUpdateScreen'>{};

export const AdminCategoryUpdateScreen = ({navigation, route}: Props) => {

  const { category } = route.params;
  const { name, description, responseMessage, loading, image, onChange, takePhoto, pickImage, updateCategory } = useViewModel(category);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (responseMessage !== '') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage])
  

  return (
    <View style={styles.container}>
        <TouchableOpacity 
            style={styles.imageContainer}
            onPress={() => setModalVisible(true)}
        >
            {
              image == ''
              ? <Image
                style={ styles.image }
                source={ require('../../../../../../assets/image_new.png') }
                />
              : <Image 
                  source={{ uri: image }}
                  style={ styles.image }
                />
            }
        </TouchableOpacity>

        <View style={ styles.form }>
            <CustomTextInput 
                placeholder='Nome da categoria'
                image={ require('../../../../../../assets/categories.png')}
                keyboardType='default'
                property='name'
                value={name}
                onChangeText={ onChange }
            />
            <CustomTextInput 
                placeholder='Descrição'
                image={ require('../../../../../../assets/description.png')}
                keyboardType='default'
                property='description'
                value={description}
                onChangeText={ onChange }
            />
        </View>

        <View style={styles.buttonContainer}>
            <RoundedButton 
                text='ATUALIZAR CATEGORIA'
                onPress={() => updateCategory()}
            />
        </View>


        <ModalPickImage
          openGallery={ pickImage }
          openCamera={ takePhoto }
          modalUseState={ modalVisible }
          setModalUseState={ setModalVisible }
          />

        {
          loading && 
          <ActivityIndicator 
            style={MyStyles.loading} 
            size="large" 
            color={ MyColors.primary }  
          />
        }
    </View>
  )
}
