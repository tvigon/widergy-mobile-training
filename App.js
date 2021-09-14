/* eslint-disable prettier/prettier */
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

const solveEquation = val => {
  //con esta condicion me aseguro que haya dos valores y un operador por lo menos
  let regex = /[.]?[0-9]*[.]?[0-9]+[-+/*][.]?[0-9]*[.]?[0-9]+/g;
  let match = regex.exec(val);
  if (match === null) {
    return (val);
  } else {
    if (val.search('/') !== -1){
      let aux1 = val.slice(0,val.search('/'));
      let aux2 = val.slice(val.search('/') + 1);
      return (`${aux1 / aux2}`);
    }
  }

};

const pointButt = val => {
  let myRe = /[^-+/x]+$/g;
  let match = myRe.exec(val);
  if (match === null) {
    return (val + '.');
  } else if (!match[0].includes('.')){
    return (val + '.');
  } else {return val;}
};

const calcOperator = (val, char) => {
  let character = val.charAt(val.length - 1);
  if (val.length !== 0){
    if (
      character === '-' ||
      character === '+' ||
      character === 'x' ||
      character === '/'
    ) {
      return (val.slice(0, -1) + char);
    } else if (character !== '.') {
      return (val + char);
    } else {
      //aca podria venir un solve ecuation
      return val;
    }
  }
  else {return val;}
};

const delOperator = (val) => {
  if (val.length !== 0) {
    return (val.slice(0, -1));
  }
  else {return val;}
};

const getScreenButtons = setVal => [
  {label: '7', onPress: () => {setVal(prevValue => prevValue + '7');}},
  {label: '8', onPress: () => {setVal(prevValue => prevValue + '8');}},
  {label: '9', onPress: () => {setVal(prevValue => prevValue + '9');}},
  {label: '4', onPress: () => {setVal(prevValue => prevValue + '4');}},
  {label: '5', onPress: () => {setVal(prevValue => prevValue + '5');}},
  {label: '6', onPress: () => {setVal(prevValue => prevValue + '6');}},
  {label: '1', onPress: () => {setVal(prevValue => prevValue + '1');}},
  {label: '2', onPress: () => {setVal(prevValue => prevValue + '2');}},
  {label: '3', onPress: () => {setVal(prevValue => prevValue + '3');}},
  {label: '0', onPress: () => {setVal(prevValue => prevValue + '0');}},
  {label: '.', onPress: () => {setVal(prevValue => pointButt(prevValue));}},
  {label: '+', onPress: () => {setVal(prevValue => calcOperator(prevValue,'+'));}},
  {label: '-', onPress: () => {setVal(prevValue => calcOperator(prevValue,'-'));}},
  {label: 'x', onPress: () => {setVal(prevValue => calcOperator(prevValue,'x'));}},
  {label: '/', onPress: () => {setVal(prevValue => calcOperator(prevValue,'/'));}},
];

const getOpScreenButtons = setVal => [
  {label: 'DEL', onPress: () => {setVal(prevValue => delOperator(prevValue));}, onLongPress: () => {setVal('');}},
  {label: '=', onPress: () => {setVal(prevValue => solveEquation(prevValue));}},
];

const renderButtons = (button, useNumericalStyle ) => (
  <TouchableOpacity onPress={button.onPress} onLongPress={button.onLongPress} style={useNumericalStyle ? styles.buttonStyle : styles.opsStyle}>
    <Text style={[styles.text]}>{button.label}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [value, setValue] = useState('');
  const [aux, setAux] = useState('');
  const [error, setError] = useState('');

  const SCREEN_BUTTONS = getScreenButtons(setValue);
  const OP_SCREEN_BUTTONS = getOpScreenButtons(setValue);
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
          {SCREEN_BUTTONS.splice(0, 11).map(button => renderButtons(button, true))}
          {OP_SCREEN_BUTTONS.splice(0,1).map(button => renderButtons(button,true))}
        </View>
        <View style={[styles.opsStyle]}>
          {SCREEN_BUTTONS.splice(0, 4).map(button => renderButtons(button, false))}
          {OP_SCREEN_BUTTONS.splice(0,1).map(button => renderButtons(button,false))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
