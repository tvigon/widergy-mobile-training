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

import {SafeAreaView, Text, View} from 'react-native';

const App = () => {
  const [value, setValue] = useState('0');
  const [aux, setAux] = useState('');
  const [error, setError] = useState('');

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
        <CalcButtons
          values={['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', '=']}
          selectedValue={value}
          setSelectedValue={setValue}
          selectedAux={aux}
          setSelectedAux={setAux}
          setError={setError}
        />
        <OpCalcButtons
          values={['x', '/', '-', '+']}
          selectedValue={value}
          setSelectedValue={setValue}
          selectedAux={aux}
          setSelectedAux={setAux}
          setError={setError}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
