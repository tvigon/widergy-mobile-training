import {createReducer, completeReducer} from 'redux-recompose';

import {actions} from './actions';

const expression = (state, action) => {
  console.log('entrooooo???' + action);
  switch (action.type) {
    case '@@HISTORY/SAVE_EXPRESSION':
      return {
        id: action.id,
        text: action.text,
      };
    case '@@HISTORY/EDIT_EXPRESSION':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        text: action.text,
      };
    default:
      return state;
  }
};

const initialState = {historyLog: [], tomi: 'hola'};

const historyLog = (state = [], action) => {
  switch (action.type) {
    case 'SAVE_EXPRESSION':
      return [...state, expression(undefined, action)];
    case 'EDIT_EXPRESSION':
      return state.map(t => expression(t, action));
    case 'DELETE_EXPRESSION':
      return [...state.slice(0, action.id), ...state.slice(action.id + 1)];
    case 'DELETE_ALL':
      return [];
    default:
      return state;
  }
};

const reducerDescription = {
  primaryActions: [actions.FIRST_PRIMARY_ACTION],
  override: {
    [actions.SAVE_EXPRESSION]: (state, action) => ({
      ...state,
      historyLog: [...state.historyLog, expression(undefined, action)],
    }),
    [actions.EDIT_EXPRESSION]: (state, action) => ({
      ...state,
      historyLog: state.historyLog.map(t => expression(t, action)),
    }),
    [actions.DELETE_EXPRESSION]: (state, action) => ({
      ...state,
      historyLog: [
        ...state.historyLog.slice(0, action.id),
        ...state.historyLog.slice(action.id + 1),
      ],
    }),
    [actions.DELETE_ALL]: (state, action) => ({...state, historyLog: []}),
  },
};
export default createReducer(initialState, completeReducer(reducerDescription));

/*
{
  return Object.assign({}, state.history, {
    historyLog: [
      ...state.history.historyLog,
      expression(undefined, action),
    ],
  });
}
*/
