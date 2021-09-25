import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import history from './history/reducer';

const reducers = combineReducers({
  history,
});

export default reducers;
