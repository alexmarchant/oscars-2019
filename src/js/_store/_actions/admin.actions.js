import axios from 'axios'
import { constants } from '../_constants'

export const adminActions = {
  selectWinner
}

function selectWinner (category, selection, userSelections){
  return dispatch => {
    dispatch(saveWinner(category, selection, userSelections))
    dispatch(updateWinnersState(category, selection))
    dispatch(highlightwinner(category))
  }
}

const saveWinner = (category, selection, winners) => {
  winners[category] = selection

  let url = 'http://api.oscars.alexmarchant.com/winners'
  let token = localStorage.token

  return dispatch => {
    axios(url, {
      method: "post",
      headers: {'Authorization': `Bearer ${token}`},
      data: JSON.stringify(userSelections)
    })
    .then(()=> console.log('success'))
    .catch((data)=> console.error(data))
  }
}

const highlightwinner = (category) => {

  return {
    type: constants.HIGHLIGHT_WINNER,
    category: category
  }
}

const updateWinnersState = (category, selection) => {
  return {
    type: constants.UPDATE_WINNER_STATE,
    category: category,
    selection: selection
  }
}
