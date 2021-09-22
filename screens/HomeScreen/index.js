import React, {useState} from 'react';
import {
  numButton,
  getPointDelButt,
  getOpButtons,
  getNumButt,
} from '../../utils';

import homeStyles from './styles';
import {CalcButtons, MyButton} from '../../components/CalcButtons';

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
  const NUMARRAY = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
  const OPARRAY = ['+', '-', 'x', '/'];
  const OPERATION_BUTTONS = getOpButtons(OPARRAY, setValue, setLogArray, logArray);
  const NUMBER_BUTTONS = getNumButt(NUMARRAY, setValue, numButton);
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
        <CalcButtons
          arrayButt={[...NUMBER_BUTTONS, ...POINT_DEL_BUTT]}
          style={true}
        />
        <CalcButtons arrayButt={OPERATION_BUTTONS} style={false} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
