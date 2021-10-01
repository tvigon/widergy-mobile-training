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
    actions.GET_EXPRESSIONS,
  ],
  override: {
    [actions.SAVE_EXPRESSION]: (state, action) => ({
      ...state,
      historyLog: [...state.historyLog, eachLogReducer(undefined, action)],
    }),
    /*
    [actions.SAVE_EXPRESSION]: (state, action) => ({
      ...state,
      saveExpressionLoading: true,
      saveExpressionError: false,
    }),
    [actions.SAVE_EXPRESSION_FAILURE]: (state, action) => ({
      ...state,
      saveExpressionLoading: false,
      saveExpressionError: true,
      saveExpression: action.payload,
    }),
    [actions.SAVE_EXPRESSION_SUCCESS]: (state, action) => ({
      ...state,
      saveExpressionLoading: false,
      saveExpressionError: false,
      saveExpression: action.payload,
      historyLog: [...state.historyLog, eachLogReducer(undefined, action)],
    }),
    */
    [actions.EDIT_EXPRESSION]: (state, action) => ({
      ...state,
      historyLog: state.historyLog.map(logState =>
        eachLogReducer(logState, action),
      ),
    }),
    /*
    [actions.EDIT_EXPRESSION]: (state, action) => ({
      ...state,
      editExpressionLoading: true,
      editExpressionError: false,
    }),
    [actions.EDIT_EXPRESSION_FAILURE]: (state, action) => ({
      ...state,
      editExpressionLoading: false,
      editExpressionError: true,
      editExpression: action.payload,
    }),
    [actions.EDIT_EXPRESSION_SUCCESS]: (state, action) => ({
      ...state,
      editExpressionLoading: false,
      editExpressionError: false,
      editExpression: action.payload,
      historyLog: state.historyLog.map(logState =>
        eachLogReducer(logState, action),
      ),
    }),
    */
    [actions.DELETE_EXPRESSION]: (state, action) => {
      let deletedIndex = state.historyLog
        .map(element => {
          return element.id;
        })
        .indexOf(action.payload.id);
      return {
        ...state,
        deleteExpressionLoading: false,
        deleteExpressionError: false,
        deleteExpression: action.payload,
        historyLog: [
          ...state.historyLog.slice(0, deletedIndex),
          ...state.historyLog.slice(deletedIndex + 1),
        ],
      };
    },
    /*
    [actions.DELETE_EXPRESSION]: (state, action) => ({
      ...state,
      deleteExpressionLoading: true,
      deleteExpressionError: false,
    }),
    [actions.DELETE_EXPRESSION_FAILURE]: (state, action) => ({
      ...state,
      deleteExpressionLoading: false,
      deleteExpressionError: true,
      deleteExpression: action.payload,
    }),
    [actions.DELETE_EXPRESSION_SUCCESS]: (state, action) => {
      let deletedIndex = state.historyLog
        .map(element => {
          return element.id;
        })
        .indexOf(action.payload.id);
      return {
        ...state,
        deleteExpressionLoading: false,
        deleteExpressionError: false,
        deleteExpression: action.payload.data,
        historyLog: [
          ...state.historyLog.slice(0, deletedIndex),
          ...state.historyLog.slice(deletedIndex + 1),
        ],
      };
    },*/
    [actions.DELETE_ALL]: (state, action) => ({...state, historyLog: []}),
    /*[actions.DELETE_ALL]: (state, action) => ({
      ...state,
      deleteAllLoading: true,
      deleteAllError: false,
    }),*/
    [actions.DELETE_ALL_FAILURE]: (state, action) => ({
      ...state,
      deleteAllLoading: false,
      deleteAllError: true,
      deleteAll: action.payload,
    }),
    [actions.DELETE_ALL_SUCCESS]: (state, action) => ({
      ...state,
      deleteAllLoading: false,
      deleteAllError: false,
      //aca asumo q me avisa que logro eliminar.
      deleteAll: action.payload,
      //hacer algo con el historyLog
      historyLog: [],
    }),
    [actions.GET_EXPRESSIONS]: (state, action) => ({
      ...state,
      expressionsLoading: true,
      expressionsError: false,
    }),
    [actions.GET_EXPRESSIONS_FAILURE]: (state, action) => ({
      ...state,
      expressionsLoading: false,
      expressionsError: true,
      expressions: action.payload,
    }),
    [actions.GET_EXPRESSIONS_SUCCESS]: (state, action) => ({
      ...state,
      expressionsLoading: false,
      expressionsError: false,
      expressions: action.payload,
      //hacer algo con el historyLog
    }),
  },
};
export default createReducer(initialState, completeReducer(reducerDescription));
