import {createReducer, completeReducer} from 'redux-recompose';

import {actions} from './actions';

const initialState = {
  userData: {},
  user: null,
  serverResponse: null,
  createUserError: false,
  createUserLoading: false,
  loginUser: null,
  loginUserError: false,
  loginUserLoading: false,
  logoutUser: null,
  logoutUserError: false,
  logoutUserLoading: false,
};

const reducerDescription = {
  primaryActions: [
    actions.CREATE_USER,
    actions.LOGIN_USER,
    actions.LOGOUT_USER,
  ],
  override: {
    [actions.CREATE_USER]: (state, action) => ({
      ...state,
      createUserLoading: true,
      createUserError: false,
      user: action.payload,
    }),
    [actions.CREATE_USER_FAILURE]: (state, action) => ({
      ...state,
      createUserLoading: false,
      createUserError: true,
      serverResponse: action.payload.error,
    }),
    [actions.CREATE_USER_SUCCESS]: (state, action) => ({
      ...state,
      createUserLoading: false,
      createUserError: false,
      serverResponse: action.payload.token,
    }),
    [actions.LOGIN_USER]: (state, action) => ({
      ...state,
      loginUserLoading: true,
      loginUserError: false,
      user: action.payload,
    }),
    [actions.LOGIN_USER_FAILURE]: (state, action) => ({
      ...state,
      loginUserLoading: false,
      loginUserError: true,
      serverResponse: action.payload.error,
    }),
    [actions.LOGIN_USER_SUCCESS]: (state, action) => ({
      ...state,
      loginUserLoading: false,
      loginUserError: false,
      serverResponse: action.payload.token,
    }),
    [actions.LOGOUT_USER]: (state, action) => ({
      ...state,
      logoutUserLoading: true,
      logoutUserError: false,
    }),
    [actions.LOGOUT_USER_FAILURE]: (state, action) => ({
      ...state,
      logoutUserLoading: false,
      logoutUserError: true,
      serverResponse: action.payload,
    }),
    [actions.LOGOUT_USER_SUCCESS]: (state, action) => {
      return {
        ...state,
        logoutUserLoading: false,
        logoutUserError: false,
        serverResponse: action.payload,
      };
    },
  },
};
export default createReducer(initialState, completeReducer(reducerDescription));
