import axios from 'axios'
import { authConstants } from '../_constants'


export const authActions = {
  initAuth,
  logout,
  isAuthenticated,
  updatePayment
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

    let authToken

    axios.post(url, authData)
    .then(res => res.data.token)
    .then( token => {
      authToken = token
      return axios({
        method: 'get',
        url: 'http://api.oscars.alexmarchant.com/users/current-user',
        headers: {'Authorization': `Bearer ${token}`}
        })
      })
    .then( res => {
      const user = res.data
      user.token = authToken
      localStorage.setItem('user', JSON.stringify(user))
      dispatch(authSuccess(user))
    })
    .catch(
      error => {
      dispatch(authFail(error.response.data.error))
    })
  }

  function authStart() { return { type: authConstants.AUTH_START }}
  function authSuccess(user) { return { type: authConstants.AUTH_SUCCESS, user: user }}
  function authFail(error) { return { type: authConstants.AUTH_FAIL, error: error }}
}

function logout() {
  localStorage.removeItem('user')
  return {
    type: authConstants.AUTH_LOGOUT
  }
}

function isAuthenticated() {

  let user = null

  if (localStorage.user) {
    user = JSON.parse(localStorage.user)
  }
  return {
    type: authConstants.IS_AUTHENTICATED,
    user: user
  }
}

function updatePayment(checked){
  return {
    type: authConstants.UPDATE_PAYMENT,
    checked: checked
  }
}
