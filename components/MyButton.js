import React from 'react';

import homeStyles from '../screens/HomeScreen/styles';

import {Text, TouchableOpacity} from 'react-native';

const MyButton = ({label, press, style, longPress}) => (
  <TouchableOpacity onPress={press} onLongPress={longPress} style={style}>
    <Text style={[homeStyles.text]}>{label}</Text>
  </TouchableOpacity>
);

export default MyButton;
