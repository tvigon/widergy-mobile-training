import React, {useState} from 'react';

import {actions, actionCreators} from '../../redux/history/actions';

import {Provider, connect} from 'react-redux';
import {
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  View,
} from 'react-native';

import historyStyles from './styles';
import MyButton from '../../components/MyButton';

const DelButton = ({onClick}) => (
  <MyButton
    label={'x'}
    press={onClick}
    style={{flex: 1, backgroundColor: 'yellow'}}
  />
);

const History = ({history, onHistoryClick, delClick}) => (
  <ScrollView style={historyStyles.container}>
    {history.map(item => (
      <View style={{flexDirection: 'row'}}>
        <TextInput
          key={item.id}
          style={[historyStyles.historyText]}
          onChangeText={text => onHistoryClick(item.id, text)}
          value={item.text}
        />
        <DelButton onClick={() => delClick(item.id)} />
      </View>
    ))}
  </ScrollView>
);

const mapStateToProps = state => {
  console.log(state.history.historyLog);
  return {
    history: state.history.historyLog,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onHistoryClick: (id, text) => {
      dispatch(actionCreators.modifyExpression(id, text));
    },
    delClick: id => {
      dispatch(actionCreators.deleteExpression(id));
    },
  };
};

const HistoryList = connect(mapStateToProps, mapDispatchToProps)(History);

const HistoryScreen = ({dispatch}) => {
  return (
    <View style={[historyStyles.container]}>
      <HistoryList />
      <Button
        title="Delete all"
        onPress={() => dispatch(actionCreators.deleteAllExpressions())}
      />
    </View>
  );
};

export default connect()(HistoryScreen);
