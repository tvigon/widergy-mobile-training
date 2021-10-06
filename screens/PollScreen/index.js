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

import {actionCreatorsForm} from '../../redux/form/actions';
import formStyles from './styles';

import api from '../../config/api';

import {Field, reduxForm, formValueSelector} from 'redux-form'; // <---- LOOK HERE

const validate = values => {
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

const correctName = value => {
  if (!value) {
    return value;
  }
  return value.replace(/[\d\W]/g, '');
};

const numberOnly = value => {
  if (!value) {
    return value;
  }
  return value.replace(/[^\d]/g, '');
};

const submit = async values => {
  const response = await api.post('/form_responses', {
    input_value: values,
  });
  if (response.ok) {
    console.log('Thanks for the info');
  } else {
    console.log('Thanks for the info although api does not work!');
  }
};

const renderInput = ({
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

const PollScreenForm = props => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    navigation,
    hasFirstName,
    hasLastName,
    dispatch,
  } = props;

  let completeName = {first_name: '', last_name: ''};

  return (
    <View style={[formStyles.container]}>
      <Text>Name:</Text>
      <Field
        name="first_name"
        component={renderInput}
        normalize={correctName}
      />
      <Text>Surname:</Text>
      <Field name="last_name" component={renderInput} normalize={correctName} />
      <Text>Thoughts on application:</Text>
      <Field name="app_review" component={renderInput} />
      <Text>Phone number:</Text>
      <Field name="phone" component={renderInput} normalize={numberOnly} />
      <TouchableOpacity disabled={submitting} onPress={handleSubmit(submit)}>
        <Text style={[formStyles.button]}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={pristine || submitting}
        onPress={() => {
          completeName.first_name =
            hasFirstName === undefined ? '' : hasFirstName;
          completeName.last_name = hasLastName === undefined ? '' : hasLastName;
          dispatch(actionCreatorsForm.saveUserData(completeName));
          reset();
          navigation.navigate('Home');
        }}>
        <Text style={[formStyles.button]}>Clear & Leave</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => {
  const hasFirstName = selector(state, 'first_name');
  const hasLastName = selector(state, 'last_name');
  return {
    initialValues: {
      first_name: state.formReduc.firstName,
      last_name: state.formReduc.lastName,
    },
    hasFirstName,
    hasLastName,
  };
};

const PollScreen = reduxForm({
  form: 'poll',
  validate,
})(PollScreenForm);

const selector = formValueSelector('poll'); // <-- same as form name
export default connect(mapStateToProps)(PollScreen);
