import {createStore, combineReducers} from 'redux';
import history from './history/reducer';
import Reactotron from 'reactotron-react-native';
const calcApp = combineReducers({
  history,
});

const store = createStore(calcApp, Reactotron.createEnhancer());

export default store;
