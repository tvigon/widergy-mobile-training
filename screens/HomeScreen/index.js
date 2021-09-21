import React, {useState} from 'react';
import {
  numButton,
  getPointDelButt,
  getOpButtons,
  getNumButt,
} from '../../utils';

import homeStyles from './styles';

import {
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';

const HomeScreen = ({navigation}) => {
  const [value, setValue] = useState('');
  const [logArray, setLogArray] = useState([]);
  const numArray = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
  const opArray = ['+', '-', 'x', '/'];
  const OPERATION_BUTTONS = getOpButtons(setValue, setLogArray, logArray);
  const NUMBER_BUTTONS = getNumButt(numArray, setValue, numButton);
  const POINT_DEL_BUTT = getPointDelButt(setValue);

  const renderButtons = (label, press, style, longPress) => (
    <TouchableOpacity onPress={press} onLongPress={longPress} style={style}>
      <Text style={[homeStyles.text]}>{label}</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={homeStyles.container}>
      <View style={homeStyles.screen}>
        <Text style={homeStyles.screenText}>{value}</Text>
        <TouchableOpacity
          title="Go to History"
          onPress={() =>
            navigation.navigate('History', {
              logValue: logArray,
            })
          }
          style={[homeStyles.screenButtons]}>
          <Text style={homeStyles.auxText}>HISTORY</Text>
        </TouchableOpacity>
      </View>
      <View style={[homeStyles.row, homeStyles.allButtons]}>
        <View style={[homeStyles.row, homeStyles.numButtons]}>
          {NUMBER_BUTTONS.map(button =>
            renderButtons(button.label, button.onPress, homeStyles.buttonStyle),
          )}
          {POINT_DEL_BUTT.map(button =>
            renderButtons(
              button.label,
              button.onPress,
              homeStyles.buttonStyle,
              button.onLongPress,
            ),
          )}
        </View>
        <View style={[homeStyles.opsStyle]}>
          {OPERATION_BUTTONS.map(button =>
            renderButtons(button.label, button.onPress, homeStyles.opsStyle),
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
