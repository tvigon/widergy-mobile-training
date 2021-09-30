import { NOTHING } from 'immer/dist/internal';
import {createTypes, completeTypes} from 'redux-recompose';
import {MIN_ID, ID_RANGE} from '../../constants/constants';

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
    if (text === '') {
      return {
        type: 'NOTHING',
      };
    }
    const id = Math.floor(Math.random() * ID_RANGE) + MIN_ID;
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
