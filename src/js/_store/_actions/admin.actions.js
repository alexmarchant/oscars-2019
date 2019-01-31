import axios from 'axios'
import { adminConstants } from '../_constants'
import { authHeader } from '../../_helpers/authHeader';

function updateWinners(winners) {
  return {
    type: adminConstants.LOAD_WINNERS,
    winners: winners
  }
}

function selectWinner (category, selection, userSelections){
  return dispatch => {
    dispatch(saveWinner(category, selection, userSelections))
    // dispatch(updateWinnersState(category, selection))
    // dispatch(highlightwinner(category))
  }
}

function saveWinner (category, winner, winners) {
  return dispatch => {
    const data = { ...winners}
    data[category] = winner
    console.log(data);

    const url = 'http://api.oscars.alexmarchant.com/winners'
    axios(url, {
      method: 'POST',
      headers: authHeader(),
      data: JSON.stringify(data)
    })
    .then((res)=> console.log(res))
    .catch((err)=> console.log(err))
  }
}

export const adminActions = {
  selectWinner,
  updateWinners
}
