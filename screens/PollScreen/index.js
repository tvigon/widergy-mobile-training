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

import {Field, reduxForm, formValueSelector} from 'redux-form'; // <---- LOOK HERE

import {validate, correctName, numberOnly, submit, renderInput} from './utils';

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
    onActivateSnackBar,
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
      <TouchableOpacity
        disabled={submitting}
        onPress={handleSubmit(values => {
          submit(values, onActivateSnackBar);
        })}>
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
