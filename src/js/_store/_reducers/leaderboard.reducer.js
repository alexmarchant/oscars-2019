import { constants } from '../_constants';

const initialState = {
  usersList: []
}

export const leaderboard = (state = initialState, action ) => {

  switch(action.type) {

    case constants.GET_USERS_START:
    return {
      ...state,
      loading: true
    };

    case constants.GET_USERS_SUCCESS:
    return {
      ...state,
      usersList: action.usersList
    };

    case constants.GET_USERS_FAILURE:
    return {
      ...state,
      error: action.error
    };

    default:
      return state;
  }
};
