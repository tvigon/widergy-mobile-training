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

import React, {useState} from 'react';

import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Reactotron from './ReactotronConfig';

import {Snackbar} from 'react-native-paper';

import HistoryScreen from './screens/HistoryScreen/index';
import HomeScreen from './screens/HomeScreen/index';
import LoginScreen from './screens/LoginScreen';
import PollScreen from './screens/PollScreen';

import store from './redux/store';

const Stack = createNativeStackNavigator();

const App = () => {
  const [snackState, setSnackState] = useState({text: '', visible: false});
  const onActivateSnackBar = (msg) => setSnackState(prev => (
    {...prev, text: msg, visible: true}
    ));
  const onDismissSnackBar = () => setSnackState(prev => ({...prev, visible: false}));
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} onActivateSnackBar={onActivateSnackBar} />}
          </Stack.Screen>
          <Stack.Screen name="History">
            {(props) => <HistoryScreen {...props} onActivateSnackBar={onActivateSnackBar} />}
          </Stack.Screen>
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} onActivateSnackBar={onActivateSnackBar} />}
          </Stack.Screen>
          <Stack.Screen name="Poll">
            {(props) => <PollScreen {...props} onActivateSnackBar={onActivateSnackBar} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      <Snackbar visible={snackState.visible} onDismiss={onDismissSnackBar}
        action={{
          label: 'Back',
        }}> {snackState.text}
      </Snackbar>
    </Provider>
  );
};

export default App;
