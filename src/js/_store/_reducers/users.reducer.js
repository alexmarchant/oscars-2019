import { constants } from '../_constants';

const initialState = {
  token: null,
  error: null,
  loading:false
}

export const users = (state = initialState, action ) => {

  switch(action.type) {

    case constants.AUTH_LOGOUT:

    return {
      ...state,
      token: null
    }

    default:
      return state;
  }
};
