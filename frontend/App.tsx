/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {StyleSheet} from 'react-native';

import MainHome from './pages/mainhome';
import MusicChart from './pages/musicchart';

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={MainHome} />
        <Stack.Screen name="MusicChart" component={MusicChart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   defaultframe:{
//     display:'flex',
//     alignItems:'center',
//     justifyContent:'center',
//   }
// });

export default App;
