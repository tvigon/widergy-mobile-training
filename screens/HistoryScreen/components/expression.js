import React, {useState} from 'react';

import {actionCreators} from '../../../redux/history/actions';

import {ScrollView, TextInput, View} from 'react-native';

import historyStyles from '../styles';
import MyButton from '../../../components/MyButton';

export const Expression = ({dispatch, id, text}) => {
  const [textIn, setText] = useState('');
  const [editingBool, setEditingBool] = useState(false);
  return (
    <View style={[historyStyles.row]}>
      <TextInput
        key={id}
        style={[historyStyles.historyText]}
        onChangeText={textChange => {
          setEditingBool(true);
          setText(textChange);
        }}
        onSubmitEditing={() => {
          setEditingBool(false);
          dispatch(actionCreators.modifyExpression(id, textIn));
        }}
        value={editingBool ? textIn : text}
      />
      <MyButton
        label={'x'}
        press={() => dispatch(actionCreators.deleteExpression(id))}
        style={[historyStyles.delButton]}
      />
    </View>
  );
};
