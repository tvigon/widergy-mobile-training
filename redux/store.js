import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import history from './history/reducer';
import thunk from 'redux-thunk';

//import Reactotron from '../ReactotronConfig';
import Reactotron from 'reactotron-react-native';

const calcApp = combineReducers({
  history,
});

const middlewares = [];
const enhancers = [];

/* ------------- Thunk Middleware ------------- */
middlewares.push(thunk);

/* ------------- Assemble Middleware ------------- */
enhancers.push(applyMiddleware(...middlewares));

// in dev mode, we'll create the store through Reactotron
//const createAppropriateStore = __DEV__ ? Reactotron.createStore : createStore;
const createAppropriateStore = createStore;
const store = createAppropriateStore(
  calcApp,
  compose(...enhancers, Reactotron.createEnhancer()),
);

//export const storeDispatch = store.dispatch;
/*
algo q hacia antes y quiero preguntar
<Provider store={createStore(calcApp,
      Reactotron.createEnhancer(),)}>
*/

export default store;
//export default calcApp;
