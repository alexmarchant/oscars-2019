import axios from 'axios'
import { constants } from '../_constants'

export const leaderboardActions = {
  fetchAllUsers
}

function fetchAllUsers() {

  return dispatch => {

    const url = 'http://api.oscars.alexmarchant.com/users'

    axios.get(url)
    .then(
      res=> {
        dispatch(getUsersSuccess(res.data));
      })
    .catch(
      err => {
        dispatch(getUsersFail(error.response.data.error));
      }
    )
  }

  function getUsersStart() { return { type: constants.GET_USERS_START }}
  function getUsersSuccess(usersList) { return { type: constants.GET_USERS_SUCCESS, usersList: usersList }}
  function getUsersFail(error) { return { type: constants.GET_USERS_FAILURE, error: error }}
}
