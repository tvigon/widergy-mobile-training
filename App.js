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

import {Button, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';

function HistoryScreen({route, navigation}) {
  const {logValue} = route.params;
  return (
    <View style={{flex: 1}}> 
      <ScrollView style={styles.container}>
        {logValue.map(text => renderText(text))}
      </ScrollView>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const renderText = text => (
  <Text style={{alignSelf: 'center', fontSize: 30}}>{text}</Text>
);

function HomeScreen({navigation}) {
  const [value, setValue] = useState('0');
  const [aux, setAux] = useState('');
  const [error, setError] = useState('');
  const [logArray, setLogArray] = useState(['']);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <Text style={styles.screenText}>
          {error}
          {aux}
          {value}
        </Text>
        <TouchableOpacity
          title="Go to History"
          onPress={() =>
            navigation.navigate('History', {
              logValue: logArray,
            })
          }
          style={[styles.screenButtons]}>
          <Text style={styles.auxText}>HISTORY</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.row, styles.allButtons]}>
        <View style={[styles.row, styles.numButtons]}>
          <CalcButtons
            values={['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', '=']}
            selectedValue={value}
            setSelectedValue={setValue}
            selectedAux={aux}
            setSelectedAux={setAux}
            setError={setError}
            selectedLogArr={logArray}
            setLogArr={setLogArray}
          />
        </View>
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
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
