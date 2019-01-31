import axios from 'axios'
import { adminConstants } from '../_constants'
import { authHeader } from '../../_helpers/authHeader';

function loadWinners(winners) {
  return {
    type: adminConstants.LOAD_WINNERS,
    winners: winners
  }
}

function selectWinner (category, selection, userSelections){
  return dispatch => {
    dispatch(saveWinner(category, selection, userSelections))
  }
}

function saveWinner (category, winner, winners) {
  return dispatch => {
    dispatch(saveWinnerStart())
    const data = { ...winners}
    data[category] = winner
    console.log(data);

    const url = 'http://api.oscars.alexmarchant.com/winners'
    axios(url, {
      method: 'POST',
      headers: authHeader(),
      data: JSON.stringify(data)
    })
    .then((res)=> saveWinnerSuccess())
    .catch((err)=> saveWinnerFail(err.response.data.error))
  }

  function saveWinnerStart() { return { type: adminConstants.SAVE_WINNER_START }}
  function saveWinnerSuccess() { return { type: adminConstants.SAVE_WINNER_SUCCESS }}
  function saveWinnerFail() { return { type: adminConstants.SAVE_WINNER_FAILURE }}
}

export const adminActions = {
  selectWinner,
  loadWinners
}
