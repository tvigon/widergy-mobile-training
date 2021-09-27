/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {Provider, connect} from 'react-redux';
import {createStore, combineReducers} from 'redux';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HistoryScreen from './screens/HistoryScreen/index';
import HomeScreen from './screens/HomeScreen/index';

import calcApp from './redux/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={createStore(calcApp)}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
