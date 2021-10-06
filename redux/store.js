import {createStore, applyMiddleware, compose, combineReducers} from 'redux';

import {reducer as formReducer} from 'redux-form';
import history from './history/reducer';
import auth from './auth/reducer';
import thunk from 'redux-thunk';
import formReduc from './form/reducer';
//import Reactotron from '../ReactotronConfig';
import Reactotron from 'reactotron-react-native';

const calcApp = combineReducers({
  history,
  auth,
  form: formReducer,
  formReduc,
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
