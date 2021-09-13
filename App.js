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

function DetailsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

function HomeScreen({navigation}) {
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
        <TouchableOpacity
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
          style={[styles.screenButtons]}>
          <Text style={styles.auxText}>LOG REGISTER</Text>
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
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
