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
import {HistoryList} from './components/historyList';

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
