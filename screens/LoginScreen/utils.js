import React from 'react';
import {
  Button,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import {actionCreatorsAuth} from '../../redux/auth/actions';

import loginStyles from './style';

export const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required.';
  }

  if (!values.password) {
    errors.password = 'password is required.';
  }

  return errors;
};

export const submit = (
  values,
  dispatch,
  navigation,
  createBool,
  onActivateSnackBar,
) => {
  const userData = {
    email: values.email,
    password: values.password,
  };
  dispatch(
    createBool
      ? actionCreatorsAuth.createUser(navigation, onActivateSnackBar, userData)
      : actionCreatorsAuth.loginUser(navigation, onActivateSnackBar, userData),
  );
};

export const renderInput = ({
  input: {onChange, ...restInput},
  meta: {touched, error, warning},
}) => {
  return (
    <View>
      <TextInput
        style={[loginStyles.input]}
        onChangeText={onChange}
        {...restInput}
      />
      {touched &&
        ((error && <Text>{error}</Text>) ||
          (warning && <Text>{warning}</Text>))}
    </View>
  );
};
