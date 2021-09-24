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


const expression = (state, action) => {
  switch (action.type) {
    case 'SAVE_EXPRESSION':
      return {
        id: action.id,
        text: action.text,
      };
    case 'EDIT_EXPRESSION':
      if (state.id !== action.id){
        return state;
      }
      return {
        ...state,
        text: action.text,
      };
    default:
      return state;
  }
};

const historyLog = (state = [], action) => {
  switch (action.type) {
    case 'SAVE_EXPRESSION':
      return [
        ...state,
        expression(undefined, action),
      ];
    case 'EDIT_EXPRESSION':
      return state.map(t => expression(t,action));
    case 'DELETE_EXPRESSION':
      return [ ...state.slice(0,action.id), ...state.slice(action.id + 1)];
    case 'DELETE_ALL':
      return [];
    default:
      return state;
  }
};


const calcApp = combineReducers({
  historyLog,
});


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
