import axios from 'axios'
import { usersConstants } from '../_constants'

export const usersActions = {
  fetchAllUsers
}

function fetchAllUsers() {

  return dispatch => {
    dispatch(getUsersStart())
    const url = 'https://api.oscars.alexmarchant.com/users';
    axios.get(url)
    .then(
      res => {
        dispatch(getUsersSuccess(res.data));
      })
    .catch(
      err => {
        dispatch(getUsersFail(error.response.data.error));
      }
    )
  }

  function getUsersStart() { return { type: usersConstants.GET_USERS_START }}
  function getUsersSuccess(usersList) { return { type: usersConstants.GET_USERS_SUCCESS, usersList: usersList }}
  function getUsersFail(error) { return { type: usersConstants.GET_USERS_FAILURE, error: error }}
}
