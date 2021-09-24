import React, {useState} from 'react';
import {Provider, connect} from 'react-redux';

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

let nextExpressionId = 0;
const addExpression = text => {
  return {
    type: 'SAVE_EXPRESSION',
    id: nextExpressionId++,
    text,
  };
};

const HomeScreen = ({navigation, dispatch}) => {
  const [value, setValue] = useState('');
  const [logExpression, setLogExpression] = useState();
  const OPERATION_BUTTONS = getOpButtons(OP_ARRAY, setValue, setLogExpression);
  const NUMBER_BUTTONS = getNumButt(NUM_ARRAY, setValue, numButton);
  const POINT_DEL_BUTT = getPointDelButt(setValue);

  return (
    <SafeAreaView style={homeStyles.container}>
      <View style={homeStyles.screen}>
        <Text style={homeStyles.screenText}>{value}</Text>
        <Button
          title="SAVE HISTORY"
          onPress={() => {
            dispatch(addExpression(logExpression));
          }}
          style={[homeStyles.screenButtons]}
        />
        <Button
          title="HISTORY"
          onPress={() => navigation.navigate('History')}
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

export default connect()(HomeScreen);
