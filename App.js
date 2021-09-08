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
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const [value, setValue] = useState('0');
  const [aux, setAux] = useState('');

  let valueString = '';
  const numbers = [1, 2, 3, 4, 5];

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, backgroundColor: 'yellow'}}>
        <Text style={{fontSize: 48, textAlign: 'right'}}>
          {aux}
          {value}
        </Text>
      </View>
      <View style={[styles.row, {flex: 3, backgroundColor: 'green'}]}>
        <View style={{flex: 3, backgroundColor: 'violet'}}>
          <CalcButtons
            values={['7', '8', '9']}
            selectedValue={value}
            setSelectedValue={setValue}
          />
          <CalcButtons
            values={['4', '5', '6']}
            selectedValue={value}
            setSelectedValue={setValue}
          />
          <CalcButtons
            values={['1', '2', '3']}
            selectedValue={value}
            setSelectedValue={setValue}
          />
          <CalcButtons
            values={['.', '0', '=']}
            selectedValue={value}
            setSelectedValue={setValue}
            selectedAux={aux}
            setSelectedAux={setAux}
          />
        </View>
        <OpCalcButtons
          values={['x', '/', '-', '+']}
          selectedValue={value}
          setSelectedValue={setValue}
          selectedAux={aux}
          setSelectedAux={setAux}
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
}) => (
  <View style={[styles.row, {flex: 1}]}>
    {values.map(val => (
      <TouchableOpacity
        key={val}
        onPress={() => {
          if (val == '=') {
            if (selectedValue.length !== 0 && selectedAux.length !== 0) {
              let aux1 = parseFloat(selectedValue);
              let aux2 = parseFloat(selectedAux.slice(0, -1));
              setSelectedAux('');
              switch (selectedAux.slice(-1)) {
                case '/':
                  setSelectedValue(`${aux2 / aux1}`);
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
                    'Lo lamentamos, por el momento no disponemos de ' +
                      expr +
                      '.',
                  );
              }
            }
          } else if (val == '.') {
            if (!selectedValue.includes('.')) {
              setSelectedValue(selectedValue + val);
            }
          } else {
            setSelectedValue(selectedValue + val);
          }
        }}
        style={[styles.buttonStyle]}>
        <Text style={{textAlign: 'center', fontSize: 48}}>{val}</Text>
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
}) => (
  <View style={{flex: 1, backgroundColor: 'red'}}>
    <TouchableOpacity
      key="DEL"
      onLongPress={() => {
        setSelectedValue('');
        setSelectedAux('');
      }}
      onPress={() => {
        if (selectedValue.length !== 0) {
          setSelectedValue(selectedValue.slice(0, -1));
        } else {
          setSelectedValue(selectedAux.slice(0, -1));
          setSelectedAux('');
        }
      }}
      style={[styles.opsStyle]}>
      <Text style={{textAlign: 'center', fontSize: 48}}>DEL</Text>
    </TouchableOpacity>
    {values.map(val => (
      <TouchableOpacity
        key={val}
        onPress={() => {
          if (
            !selectedAux.includes('/') &&
            !selectedAux.includes('-') &&
            !selectedAux.includes('x') &&
            !selectedAux.includes('+') &&
            selectedValue.length !== 0
          ) {
            setSelectedAux(selectedValue + val);
            setSelectedValue('');
          }
        }}
        style={[styles.opsStyle]}>
        <Text style={{textAlign: 'center', fontSize: 48}}>{val}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: 'lime',
    height: '100%',
    alignContent: 'stretch',
  },
  opsStyle: {
    flex: 1,
    backgroundColor: 'mediumorchid',
  },
  text: {
    textAlign: 'center',
  },
});

export default App;
