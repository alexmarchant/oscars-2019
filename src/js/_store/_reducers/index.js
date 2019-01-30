import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
// import { alert } from './alert.reducer';
import { reducer } from './reducer';
import { leaderboard} from './leaderboard.reducer';


export const rootReducer = combineReducers({
  authentication,
  // alert,
  reducer,
  leaderboard
})
