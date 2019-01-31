import { adminConstants } from '../_constants';

const initialState = {
  winners: {}
}

export const admin = (state = initialState, action ) => {
  switch(action.type) {
    case adminConstants.LOAD_WINNERS:
    console.log('[REDUCER: LOAD_WINNERS]');
    console.log(state);
    console.log(action.winners);
      return {
        ...state,
        winners: action.winners
      };
    default:
      return state
  }
};
