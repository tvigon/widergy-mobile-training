import React, {useState} from 'react';

import {Provider, connect} from 'react-redux';
import {
  Button,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

import {Field, reduxForm} from 'redux-form';

import loginStyles from './style';

import {validate, submit, renderInput} from './utils';

const LoginScreenForm = props => {
  const {handleSubmit, submitting, navigation, dispatch, onActivateSnackBar} = props;
  return (
    <View style={[loginStyles.container]}>
      <Text>Email: </Text>
      <Field name="email" placeholder={'Email'} component={renderInput} />
      <Text>Password: </Text>
      <Field name="password" placeholder={'Password'} component={renderInput} />
      <TouchableOpacity
        disabled={submitting}
        onPress={handleSubmit(values => {
          submit(values, dispatch, navigation, true, onActivateSnackBar);
        })}>
        <Text style={[loginStyles.button]}>Create</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={submitting}
        onPress={handleSubmit(values => {
          submit(values, dispatch, navigation, false, onActivateSnackBar);
        })}>
        <Text style={[loginStyles.button]}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    initialValues: {
      email: 'vaigon@hotmail.com',
      password: 'estoesboca',
    },
  };
};

const LoginScreen = reduxForm({
  form: 'login',
  validate,
})(LoginScreenForm);

export default connect(mapStateToProps)(LoginScreen);
