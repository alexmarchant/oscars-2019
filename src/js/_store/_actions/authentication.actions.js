import { constants } from '../_constants'
import axios from 'axios'


export const authActions = {
  auth,
  logout,
  isAuthenticated
}


function auth(authData) {
  return dispatch => {
    dispatch(authStart(authData))

    let url = ''

    if (authData.isSignUp) {
      url = 'http://api.oscars.alexmarchant.com/users'
    } else {
      url = 'http://api.oscars.alexmarchant.com/tokens'
    }

    axios.post(url, authData)
    .then(
      res => {
        localStorage.setItem('token', res.data.token)
        dispatch(authSuccess(res.data))
      })
    .catch(
      error => {
      dispatch(authFail(error.response.data.error))
    })
  }

  function authStart() { return { type: constants.AUTH_START }}
  function authSuccess(authData) { return { type: constants.AUTH_SUCCESS, token: authData.token }}
  function authFail(error) { return { type: constants.AUTH_FAIL, error: error }}
}

function logout() {
  return {
    type: constants.AUTH_LOGOUT
  }
}

function isAuthenticated() {
  let token = null

  if (localStorage.token) {
    token = localStorage.token
  }
  return {
    type: constants.IS_AUTHENTICATED,
    token: token
  }
}
