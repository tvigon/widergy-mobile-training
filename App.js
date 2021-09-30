/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

import React from 'react';

import {Provider, connect} from 'react-redux';
import {createStore, combineReducers} from 'redux';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Reactotron from './ReactotronConfig';

import HistoryScreen from './screens/HistoryScreen/index';
import HomeScreen from './screens/HomeScreen/index';
import LoginScreen from './screens/LoginScreen';

//import calcApp from './redux/store';
import store from './redux/store';
/*
// showLastCommitMessageForThisLibrary.js
import { create } from 'apisauce';

// define the api
const api = create({
  //baseURL: 'https://widergy-training-api.herokuapp.com',
  baseURL: 'https://private-anon-4d276a4a86-widergytrainingfrontend.apiary-mock.com',
  headers: {Accept: ['application/json', 'charset=utf-8']},
  timeout: 60000,
});

api
  .post('/auth/create', {
    'email': 'vaigon96@hotmail.com',
    'password': 'bocajuniors12',
  })
  .then(response => response.data)
  .then(console.log);

api
  .post('/auth/login', {
    'email': 'vaigon96@hotmail.com',
    'password': 'bocajuniors12',
  })
  .then(response => response.data)
  .then(console.log);

// start making calls
api
  .get('/calc/expressions')
  .then(response => response.data)
  .then(console.log);

api
  .get('/questions')
  .then(response => response.data[0].choices[1].choice)
  .then(console.log);
*/

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
