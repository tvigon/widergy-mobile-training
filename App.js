/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import styles from './styles';
import {numButton, getOpNumButt, getOpButtons, getNumButt} from './utils';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Button, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

const App = () => {
  const [value, setValue] = useState('');
  const numArray = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
  const OP_BUTTONS = getOpButtons(setValue);
  const NUM_BUTT = getNumButt(numArray, setValue, numButton);
  const OP_NUM_BUTT = getOpNumButt(setValue);

  const renderButtons = (label, press, style, longPress) => (
    <TouchableOpacity onPress={press} onLongPress={longPress} style={style}>
      <Text style={[styles.text]}>{label}</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <Text style={styles.screenText}>
          {value}
        </Text>
      </View>
      <View style={[styles.row, styles.allButtons]}>
        <View style={[styles.row, styles.numButtons]}>
          {NUM_BUTT.map(button => renderButtons(button.label, button.onPress, styles.buttonStyle))}
          {OP_NUM_BUTT.map(button => renderButtons(button.label, button.onPress, styles.buttonStyle, button.onLongPress))}
        </View>
        <View style={[styles.opsStyle]}>
          {OP_BUTTONS.map(button => renderButtons(button.label, button.onPress, styles.opsStyle))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
