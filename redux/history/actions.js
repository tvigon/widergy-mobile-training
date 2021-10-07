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
  saveExpression: (text, onActivateSnackBar) => async dispatch => {
    if (text === '') {
      return {
        type: 'NOTHING',
      };
    }
    const id = (Math.floor(Math.random() * ID_RANGE) + MIN_ID).toString();
    dispatch({type: actions.SAVE_EXPRESSION});
    const response = await api.post('/calc/expressions', {
      expressions: [`${text}`],
    });
    if (response.ok) {
      dispatch(
        privateActionCreators.saveExpressionSuccess(
          response.data.message,
          text,
          id,
        ),
      );
      dispatch(actionCreators.getExpressions());
      onActivateSnackBar('The expression was saved successfully!');
    } else {
      dispatch(privateActionCreators.saveExpressionFailure(response.data));
      onActivateSnackBar('There was an error trying to save the expression!');
    }
  },
  modifyExpression: (id, text, onActivateSnackBar) => async dispatch => {
    dispatch({type: actions.EDIT_EXPRESSION});
    const response = await api.put(`/calc/expressions/${id}`, {
      expression: text,
    });
    if (response.ok) {
      dispatch(
        privateActionCreators.editExpressionSuccess(response.data, id, text),
      );
    } else {
      dispatch(
        privateActionCreators.editExpressionFailure(response.data.error),
      );
      onActivateSnackBar('There was an error editing the expression');
    }
  },
  deleteExpression: (id, onActivateSnackBar) => async dispatch => {
    dispatch({type: actions.DELETE_EXPRESSION});
    const response = await api.delete(
      '/calc/expressions',
      {},
      {data: {expressions: [id]}},
    );
    if (response.ok) {
      dispatch(
        privateActionCreators.deleteExpressionSuccess(response.data, id),
      );
      onActivateSnackBar('Expression deleted successfully!');
    } else {
      dispatch(
        privateActionCreators.deleteExpressionFailure(response.data.error),
      );
      onActivateSnackBar('There was an error deleting the expression');
    }
  },
  deleteAllExpressions: (idArr, onActivateSnackBar) => async dispatch => {
    dispatch({type: actions.DELETE_ALL});
    const response = await api.delete(
      '/calc/expressions',
      {},
      {data: {expressions: [...idArr]}},
    );
    if (response.ok) {
      dispatch(privateActionCreators.deleteAllSuccess(response.data));
      onActivateSnackBar('All expressions deleted successfully!');
    } else {
      dispatch(privateActionCreators.deleteAllFailure(response.data.error));
      onActivateSnackBar('There was an error deleting all expressions');
    }
  },
  getExpressions: () => async dispatch => {
    dispatch({type: actions.GET_EXPRESSIONS});
    const response = await api.get(`/calc/expressions`);
    if (response.ok) {
      dispatch(privateActionCreators.getExpressionsSuccess(response.data.data));
    } else {
      dispatch(
        privateActionCreators.getExpressionsFailure(response.data.error),
      );
    }
  },
};
