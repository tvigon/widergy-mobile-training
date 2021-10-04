import React, {useState} from 'react';

import {actions, actionCreatorsAuth} from '../../redux/auth/actions';

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

const LoginScreen = ({dispatch, navigation, authh}) => {
  const [username, setUserName] = useState('vaigon1@hotmail.com');
  const [password, setPassword] = useState('widergy');
  let userData = {email: '', password: ''};
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Button title="home" onPress={() => navigation.navigate('Home')} />
      <TextInput
        key={'user'}
        style={{}}
        onChangeText={text => setUserName(text)}
        value={username}
      />
      <TextInput
        key={'pass'}
        style={{}}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <View style={{flexDirection: 'row'}}>
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

const mapStateToProps = state => {
  return {
    authh: state.auth,
  };
};

export default connect(mapStateToProps)(LoginScreen);
