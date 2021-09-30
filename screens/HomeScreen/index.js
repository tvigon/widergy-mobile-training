import React, {useState} from 'react';
import {connect} from 'react-redux';

import {
  numButton,
  getPointDelButt,
  getOpButtons,
  getNumButt,
} from '../../utils';

import {actionCreators} from '../../redux/history/actions';

import homeStyles from './styles';
import MyButton from '../../components/MyButton';

import {OP_ARRAY, NUM_ARRAY} from './constants';
import {Button, SafeAreaView, Text, View} from 'react-native';

const HomeScreen = ({navigation, dispatch, historyArr}) => {
  const [value, setValue] = useState('');
  const [logExpression, setLogExpression] = useState();
  const [booleanSolve, setBooleanSolve] = useState(false);
  const OPERATION_BUTTONS = getOpButtons(
    OP_ARRAY,
    setValue,
    setBooleanSolve,
    setLogExpression,
  );
  const NUMBER_BUTTONS = getNumButt(
    NUM_ARRAY,
    setValue,
    setBooleanSolve,
    numButton,
  );
  const POINT_DEL_BUTT = getPointDelButt(setValue, setBooleanSolve);

  return (
    <SafeAreaView style={homeStyles.container}>
      <View style={homeStyles.screen}>
        <Text style={homeStyles.screenText}>{value}</Text>
        <View style={[homeStyles.historyButt]}>
          <Button
            title="SAVE HISTORY"
            onPress={() => {
              dispatch(
                actionCreators.addExpression(
                  booleanSolve ? logExpression : value,
                ),
              );
            }}
            style={[homeStyles.screenButtons]}
          />
          <Button
            title="HISTORY"
            onPress={() => navigation.navigate('History')}
            style={[homeStyles.screenButtons]}
          />
        </View>
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

const mapStateToProps = state => {
  return {
    historyArr: state.history.historyLog,
  };
};

export default connect(mapStateToProps)(HomeScreen);
