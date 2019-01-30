import { constants } from '../_constants';
import nomineesData from '../../../data/nominees'

const initialState = {
  token: null,
  error: null,
  loading:false
}

export const authentication = (state = initialState, action ) => {

  switch(action.type) {

    case constants.AUTH_START:

    return {
      ...state,
      error: null,
      loading: true
    };

    case constants.AUTH_SUCCESS:
    console.log(action);

    return {
      ...state,
      token: action.token,
      error: null,
      loading: false
    };

    case constants.AUTH_FAIL:
    console.log('[reducer] AUTH_FAIL');

    return {
      ...state,
      error: action.error,
      loading: false
    };

    case constants.IS_AUTHENTICATED:

    return {
      ...state,
      token: action.token
    };

    case constants.AUTH_LOGOUT:

    return {
      ...state,
      token: null
    };

    default:
      return state;
  }
};

// export authentication;
