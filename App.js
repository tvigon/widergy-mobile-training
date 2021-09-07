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
  const [value, setValue] = useState(0);
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

const buttonPressed = ({values, selectedValue, setSelectedValue}) => {
  {
    setSelectedValue(selectedValue + values);
  }
};

const CalcButtons = ({values, selectedValue, setSelectedValue}) => (
  <View style={[styles.row, {flex: 1}]}>
    {values.map(val => (
      <TouchableOpacity
        key={val}
        onPress={() => {
          if (val == '=') {
            alert('se apreto =');
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
        if (selectedValue.length != 0) {
          setSelectedValue(selectedValue.slice(0, -1));
        } else {
          setSelectedAux(selectedAux.slice(0,-1));
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
            !selectedValue.includes('/') &&
            !selectedValue.includes('-') &&
            !selectedValue.includes('x') &&
            !selectedValue.includes('+')
          ) {
            setSelectedAux(selectedValue);
            setSelectedValue(val);
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
