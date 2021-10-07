import React from 'react';

import {
  Button,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

import api from '../../config/api';

import formStyles from './styles';

export const validate = values => {
  const errors = {};

  if (!values.first_name) {
    errors.first_name = 'First name is required.';
  }

  if (!values.last_name) {
    errors.last_name = 'Last name is required.';
  }

  if (!values.app_review) {
    errors.app_review = 'Give us feedback!';
  } else if (values.app_review.length > 200) {
    errors.app_review = 'not too long :)';
  }

  if (!values.phone) {
    errors.phone = 'Phone is required';
  } else if (!/^([0-9]{10})$/i.test(values.phone)) {
    errors.phone = 'Phone number must have 10 digits';
  }
  return errors;
};

export const correctName = value => {
  if (!value) {
    return value;
  }
  return value.replace(/[\d\W]/g, '');
};

export const numberOnly = value => {
  if (!value) {
    return value;
  }
  return value.replace(/[^\d]/g, '');
};

export const submit = async (values, onActivateSnackBar) => {
  const response = await api.post('/form_responses', {
    input_value: values,
  });
  if (response.ok) {
    console.log('Thanks for the info');
    onActivateSnackBar('Your poll was sent! Thank you very much.');
  } else {
    console.log('Thanks for the info although api does not work!');
    onActivateSnackBar(
      'Your poll was sent although api does not work! Thank you very much.',
    );
  }
};

export const renderInput = ({
  input: {onChange, ...restInput},
  meta: {touched, error, warning},
}) => {
  return (
    <View>
      <TextInput
        style={[formStyles.input]}
        onChangeText={onChange}
        {...restInput}
      />
      {touched &&
        ((error && <Text>{error}</Text>) ||
          (warning && <Text>{warning}</Text>))}
    </View>
  );
};
