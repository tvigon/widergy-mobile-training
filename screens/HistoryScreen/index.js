import React, {useState} from 'react';

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

const HistoryText = ({onClick, text}) => (
  <Text onClick={onClick} style={[historyStyles.historyText]}>
    {text}
  </Text>
);

const DelButton = ({onClick}) => (
  <Button title={'x'} onPress={onClick} style={{backgroundColor: 'orange'}}>
    X
  </Button>
);

const History = ({history, onHistoryClick, delClick}) => (
  <ScrollView style={historyStyles.container}>
    {history.map(item => (
      <View>
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
  return {
    history: state.historyLog,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onHistoryClick: (id, text) => {
      dispatch({
        type: 'EDIT_EXPRESSION',
        id,
        text: text,
      });
    },
    delClick: id => {
      console.log('id ' + id);
      dispatch({
        type: 'DELETE_EXPRESSION',
        id,
      });
    },
  };
};

const HistoryList = connect(mapStateToProps, mapDispatchToProps)(History);

const HistoryScreen = ({dispatch}) => {

  const renderText = text => (
    <Text style={[historyStyles.historyText]}>{text}</Text>
  );

  return (
    <View style={[historyStyles.container]}>
      <HistoryList />
      <Button
        title="Delete all"
        onPress={() =>
          dispatch({
            type: 'DELETE_ALL',
          })
        }
      />
    </View>
  );
};

export default connect()(HistoryScreen);
