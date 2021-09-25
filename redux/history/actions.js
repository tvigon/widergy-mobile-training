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

const addExpression = (text, historyArr) => {
  let nextId = historyArr.length() - 1;
  return {
    type: 'SAVE_EXPRESSION',
    id: nextId,
    text,
  };
};

export const actions = createTypes(completedActions, '@@HISTORY');
