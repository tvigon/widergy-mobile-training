import {createTypes, completeTypes} from 'redux-recompose';

const completedActions = completeTypes({
  primaryActions: ['FIRST_PRIMARY_ACTION'],
  ignoredActions: [
    'SAVE_EXPRESSION',
    'EDIT_EXPRESSION',
    'DELETE_EXPRESSION',
    'DELETE_ALL',
  ],
});

export const actions = createTypes(completedActions, '@@HISTORY');

export const actionCreators = {
  addExpression: (text, historyArr) => {
    let id = historyArr.length;
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
