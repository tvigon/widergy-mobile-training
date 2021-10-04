import React, {useState} from 'react';

import {actionCreators} from '../../../redux/history/actions';

import {ScrollView, TextInput, View} from 'react-native';

import historyStyles from '../styles';
import MyButton from '../../../components/MyButton';

export const HistoryList = ({dispatch, historyLog}) => {
  const [textIn, setText] = useState('');

  return (
    <ScrollView style={historyStyles.container}>
      {historyLog.map(item => (
        <View style={[historyStyles.row]}>
          <TextInput
            key={item.id}
            style={[historyStyles.historyText]}
            onChangeText={text => (item.text = text)}
            onSubmitEditing={event =>
              dispatch(actionCreators.modifyExpression(item.id, textIn))
            }
            value={item.text}
          />
          <MyButton
            label={'x'}
            press={() => dispatch(actionCreators.deleteExpression(item.id))}
            style={[historyStyles.delButton]}
          />
        </View>
      ))}
    </ScrollView>
  );
};
