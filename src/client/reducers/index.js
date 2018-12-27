import { combineReducers } from 'redux';
import { logins } from './loginReducer';
import { registration } from './registrationReducer';
import {alert} from './alert.reducer'

const rootReducer = combineReducers({
  logins,
  registration,
  alert
  
});

export default rootReducer;