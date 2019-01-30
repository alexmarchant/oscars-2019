import axios from 'axios'
import { constants } from '../_constants'

export const actions = {
  makeSelection,
  highlightSelection,
  saveSelection,
  updateSelectionState,
  loadUserPicks,
  fetchUserPicks,
}

export const makeSelection = (category, selection, userSelections) => {
  return dispatch => {
    dispatch(saveSelection(category, selection, userSelections))
    dispatch(updateSelectionState(category, selection))
    dispatch(highlightSelection(category))
  }
}

export const highlightSelection = (category) => {

  return {
    type: constants.HIGHLIGHT_SELECTION,
    category: category
  }
}

const saveSelection = (category, selection, userSelections) => {
  userSelections[category] = selection

  let fetchUrl = 'http://api.oscars.alexmarchant.com/users/current-user/picks'
  let token = localStorage.token

  return dispatch => {
    fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userSelections)
    })
      .then(()=> console.log('success'))
      .catch((data)=> console.error(data))
  }
}

export const updateSelectionState = (category, selection) => {
  return {
    type: constants.UPDATE_SELECTION_STATE,
    category: category,
    selection: selection
  }
}

export const loadUserPicks = (nomineesList, userSelections) => {

  nomineesList.forEach((category)=> {
    category.nominees.forEach((nominee)=> {
      if (nominee.name === userSelections[category.title]) {
        nominee.selected = true
      }
    })
  })

  return {
    type: constants.LOAD_USER_PICKS,
    nomineesList: nomineesList,
    userSelections: userSelections
  }
}

export const fetchUserPicks = () => {

  console.log('fetch user picks');

  return (dispatch, getState) => {

    let fetchUrl = 'http://api.oscars.alexmarchant.com/users/current-user/picks';
    let token = localStorage.token;

    axios(fetchUrl, {
      method: 'get',
      headers: {'Authorization': `Bearer ${token}`,
      }
    })
      .then((res)=> dispatch(loadUserPicks(getState().reducer.nomineesList, res.data)))
      .catch((err)=> {console.log(err.response.data.error)})
    console.log('success');
  }
}
