import React from 'react';

import {actionCreators} from '../../../redux/history/actions';

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

import historyStyles from '../styles';
import MyButton from '../../../components/MyButton';

const History = ({history, onHistoryClick, delClick}) => (
  <ScrollView style={historyStyles.container}>
    {history.map(item => (
      <View style={[historyStyles.row]}>
        <TextInput
          key={item.id}
          style={[historyStyles.historyText]}
          onChangeText={text => onHistoryClick(item.id, text)}
          value={item.text}
        />
        <MyButton
          label={'x'}
          press={() => delClick(item.id)}
          style={[historyStyles.delButton]}
        />
      </View>
    ))}
  </ScrollView>
);

const mapStateToProps = state => {
  return {
    history: state.history.historyLog,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onHistoryClick: (id, text) => {
      dispatch(actionCreators.editExpression(id, text));
    },
    delClick: id => {
      dispatch(actionCreators.deleteExpression(id));
    },
  };
};

export const HistoryList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(History);
