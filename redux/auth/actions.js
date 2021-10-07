import {createTypes, completeTypes} from 'redux-recompose';

import api from '../../config/api';

const completedActions = completeTypes({
  primaryActions: ['CREATE_USER', 'LOGIN_USER', 'LOGOUT_USER'],
});

export const actions = createTypes(completedActions, '@@AUTH');

const privateActionCreators = {
  createUserSuccess(data) {
    return {
      type: actions.CREATE_USER_SUCCESS,
      payload: data,
    };
  },
  createUserFailure(error) {
    return {
      type: actions.CREATE_USER_FAILURE,
      payload: error,
    };
  },
  loginUserSuccess(data) {
    return {
      type: actions.LOGIN_USER_SUCCESS,
      payload: data,
    };
  },
  loginUserFailure(error) {
    return {
      type: actions.LOGIN_USER_FAILURE,
      payload: error,
    };
  },
  logoutUserSuccess(data) {
    return {
      type: actions.LOGOUT_USER_SUCCESS,
      payload: data,
    };
  },
  logoutUserFailure(error) {
    return {
      type: actions.LOGOUT_USER_FAILURE,
      payload: error,
    };
  },
};

export const actionCreatorsAuth = {
  createUser: (navigation, onActivateSnackBar, userData) => async dispatch => {
    dispatch({type: actions.CREATE_USER, payload: userData});
    const response = await api.post('/auth/create', userData);
    if (response.ok) {
      dispatch(privateActionCreators.createUserSuccess(response.data.token));
      api.setHeader('Authorization', response.data.token);
      navigation.navigate('Home');
    } else {
      dispatch(privateActionCreators.createUserFailure(response.data));
      onActivateSnackBar('There was an error creating the account');
    }
  },
  loginUser: (navigation, onActivateSnackBar, userData) => async dispatch => {
    dispatch({type: actions.LOGIN_USER, payload: userData});
    const response = await api.post('/auth/login', userData);
    if (response.ok) {
      dispatch(privateActionCreators.loginUserSuccess(response.data.token));
      api.setHeader('Authorization', response.data.token);
      navigation.navigate('Home');
    } else {
      dispatch(privateActionCreators.loginUserFailure(response.data));
      onActivateSnackBar('Could not log in, do you have an account?');
    }
  },
  logoutUser: (navigation, onActivateSnackBar) => async dispatch => {
    dispatch({type: actions.LOGIN_USER});
    const response = await api.get('/auth/logout');
    if (response.ok) {
      dispatch(privateActionCreators.logoutUserSuccess(response.data.message));
      navigation.navigate('Login');
    } else {
      dispatch(privateActionCreators.logoutUserFailure(response.data.error));
      onActivateSnackBar('There was an error trying to logout');
    }
  },
};
