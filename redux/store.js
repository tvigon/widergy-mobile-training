import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import history from './history/reducer';

const calcApp = combineReducers({
  history,
});

export default calcApp;
