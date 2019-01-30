import { alertConstants } from '../_constants';

const initialState = {

}

export const alert = (state = initialState, action ) => {
  switch(action.type) {
    case alertConstants.SUCCESS:
      return {
        type: action.type,
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: action.type,
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
};
