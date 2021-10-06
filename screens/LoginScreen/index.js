import React, {useState} from 'react';

import {actionCreatorsAuth} from '../../redux/auth/actions';

import {Provider, connect} from 'react-redux';
import {Button, TextInput, Text, View} from 'react-native';

import loginStyles from './style';

const LoginScreen = ({dispatch, navigation}) => {
  const [userData, setUserData] = useState({
    email: 'vaigon@hotmail.com',
    password: 'estoesboca',
  });
  return (
    <View style={[loginStyles.container]}>
      <TextInput
        key={'user'}
        onChangeText={text =>
          setUserData(prevState => ({
            email: text,
            password: prevState.password,
          }))
        }
        value={userData.email}
        placeholder={'Username'}
      />
      <TextInput
        key={'pass'}
        onChangeText={text =>
          setUserData(prevState => ({
            email: prevState.email,
            password: text,
          }))
        }
        value={userData.password}
        placeholder={'Password'}
      />
      <View style={[loginStyles.row]}>
        <Button
          title="CREATE"
          onPress={() => {
            dispatch(actionCreatorsAuth.createUser(navigation, userData));
          }}
        />
        <Button
          title="LOGIN"
          onPress={() => {
            console.log(userData);
            dispatch(actionCreatorsAuth.loginUser(navigation, userData));
          }}
        />
      </View>
    </View>
  );
};

export default connect()(LoginScreen);
