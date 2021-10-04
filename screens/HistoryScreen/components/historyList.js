import React, {useState} from 'react';

import {actionCreators} from '../../../redux/history/actions';

import {ScrollView, TextInput, View} from 'react-native';

import historyStyles from '../styles';
import {Expression} from './expression';

export const HistoryList = ({dispatch, historyLog}) => {
  return (
    <ScrollView style={historyStyles.container}>
      {historyLog.map(item => (
        <Expression dispatch={dispatch} id={item.id} text={item.text} />
      ))}
    </ScrollView>
  );
};
