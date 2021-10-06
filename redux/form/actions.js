import {createTypes, completeTypes} from 'redux-recompose';

import api from '../../config/api';

const completedActions = completeTypes({
  ignoredActions: ['SAVE_USER_DATA'],
});

export const actions = createTypes(completedActions, '@@FORM');

export const actionCreatorsForm = {
  saveUserData: value => {
    return {
      type: actions.SAVE_USER_DATA,
      payload: value,
    };
  },
};
