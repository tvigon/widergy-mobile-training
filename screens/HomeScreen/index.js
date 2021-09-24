import React, {useState} from 'react';
import {
  numButton,
  getPointDelButt,
  getOpButtons,
  getNumButt,
} from '../../utils';

import homeStyles from './styles';
import MyButton from '../../components/MyButton';

import {OP_ARRAY, NUM_ARRAY} from './constants';
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
  const OPERATION_BUTTONS = getOpButtons(OP_ARRAY, setValue, setLogArray, logArray);
  const NUMBER_BUTTONS = getNumButt(NUM_ARRAY, setValue, numButton);
  const POINT_DEL_BUTT = getPointDelButt(setValue);

  return (
    <SafeAreaView style={homeStyles.container}>
      <View style={homeStyles.screen}>
        <Text style={homeStyles.screenText}>{value}</Text>
        <MyButton
          label={'HISTORY'}
          press={() =>
            navigation.navigate('History', {
              logValue: logArray,
            })
          }
          style={[homeStyles.screenButtons]}
        />
      </View>
      <View style={[homeStyles.row, homeStyles.allButtons]}>
        <View style={[homeStyles.row, homeStyles.numButtons]}>
          {[...NUMBER_BUTTONS, ...POINT_DEL_BUTT].map(button => (
            <MyButton
              label={button.label}
              press={button.onPress}
              style={[homeStyles.buttonStyle]}
              longPress={button.onLongPress}
            />
          ))}
        </View>
        <View style={[homeStyles.opsStyle]}>
          {OPERATION_BUTTONS.map(button => (
            <MyButton
              label={button.label}
              press={button.onPress}
              style={[homeStyles.opsStyle]}
              longPress={button.onLongPress}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
