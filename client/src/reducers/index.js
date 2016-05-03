import { combineReducers } from 'redux';

import appReducer from './app_reducer';

const rootReducer = combineReducers({
  appState: appReducer
});

export default rootReducer;
