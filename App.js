/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import OpCalcButtons from './components/OpCalcButtons';
import CalcButtons from './components/CalcButtons';
import styles from './styles';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Button, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

const getScreenButtons = (setVal, opFunc) => [
  {label: '7', onPress: setVal},
  {label: '8', onPress: setVal},
  {label: '9', onPress: setVal},
  {label: '4', onPress: setVal},
  {label: '5', onPress: setVal},
  {label: '6', onPress: setVal},
  {label: '1', onPress: setVal},
  {label: '2', onPress: setVal},
  {label: '3', onPress: setVal},
  {label: '0', onPress: setVal},
  {label: '.', onPress: setVal},
  {label: 'DEL', onPress: opFunc},
  {label: '+', onPress: setVal},
  {label: '-', onPress: setVal},
  {label: 'x', onPress: setVal},
  {label: '/', onPress: setVal},
  {label: '=', onPress: opFunc},
];

const renderButtons = button => (
  <TouchableOpacity onPress={button.onPress} style={[styles.buttonStyle]}>
    <Text style={[styles.text]}>{button.label}</Text>
  </TouchableOpacity>
);

const renderOpButtons = button => (
  <TouchableOpacity onPress={button.onPress} style={[styles.opsStyle]}>
    <Text style={[styles.text]}>{button.label}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [value, setValue] = useState('');
  const [aux, setAux] = useState('');
  const [error, setError] = useState('');

  const SCREEN_BUTTONS = getScreenButtons(setValue);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <Text style={styles.screenText}>
          {error}
          {aux}
          {value}
        </Text>
      </View>
      <View style={[styles.row, styles.allButtons]}>
        <View style={[styles.row, styles.numButtons]}>
          {SCREEN_BUTTONS.splice(0, 12).map(renderButtons)}
        </View>
        <View style={[styles.opsStyle]}>
          {SCREEN_BUTTONS.map(renderOpButtons)}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
