import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import Stack from './Stack';

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack/>
    </NavigationContainer>
  )
}

export default AppNavigation