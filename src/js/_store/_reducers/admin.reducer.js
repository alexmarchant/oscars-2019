import { adminConstants } from '../_constants';

const initialState = {
  winners: {}
}

export const admin = (state = initialState, action ) => {
  switch(action.type) {
    case adminConstants.LOAD_WINNERS:
      return {
        ...state,
        winners: action.winners
      };

    case adminConstants.SAVE_WINNER_START:
    return {
      ...state,
    };
    case adminConstants.SAVE_WINNER_SUCCESS:
    return {
      ...state,
    };
    case adminConstants.SAVE_WINNER_FAILURE:
    return {
      ...state,
      error: action.error
    };
    default:
      return state
  }
};
