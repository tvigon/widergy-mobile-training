// showLastCommitMessageForThisLibrary.js
import {create} from 'apisauce';

// define the api
const api = create({
  baseURL: 'https://widergy-training-api.herokuapp.com',
  headers: {Accept: ['application/json', 'charset=utf-8']},
  timeout: 60000,
});

export default api;
