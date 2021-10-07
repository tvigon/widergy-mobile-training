import React, {useState} from 'react';

import {actionCreatorsAuth} from '../../redux/auth/actions';

import {Provider, connect} from 'react-redux';
import {Button, TextInput, Text, View} from 'react-native';

import loginStyles from './style';

const LoginScreen = ({dispatch, navigation}) => {
  const [username, setUserName] = useState('vaigon@hotmail.com');
  const [password, setPassword] = useState('estoesboca');
  let userData = {email: '', password: ''};
  return (
    <View style={[loginStyles.container]}>
      <TextInput
        key={'user'}
        onChangeText={text => setUserName(text)}
        value={username}
        placeholder={'Username'}
      />
      <TextInput
        key={'pass'}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder={'Password'}
      />
      <View style={[loginStyles.row]}>
        <Button
          title="CREATE"
          onPress={() => {
            userData.email = username;
            userData.password = password;
            dispatch(actionCreatorsAuth.createUser(navigation, userData));
          }}
        />
        <Button
          title="LOGIN"
          onPress={() => {
            userData.email = username;
            userData.password = password;
            dispatch(actionCreatorsAuth.loginUser(navigation, userData));
          }}
        />
      </View>
    </View>
  );
};

export default connect()(LoginScreen);
