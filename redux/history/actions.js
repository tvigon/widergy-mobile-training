import {createTypes, completeTypes} from 'redux-recompose';

const completedActions = completeTypes({
  ignoredActions: [
    'SAVE_EXPRESSION',
    'EDIT_EXPRESSION',
    'DELETE_EXPRESSION',
    'DELETE_ALL',
  ],
});

export const actions = createTypes(completedActions, '@@HISTORY');

export const actionCreators = {
  addExpression: text => {
    let max = 100000000000000000000;
    let min = 1;
    let id = Math.floor(Math.random() * (max - min + 1)) + min;
    return {
      type: actions.SAVE_EXPRESSION,
      payload: {text, id},
    };
  },
  modifyExpression: (id, text) => {
    return {
      type: actions.EDIT_EXPRESSION,
      payload: {id, text},
    };
  },
  deleteExpression: id => {
    return {
      type: actions.DELETE_EXPRESSION,
      payload: {id},
    };
  },
  deleteAllExpressions: () => {
    return {
      type: actions.DELETE_ALL,
    };
  },
};
