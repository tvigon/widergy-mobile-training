/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Number,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

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

const CalcButtons = ({
  values,
  selectedValue,
  setSelectedValue,
  selectedAux,
  setSelectedAux,
  setError,
}) => (
  <View style={[styles.row, styles.numButtons]}>
    {values.map(val => (
      <TouchableOpacity
        key={val}
        onPress={() => {
          setError('');
          if (val === '=') {
            if (selectedValue.length !== 0 && selectedAux.length !== 0) {
              let aux1 = parseFloat(selectedValue);
              let aux2 = parseFloat(selectedAux.slice(0, -1));
              setSelectedAux('');
              switch (selectedAux.slice(-1)) {
                case '/':
                  if (
                    aux2 / aux1 === Infinity ||
                    aux2 / aux1 === -Infinity ||
                    isNaN(aux2 / aux1)
                  ) {
                    setError('mathError');
                    setSelectedAux('');
                    setSelectedValue('');
                  } else {
                    setSelectedValue(`${aux2 / aux1}`);
                  }
                  break;
                case 'x':
                  setSelectedValue(`${aux2 * aux1}`);
                  break;
                case '-':
                  setSelectedValue(`${aux2 - aux1}`);
                  break;
                case '+':
                  setSelectedValue(`${aux2 + aux1}`);
                  break;
                default:
                  console.log(
                    'Lo lamentamos, por el momento no disponemos de eso.',
                  );
              }
            }
          } else if (val === '.') {
            if (
              !selectedValue.includes('.') &&
              selectedValue.length !== 0 &&
              selectedValue[selectedValue.length - 1] !== '-'
            ) {
              setSelectedValue(selectedValue + val);
            }
          } else {
            setSelectedValue(selectedValue + val);
          }
        }}
        style={[styles.buttonStyle]}>
        <Text style={[styles.text]}>{val}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const Holas = () => {
  console.log('aver q onda esto');
};

const OpCalcButtons = ({
  values,
  selectedValue,
  setSelectedValue,
  selectedAux,
  setSelectedAux,
  setError,
}) => (
  <View style={[styles.opsStyle]}>
    <TouchableOpacity
      key="DEL"
      onLongPress={() => {
        setSelectedValue('');
        setSelectedAux('');
        setError('');
      }}
      onPress={() => {
        setError('');
        if (selectedValue.length !== 0) {
          setSelectedValue(selectedValue.slice(0, -1));
        } else {
          setSelectedValue(selectedAux.slice(0, -1));
          setSelectedAux('');
        }
      }}
      style={[styles.opsStyle]}>
      <Text style={[styles.text]}>DEL</Text>
    </TouchableOpacity>
    {values.map(val => (
      <TouchableOpacity
        key={val}
        onPress={() => {
          setError('');
          if (val === '-' && selectedValue.length === 0) {
            setSelectedValue(val);
          }
          if (
            !selectedAux.includes('/') &&
            !selectedAux.includes('-') &&
            !selectedAux.includes('x') &&
            !selectedAux.includes('+') &&
            selectedValue.length !== 0
          ) {
            if (selectedValue.length !== 1 || selectedValue[0] !== '-') {
              setSelectedAux(selectedValue + val);
              setSelectedValue('');
            }
          }
        }}
        style={[styles.opsStyle]}>
        <Text style={[styles.text]}>{val}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  screen: {
    flex: 1,
    backgroundColor: 'lightsteelblue',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  allButtons: {
    flex: 3,
    backgroundColor: 'green',
  },
  numButtons: {
    flex: 3,
    backgroundColor: 'navy',
  },
  buttonStyle: {
    //estos numeros son re magicos dentro de calc butons
    width: '33.3%',
    height: '25%',
    backgroundColor: 'orange',
  },
  opsStyle: {
    flex: 1,
    backgroundColor: 'yellowgreen',
  },
  text: {
    fontSize: 48,
    textAlign: 'center',
  },
  screenText: {
    fontSize: 48,
    textAlign: 'right',
  },
});

export default App;
