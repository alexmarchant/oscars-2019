import { usersConstants } from '../_constants';

const initialState = {
  usersList: []
}

export const users = (state = initialState, action ) => {

  switch(action.type) {

    case usersConstants.GET_USERS_START:
    return {
      ...state,
      loading: true
    };

    case usersConstants.GET_USERS_SUCCESS:
    return {
      ...state,
      usersList: action.usersList
    };

    case usersConstants.GET_USERS_FAILURE:
    return {
      ...state,
      error: action.error
    };


    default:
      return state;
  }
};
