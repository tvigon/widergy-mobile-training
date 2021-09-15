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
  let regex = /[-]?[.]?[0-9]*[.]?[0-9]+[-+/x][.]?[0-9]*[.]?[0-9]+/g;
  let match = regex.exec(val);
  if (match === null) {
    return (val);
  } else {
    if (val.search('/') !== -1){
      let aux1 = parseFloat(val.slice(0,val.search('/')));
      let aux2 = parseFloat(val.slice(val.search('/') + 1));
      if (
        aux1 / aux2 === Infinity ||
        aux1 / aux2 === -Infinity ||
        isNaN(aux1 / aux2)
      ) {
        return ('mathError');
      }
      return (`${aux1 / aux2}`);
    }
    if (val.search('x') !== -1){
      let aux7 = val.slice(0,val.search('x'));
      let aux8 = val.slice(val.search('x') + 1);
      return (`${aux7 * aux8}`);
    }
    if (val.search(/\+/) !== -1){
      let aux3 = parseFloat(val.slice(0,val.search(/\+/)));
      let aux4 = parseFloat(val.slice(val.search(/\+/) + 1));
      return (`${aux3 + aux4}`);
    }
    if (val.search('-') !== -1){
      let auxx = 1;
      if (val[0] === '-') {
        val = val.slice(1);
        auxx = -1;
      }
      let aux5 = auxx * val.slice(0,val.search('-'));
      let aux6 = val.slice(val.search('-') + 1);
      return (`${aux5 - aux6}`);
    }
  }

};

const pointButt = val => {
  if (/[a]+/g.test(val)){
    return '.';
  }
  let myRe = /[^-+/x]+$/g;
  let match = myRe.exec(val);
  if (match === null) {
    return (val + '.');
  } else if (!match[0].includes('.')){
    return (val + '.');
  } else {return val;}
};

const calcOperator = (val, char) => {
  if (/[a]+/g.test(val)){
    return '';
  }
  if (val.length === 0 && char === '-'){
    return (char);
  } else if (val.length === 0){return val;}
  else {
    if (val.length === 1 && val[0] === '-'){
      return val;
    }
    let character = val.charAt(val.length - 1);
    if (
      character === '-' ||
      character === '+' ||
      character === 'x' ||
      character === '/'
    ) {
      return (val.slice(0, -1) + char);
    } else if (character !== '.') {
        if (
          val.includes('-') ||
          val.includes('/') ||
          val.includes('x') ||
          val.includes('+')
        ) {
          return (solveEquation(val) + char);
        } else {
          return (val + char);
        }
    } else {
      return val;
    }
  }
};

const delOperator = (val) => {
  if (/[a]+/g.test(val)){
    return '';
  }
  if (val.length !== 0) {
    return (val.slice(0, -1));
  }
  else {return val;}
};

const numButton = (val,num) => {
  if (/[a]+/g.test(val)){
    return num;
  }
  return (val + num);
};

const getScreenButtons = setVal => [
  {label: '7', onPress: () => {setVal(prevValue => numButton(prevValue, '7'));}},
  {label: '8', onPress: () => {setVal(prevValue => numButton(prevValue, '8'));}},
  {label: '9', onPress: () => {setVal(prevValue => numButton(prevValue, '9'));}},
  {label: '4', onPress: () => {setVal(prevValue => numButton(prevValue, '4'));}},
  {label: '5', onPress: () => {setVal(prevValue => numButton(prevValue, '5'));}},
  {label: '6', onPress: () => {setVal(prevValue => numButton(prevValue, '6'));}},
  {label: '1', onPress: () => {setVal(prevValue => numButton(prevValue, '1'));}},
  {label: '2', onPress: () => {setVal(prevValue => numButton(prevValue, '2'));}},
  {label: '3', onPress: () => {setVal(prevValue => numButton(prevValue, '3'));}},
  {label: '0', onPress: () => {setVal(prevValue => numButton(prevValue, '0'));}},
  {label: '.', onPress: () => {setVal(prevValue => pointButt(prevValue));}},
  {label: 'DEL', onPress: () => {setVal(prevValue => delOperator(prevValue));}, onLongPress: () => {setVal('');}},
  {label: '+', onPress: () => {setVal(prevValue => calcOperator(prevValue,'+'));}},
  {label: '-', onPress: () => {setVal(prevValue => calcOperator(prevValue,'-'));}},
  {label: 'x', onPress: () => {setVal(prevValue => calcOperator(prevValue,'x'));}},
  {label: '/', onPress: () => {setVal(prevValue => calcOperator(prevValue,'/'));}},
  {label: '=', onPress: () => {setVal(prevValue => solveEquation(prevValue));}},
];

const renderButtons = (button, useNumericalStyle ) => (
  <TouchableOpacity onPress={button.onPress} onLongPress={button.onLongPress} style={useNumericalStyle ? styles.buttonStyle : styles.opsStyle}>
    <Text style={[styles.text]}>{button.label}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [value, setValue] = useState('');

  const SCREEN_BUTTONS = getScreenButtons(setValue);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <Text style={styles.screenText}>
          {value}
        </Text>
      </View>
      <View style={[styles.row, styles.allButtons]}>
        <View style={[styles.row, styles.numButtons]}>
          {SCREEN_BUTTONS.splice(0, 12).map(button => renderButtons(button, true))}
        </View>
        <View style={[styles.opsStyle]}>
          {SCREEN_BUTTONS.splice(0, 5).map(button => renderButtons(button, false))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
