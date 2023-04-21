import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MovieScreen from './src/screens/MovieScreen';
import Home from './src/screens/HomeScreen';

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="movie" component={MovieScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
