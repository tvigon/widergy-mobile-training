import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';

import historyStyles from './styles';

const HistoryScreen = ({navigation}) => {
  const renderText = text => (
    <Text style={[historyStyles.historyText]}>{text}</Text>
  );

  return (
    <View style={[historyStyles.container]}>
      <ScrollView style={historyStyles.container} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default HistoryScreen;
