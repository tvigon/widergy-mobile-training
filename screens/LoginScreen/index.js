import React, {useState} from 'react';

import {actionCreatorsAuth} from '../../redux/auth/actions';

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

const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Username is required.';
  }

  if (!values.password) {
    errors.password = 'password is required.';
  }

  return errors;
};

const submit = (values, dispatch, navigation, createBool) => {
  const userData = {
    email: values.username,
    password: values.password,
  };
  dispatch(
    createBool
      ? actionCreatorsAuth.createUser(navigation, userData)
      : actionCreatorsAuth.loginUser(navigation, userData),
  );
};

const renderInput = ({
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

const LoginScreenForm = props => {
  const {handleSubmit, pristine, reset, submitting, navigation, dispatch} =
    props;

  /*
  const [userData, setUserData] = useState({
    email: 'vaigon@hotmail.com',
    password: 'estoesboca',
  });*/

  return (
    <View style={[loginStyles.container]}>
      <Text>Username: </Text>
      <Field name="username" placeholder={'Username'} component={renderInput} />
      <Text>Password: </Text>
      <Field name="password" placeholder={'Password'} component={renderInput} />
      <View style={[loginStyles.row]}>
        <TouchableOpacity
          disabled={submitting}
          onPress={handleSubmit(values =>
            submit(values, dispatch, navigation, true),
          )}>
          <Text style={[loginStyles.button]}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={submitting}
          onPress={handleSubmit(values =>
            submit(values, dispatch, navigation, false),
          )}>
          <Text style={[loginStyles.button]}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    initialValues: {
      username: 'vaigon@hotmail.com',
      password: 'estoesboca',
    },
  };
};

const LoginScreen = reduxForm({
  form: 'login',
  validate,
})(LoginScreenForm);

export default connect(mapStateToProps)(LoginScreen);
