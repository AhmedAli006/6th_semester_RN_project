

import React from 'react';

import {
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Home from './screens/Home';

const Stack = createStackNavigator();
const App = () => {
  return (
    <>
      
      <NavigationContainer >
         <Stack.Navigator screenOptions={{
    headerShown: false
  }} initialRouteName='home'>
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen  name="home" component={Home} />

    </Stack.Navigator>
        </NavigationContainer>
    </>
  )
}

export default App