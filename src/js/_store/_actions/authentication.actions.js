import axios from 'axios'
import { authConstants } from '../_constants'


export const authActions = {
  initAuth,
  logout,
  isAuthenticated
}

function initAuth(authData) {
  return dispatch => {
    dispatch(authStart())

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

  function authStart() { return { type: authConstants.AUTH_START }}
  function authSuccess(authData) { return { type: authConstants.AUTH_SUCCESS, token: authData.token }}
  function authFail(error) { return { type: authConstants.AUTH_FAIL, error: error }}
}

function logout() {
  return {
    type: authConstants.AUTH_LOGOUT
  }
}

function isAuthenticated() {

  let token = null

  if (localStorage.token) {
    token = localStorage.token
  }
  return {
    type: authConstants.IS_AUTHENTICATED,
    token: token
  }
}
