import {createTypes, completeTypes} from 'redux-recompose';

// showLastCommitMessageForThisLibrary.js
import {create} from 'apisauce';

// define the api
const api = create({
  //baseURL: 'https://widergy-training-api.herokuapp.com',
  baseURL:
    'https://private-anon-4d276a4a86-widergytrainingfrontend.apiary-mock.com',
  headers: {Accept: ['application/json', 'charset=utf-8']},
  timeout: 60000,
});

const completedActions = completeTypes({
  primaryActions: [
    'SAVE_EXPRESSION',
    'EDIT_EXPRESSION',
    'DELETE_EXPRESSION',
    'DELETE_ALL',
    'GET_EXPRESSIONS',
  ],
});

export const actions = createTypes(completedActions, '@@HISTORY');

const privateActionCreators = {
  getExpressionsSuccess(data) {
    return {
      type: actions.GET_EXPRESSIONS_SUCCESS,
      payload: data,
    };
  },
  getExpressionsFailure(error) {
    return {
      type: actions.GET_EXPRESSIONS_FAILURE,
      payload: error,
    };
  },
  saveExpressionSuccess(data) {
    return {
      type: actions.SAVE_EXPRESSION_SUCCESS,
      payload: data,
    };
  },
  saveExpressionFailure(error) {
    return {
      type: actions.SAVE_EXPRESSION_FAILURE,
      payload: error,
    };
  },
  editExpressionSuccess(data) {
    return {
      type: actions.EDIT_EXPRESSION_SUCCESS,
      payload: data,
    };
  },
  editExpressionFailure(error) {
    return {
      type: actions.EDIT_EXPRESSION_FAILURE,
      payload: error,
    };
  },
  deleteExpressionSuccess(data) {
    return {
      type: actions.DELETE_EXPRESSION_SUCCESS,
      payload: data,
    };
  },
  deleteExpressionFailure(error) {
    return {
      type: actions.DELETE_EXPRESSION_FAILURE,
      payload: error,
    };
  },
  deleteAllSuccess(data) {
    return {
      type: actions.DELETE_ALL_SUCCESS,
      payload: data,
    };
  },
  deleteAllFailure(error) {
    return {
      type: actions.DELETE_ALL_FAILURE,
      payload: error,
    };
  },
};

export const actionCreators = {
  /*saveExpression: text => async dispatch => {
    let max = 100000000000000000000;
    let min = 1;
    let id = Math.floor(Math.random() * (max - min + 1)) + min;
    dispatch({type: actions.SAVE_EXPRESSION, payload: {text, id}});
    const response = await api.get('/questions');
    if (response.error) {
      dispatch(
        privateActionCreators.saveExpressionFailure(response.data.error),
      );
    } else {
      dispatch(
        privateActionCreators.saveExpressionSuccess(
          response.data[0].choices[1].choice,
        ),
      );
    }
  },
  */
  saveExpression: text => {
    let max = 100000000000000000000;
    let min = 1;
    let id = Math.floor(Math.random() * (max - min + 1)) + min;
    return {
      type: actions.SAVE_EXPRESSION,
      payload: {text, id},
    };
  },
  /*
  modifyExpression: (id, text) => async dispatch => {
    dispatch({type: actions.EDIT_EXPRESSION, payload: {id, text}});
    const response = await api.get('/calc/expressions');
    if (response.error) {
      dispatch(
        privateActionCreators.editExpressionFailure(response.data.error),
      );
    } else {
      dispatch(privateActionCreators.editExpressionSuccess(response.data.data));
    }
  },
  */
  editExpression: (id, text) => {
    return {
      type: actions.EDIT_EXPRESSION,
      payload: {id, text},
    };
  },
  /*
  deleteExpression: id => async dispatch => {
    dispatch({type: actions.EDIT_EXPRESSION, payload: {id}});
    const response = await api.get('/calc/expressions');
    if (response.error) {
      dispatch(
        privateActionCreators.deleteExpressionFailure(response.data.error),
      );
    } else {
      dispatch(
        privateActionCreators.deleteExpressionSuccess(response.data.data),
      );
    }
  },
  */
  deleteExpression: id => {
    return {
      type: actions.DELETE_EXPRESSION,
      payload: {id},
    };
  },
  /*
  deleteAllExpressions: () => async dispatch => {
    dispatch({type: actions.EDIT_EXPRESSION});
    const response = await api.get('/calc/expressions');
    if (response.error) {
      dispatch(privateActionCreators.deleteAllFailure(response.data.error));
    } else {
      dispatch(privateActionCreators.deleteAllSuccess(response.data.data));
    }
  },
  */
  deleteAllExpressions: () => {
    return {
      type: actions.DELETE_ALL,
    };
  },
  getExpressions: () => async dispatch => {
    dispatch({type: actions.GET_EXPRESSIONS});
    const response = await api.get('/questions');
    if (response.error) {
      dispatch(
        privateActionCreators.getExpressionsFailure(response.data.error),
      );
    } else {
      dispatch(
        privateActionCreators.getExpressionsSuccess(
          response.data[0].choices[1].choice,
        ),
      );
    }
  },
};
