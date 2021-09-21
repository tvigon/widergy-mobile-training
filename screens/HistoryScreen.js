import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';

import styles from '../styles';

const HistoryScreen = ({navigation}) => {
  const renderText = text => <Text style={[styles.historyText]}>{text}</Text>;

  return (
    <View style={[styles.container]}>
      <ScrollView style={styles.container} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default HistoryScreen;
