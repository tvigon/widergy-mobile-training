import {createReducer, completeReducer} from 'redux-recompose';
import {actions} from './actions';

const initialState = {firstName: null, lastName: null};

const reducerDescription = {
  override: {
    [actions.SAVE_USER_DATA]: (state, action) => ({
      ...state,
      firstName: action.payload.first_name,
      lastName: action.payload.last_name,
    }),
  },
};
export default createReducer(initialState, completeReducer(reducerDescription));
