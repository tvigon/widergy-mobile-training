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

const LoginScreen = ({dispatch, navigation}) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Button title="LOGIN" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default connect()(LoginScreen);
