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

const HistoryScreen = ({route, navigation}) => {
  const {logValue} = route.params;

  const renderText = text => (
    <Text style={{alignSelf: 'center', fontSize: 30}}>{text}</Text>
  );

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {logValue.map(text => renderText(text))}
      </ScrollView>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default HistoryScreen;
