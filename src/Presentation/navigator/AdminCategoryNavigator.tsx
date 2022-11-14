import React from 'react';

import {
  Image,
  TouchableOpacity,
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Category } from '../../Domain/entities/Category';
import { CategoryProvider } from '../context/CategoryContext';
import {
  AdminCategoryCreateScreen,
} from '../views/admin/category/create/CategoryCreate';
import {
  AdminCategoryListScreen,
} from '../views/admin/category/list/CategoryList';
import {
  AdminCategoryUpdateScreen,
} from '../views/admin/category/update/CategoryUpdate';

export type CategoryStackParamList = {
    AdminCategoryListScreen: undefined,
    AdminCategoryCreateScreen: undefined,
    AdminCategoryUpdateScreen: { category: Category },
}

const Stack = createNativeStackNavigator<CategoryStackParamList>();

export const AdminCategoryNavigator = () => {
  return (
    <CategoryState>

        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>

            <Stack.Screen
              name="AdminCategoryListScreen"
              component={AdminCategoryListScreen}
              options={ ({route, navigation}) => (
                {
                  headerShown: true,
                  title: 'Categorias',
                  headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('AdminCategoryCreateScreen')}>
                      <Image 
                        source={ require('../../../assets/add.png') }
                        style={{ width:35, height: 35 }}
                      />
                    </TouchableOpacity>
                  )
                }
            )}
            />
            
            <Stack.Screen
              name="AdminCategoryCreateScreen"
              component={AdminCategoryCreateScreen}
              options={{
                headerShown: true,
                title: 'Nova categoria'
              }}
            />

            <Stack.Screen
              name="AdminCategoryUpdateScreen"
              component={AdminCategoryUpdateScreen}
              options={{
                headerShown: true,
                title: 'Editar categoria'
              }}
            />

        </Stack.Navigator>
        
    </CategoryState>
  )
}

const CategoryState = ({children}: any) => {
  return (
    <CategoryProvider>
      { children }
    </CategoryProvider>
  )
}
