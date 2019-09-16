import axios from 'axios'
import { authConstants } from '../_constants'
import { authHeader } from '../../_helpers/authHeader';



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
      url = 'https://oscars-2019-api.herokuapp.com/users'
    } else {
      url = 'https://oscars-2019-api.herokuapp.com/tokens'
    }

    let authToken

    axios.post(url, authData)
    .then(res => res.data.token)
    .then( token => {
      authToken = token
      return axios({
        method: 'get',
        url: 'https://oscars-2019-api.herokuapp.com/users/current-user',
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

  return dispatch => {
    let user = null
    let token

    if (localStorage.user) {
      user = JSON.parse(localStorage.user)
      token = user.token
      axios({
        method: 'get',
        url: 'https://oscars-2019-api.herokuapp.com/users/current-user',
        headers: {'Authorization': `Bearer ${token}`}
        })
        .then((res)=> dispatch(isAuthenticatedTrue(res.data)))
        .catch(err => dispatch(isAuthenticatedFalse(err.response.data.error)))
    } else {
      dispatch(isAuthenticatedFalse('error'))
    }
  }


  function isAuthenticatedTrue(user) { return { type: authConstants.IS_AUTHENTICATED, user: user}}
  function isAuthenticatedFalse(error) { return { type: authConstants.IS_NOT_AUTHENTICATED, error: error}}
}

function updatePayment(paid){
  console.log('[auth actions update payment checked]', paid);

  let data = { paid: paid }

  return dispatch => {
    dispatch(updatePaymentStart())
    const url = 'https://oscars-2019-api.herokuapp.com/users/current-user'
    axios(url, {
      method: 'PATCH',
      headers: authHeader(),
      data: data
    })
    .then( res => dispatch(updatePaymentSuccess(paid)))
    .catch( err => dispatch(updatePaymentFail(err.response.data.error)))
  }

  function updatePaymentStart() { return { type: authConstants.UPDATE_PAYMENT_START }}
  function updatePaymentSuccess(paid) { return { type: authConstants.UPDATE_PAYMENT_SUCCESS, paid: paid }}
  function updatePaymentFail(error) { return { type: authConstants.UPDATE_PAYMENT_FAIL, error: error} }

}
