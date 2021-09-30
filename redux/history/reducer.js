import {createReducer, completeReducer} from 'redux-recompose';

import {actions} from './actions';

const eachLogReducer = (state, action) => {
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
    default:
      return state;
  }
};

const initialState = {
  historyLog: [],
  expressions: null,
  expressionsError: false,
  expressionsLoading: false,
  saveExpression: null,
  saveExpressionError: false,
  saveExpressionLoading: false,
  editExpression: null,
  editExpressionError: false,
  editExpressionLoading: false,
  deleteExpression: null,
  deleteExpressionError: false,
  deleteExpressionLoading: false,
  deleteAll: null,
  deleteAllError: false,
  deleteAllLoading: false,
};

const reducerDescription = {
  primaryActions: [
    actions.SAVE_EXPRESSION,
    actions.EDIT_EXPRESSION,
    actions.DELETE_EXPRESSION,
    actions.DELETE_ALL,
  ],
  override: {
    [actions.SAVE_EXPRESSION]: (state, action) => ({
      ...state,
      historyLog: [...state.historyLog, eachLogReducer(undefined, action)],
    }),
    [actions.SAVE_EXPRESSION_SUCCESS]: (state, action) => ({
      ...state,
      //historyLog: [{id: 55, text: action.payload}],
    }),
    [actions.EDIT_EXPRESSION]: (state, action) => ({
      ...state,
      historyLog: state.historyLog.map(logState =>
        eachLogReducer(logState, action),
      ),
    }),
    [actions.DELETE_EXPRESSION]: (state, action) => {
      let deletedIndex = state.historyLog
        .map(element => {
          return element.id;
        })
        .indexOf(action.payload.id);
      return {
        ...state,
        historyLog: [
          ...state.historyLog.slice(0, deletedIndex),
          ...state.historyLog.slice(deletedIndex + 1),
        ],
      };
    },
    [actions.DELETE_ALL]: (state, action) => ({...state, historyLog: []}),
  },
};
export default createReducer(initialState, completeReducer(reducerDescription));
