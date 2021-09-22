import React from 'react';

import homeStyles from '../screens/HomeScreen/styles';

import {
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';

const MyButton = ({label, press, style, longPress}) => (
  <TouchableOpacity onPress={press} onLongPress={longPress} style={style}>
    <Text style={[homeStyles.text]}>{label}</Text>
  </TouchableOpacity>
);

const CalcButtons = ({arrayButt, style}) => (
  <View
    style={
      style ? [homeStyles.row, homeStyles.numButtons] : [homeStyles.opsStyle]
    }>
    {arrayButt.map(button => (
      <MyButton
        label={button.label}
        press={button.onPress}
        style={style ? [homeStyles.buttonStyle] : [homeStyles.opsStyle]}
        longPress={button.onLongPress}
      />
    ))}
  </View>
);

export {CalcButtons, MyButton};
