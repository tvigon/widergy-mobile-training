import React, {useState} from 'react';

import {actionCreators} from '../../redux/history/actions';

import {connect} from 'react-redux';
import {Button, View} from 'react-native';

import historyStyles from './styles';
import {HistoryList} from './components/historyList';

const HistoryScreen = ({dispatch, historyLog}) => {
  const getIdArr = log => {
    return log.map(element => element.id);
  };

  return (
    <View style={[historyStyles.container]}>
      <HistoryList dispatch={dispatch} historyLog={historyLog} />
      <Button
        title="Delete all"
        onPress={() =>
          dispatch(actionCreators.deleteAllExpressions(getIdArr(historyLog)))
        }
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    historyLog: state.history.historyLog,
  };
};

export default connect(mapStateToProps)(HistoryScreen);
