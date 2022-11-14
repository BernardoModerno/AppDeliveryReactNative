import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserProvider } from '../../../src/Presentation/context/UserContext';
import {
  AdminTabsNavigator,
} from '../../../src/Presentation/navigator/AdminTabsNavigator';
import {
  ClientTabsNavigator,
} from '../../../src/Presentation/navigator/ClientTabsNavigator';
import { HomeScreen } from '../../../src/Presentation/views/home/Home';
import {
  ProfileUpdateScreen,
} from '../../../src/Presentation/views/profile/update/ProfileUpdate';
import {
  RegisterScreen,
} from '../../../src/Presentation/views/register/Register';
import { RolesScreen } from '../../../src/Presentation/views/roles/Roles';
import { User } from '../../Domain/entities/User';

export type RootStackParamList = {
    HomeScreen: undefined,
    RegisterScreen: undefined,
    RolesScreen: undefined,
    AdminTabsNavigator: undefined,
    ClientTabsNavigator: undefined,
    ProfileUpdateScreen: {user: User}
  }

const Stack = createNativeStackNavigator<RootStackParamList>();


export const MainStackNavigator = () => {
  return (
    <UserState>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>

          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
          />
          
          <Stack.Screen 
            name="RegisterScreen" 
            component={RegisterScreen}
            options={{
              headerShown: true,
              title: 'Novo usuário'
            }}  />

        
          <Stack.Screen 
            name="RolesScreen" 
            component={RolesScreen}
            options={{
              headerShown: true,
              title: 'Selecione um rol'
            }}  />

        
          <Stack.Screen
              name="AdminTabsNavigator"
              component={AdminTabsNavigator}
          />
          
          <Stack.Screen
              name="ClientTabsNavigator"
              component={ClientTabsNavigator}
          />
          
          <Stack.Screen
              name="ProfileUpdateScreen"
              component={ProfileUpdateScreen}
              options={{
                headerShown: true,
                title: 'Atualizar usuário'
              }}
          />
          
          
        </Stack.Navigator>
      </UserState>
  )
}

const UserState = ({children}: any) => {
    return (
      <UserProvider>
        { children }
      </UserProvider>
    )
  }