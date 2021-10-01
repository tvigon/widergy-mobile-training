import { NOTHING } from 'immer/dist/internal';
import {createTypes, completeTypes} from 'redux-recompose';
import {MIN_ID, ID_RANGE} from '../../constants/constants';

import api from '../../config/api';

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
  saveExpressionSuccess(data, text, id) {
    return {
      type: actions.SAVE_EXPRESSION_SUCCESS,
      payload: {data: data, id: id, text: text},
    };
  },
  saveExpressionFailure(error) {
    return {
      type: actions.SAVE_EXPRESSION_FAILURE,
      payload: error,
    };
  },
  editExpressionSuccess(data, id, text) {
    return {
      type: actions.EDIT_EXPRESSION_SUCCESS,
      payload: {data: data, id: id, text: text},
    };
  },
  editExpressionFailure(error) {
    return {
      type: actions.EDIT_EXPRESSION_FAILURE,
      payload: error,
    };
  },
  deleteExpressionSuccess(data, id) {
    return {
      type: actions.DELETE_EXPRESSION_SUCCESS,
      payload: {data: data, id: id},
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
  saveExpression: text => async dispatch => {
    if (text === '') {
      return {
        type: 'NOTHING',
      };
    }
    const id = Math.floor(Math.random() * ID_RANGE) + MIN_ID;
    dispatch({type: actions.SAVE_EXPRESSION});
    //revisar la linea de abajo
    console.log('text ' + text + typeof text);
    let expressionToSave = {expressions: []};
    expressionToSave.expressions.push(text);
    console.log(expressionToSave);
    const response = await api.post('/calc/expressions', expressionToSave);
    if (response.ok) {
      dispatch(
        privateActionCreators.saveExpressionSuccess(
          response.data.message,
          text,
          id,
        ),
      );
    } else {
      dispatch(privateActionCreators.saveExpressionFailure(response.data));
    }
  },
  /*
  saveExpression: text => {
    let max = 100000000000000000000;
    let min = 1;
    let id = Math.floor(Math.random() * (max - min + 1)) + min;
    return {
      type: actions.SAVE_EXPRESSION,
      payload: {text, id},
    };
  },
  */
  /*
  modifyExpression: (id, text) => async dispatch => {
    dispatch({type: actions.EDIT_EXPRESSION});
    //revisar linea
    const response = await api.get('/calc/expressions');
    if (response.ok) {
      dispatch(
        privateActionCreators.editExpressionSuccess(response.data, id, text),
      );
    } else {
      dispatch(
        privateActionCreators.editExpressionFailure(response.data.error),
      );
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
    dispatch({type: actions.DELETE_EXPRESSION});
    const response = await api.get('/calc/expressions');
    if (response.ok) {
      dispatch(
        privateActionCreators.deleteExpressionSuccess(response.data, id),
      );
    } else {
      dispatch(
        privateActionCreators.deleteExpressionFailure(response.data.error),
      );
    }
  },*/
  deleteExpression: id => {
    return {
      type: actions.DELETE_EXPRESSION,
      payload: {id},
    };
  },
  /*
  deleteAllExpressions: () => async dispatch => {
    dispatch({type: actions.DELETE_ALL});
    const response = await api.get('/calc/expressions');
    if (response.ok) {
      dispatch(privateActionCreators.deleteAllSuccess(response.data));
    } else {
      dispatch(privateActionCreators.deleteAllFailure(response.data.error));
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
    const response = await api.get('/calc/expressions');
    if (response.ok) {
      dispatch(privateActionCreators.getExpressionsSuccess(response.data.data));
    } else {
      dispatch(
        privateActionCreators.getExpressionsFailure(response.data.error),
      );
    }
  },
};
