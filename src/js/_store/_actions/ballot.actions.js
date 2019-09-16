import axios from 'axios'
import { ballotConstants } from '../_constants'
import { authHeader } from '../../_helpers/authHeader';


export const ballotActions = {
  makeSelection,
  highlightSelection,
  saveSelection,
  updateSelectionState,
  fetchUserPicks
}

function makeSelection (category, selection, userSelections){
  return dispatch => {
    dispatch(saveSelection(category, selection, userSelections))
    dispatch(updateSelectionState(category, selection))
    dispatch(highlightSelection(category))
  }
}

const highlightSelection = (category) => {
  return {
    type: ballotConstants.HIGHLIGHT_SELECTION,
    category: category
  }
}

const saveSelection = (category, selection, userSelections) => {
  userSelections[category] = selection

  let url = 'https://api.oscars.alexmarchant.com/users/current-user/picks'
  let token = localStorage.token

  return dispatch => {
    dispatch(saveSelectionStart())
    axios(url, {
      method: "post",
      headers: authHeader(),
      data: JSON.stringify(userSelections)
    })
      .then(()=> {
        dispatch(saveSelectionSuccess())
      })
      .catch((error)=> {saveSelectionFail(error.response.data.error)})
  }

  function saveSelectionStart() { return { type: ballotConstants.SAVE_SELECTION_START }}
  function saveSelectionSuccess() { return { type: ballotConstants.SAVE_SELECTION_SUCCESS }}
  function saveSelectionFail(error) { return { type: ballotConstants.SAVE_SELECTION_FAILURE, error: error }}
}

const updateSelectionState = (category, selection) => {
  return {
    type: ballotConstants.UPDATE_SELECTION_STATE,
    category: category,
    selection: selection
  }
}

function loadUserPicks(nomineesList, userSelections) {

  nomineesList.forEach((category)=> {
    category.nominees.forEach((nominee)=> {
      if (nominee.name === userSelections[category.title]) {
        nominee.selected = true
      }
    })
  })

  return {
    type: ballotConstants.LOAD_USER_PICKS,
    nomineesList: nomineesList,
    userSelections: userSelections
  }
}

function fetchUserPicks () {
  console.log('fetch the picks');
  return (dispatch, getState) => {
    dispatch(fetchUserPicksStart())

    let fetchUrl = 'https://api.oscars.alexmarchant.com/users/current-user/picks';

    axios(fetchUrl, {
      method: 'get',
      headers: authHeader()
    })
      .then(
        res => {
          dispatch(loadUserPicks(getState().ballot.nomineesList, res.data))
          dispatch(fetchUserPicksSuccess())
        })
      .catch(
        err => {
        dispatch(fetchUserPicksFail(err.response.data.error))
      })
  }

  function fetchUserPicksStart() { return { type: ballotConstants.FETCH_USERS_PICKS_START }}
  function fetchUserPicksSuccess() { return { type: ballotConstants.FETCH_USERS_PICKS_SUCCESS }}
  function fetchUserPicksFail(error) { return { type: ballotConstants.FETCH_USERS_PICKS_FAILURE, error: error }}
}
