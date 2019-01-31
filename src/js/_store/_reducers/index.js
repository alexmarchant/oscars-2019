import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
// import { alert } from './alert.reducer';
import { ballot } from './ballot.reducer';
import { users } from './users.reducer';


export const rootReducer = combineReducers({
  authentication,
  // alert,
  ballot,
  users
})
