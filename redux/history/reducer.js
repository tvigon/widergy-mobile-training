import {createReducer, completeReducer} from 'redux-recompose';

import {actions} from './actions';

const expression = (state, action) => {
  switch (action.type) {
    case '@@HISTORY/SAVE_EXPRESSION':
      return {
        id: action.payload.id,
        text: action.payload.text,
      };
    case '@@HISTORY/EDIT_EXPRESSION':
      if (state.id !== action.payload.id) {
        return state;
      }
      return {
        ...state,
        text: action.payload.text,
      };
    case '@@HISTORY/DELETE_EXPRESSION':
      return {
        ...state,
        id: state.id - 1,
      };
    default:
      return state;
  }
};

const initialState = {historyLog: []};

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
        ...state.historyLog.slice(0, action.payload.id),
        ...state.historyLog
          .slice(action.payload.id + 1)
          .map(t => expression(t, action)),
      ],
    }),
    [actions.DELETE_ALL]: (state, action) => ({...state, historyLog: []}),
  },
};
export default createReducer(initialState, completeReducer(reducerDescription));
