import { combineReducers } from 'redux';

import { uiReducer } from './uiReducers';
import { calendarReducer } from './calendarReducer';


export const rootReducer = combineReducers({
  ui: uiReducer,
  calendar: calendarReducer,
  //TODO missing reducers
})
