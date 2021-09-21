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
 
 import {Button, SafeAreaView, Text, TouchableOpacity, ScrollView, View} from 'react-native';
 
 function HomeScreen({navigation}) {
   const [value, setValue] = useState('');
   const [logArray, setLogArray] = useState([]);
   const numArray = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
   const OP_BUTTONS = getOpButtons(setValue, setLogArray, logArray);
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
           {NUM_BUTT.map(button => renderButtons(button.label, button.onPress, styles.buttonStyle))}
           {OP_NUM_BUTT.map(button => renderButtons(button.label, button.onPress, styles.buttonStyle, button.onLongPress))}
         </View>
         <View style={[styles.opsStyle]}>
           {OP_BUTTONS.map(button => renderButtons(button.label, button.onPress, styles.opsStyle))}
         </View>
       </View>
     </SafeAreaView>
   );
 }
 
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
 