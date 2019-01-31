import { ballotConstants } from '../_constants';
import nomineesData from '../../../data/nominees'

const initialState = {
  nomineesList: nomineesData,
  userSelections: {},
}

export const ballot = (state = initialState, action ) => {

  const nomineesList = JSON.parse(JSON.stringify(state.nomineesList))
  const userSelections = JSON.parse(JSON.stringify(state.userSelections))

  switch(action.type) {

    case ballotConstants.UPDATE_SELECTION_STATE:

    userSelections[action.category] = action.selection
      return {
        ...state,
        userSelections: userSelections
      };

    case ballotConstants.HIGHLIGHT_SELECTION:
      let categoryIndex = nomineesList.findIndex((category)=> { return (action.category === category["title"]) })
      nomineesList[categoryIndex].nominees.forEach((nominee)=> {nominee.selected = false})

      nomineesList.forEach((category)=> {
        category.nominees.forEach((nominee)=> {
          if (nominee.name === userSelections[category.title]) {
            nominee.selected = true
          }
        })
      })

    return {
      ...state,
      nomineesList: nomineesList
    };

    case ballotConstants.LOAD_USER_PICKS:

    return {
      ...state,
      userSelections: {...action.userSelections},
      nomineesList: nomineesList
    };


    case ballotConstants.FETCH_USERS_PICKS_START:
    return {
      ...state,
    };
    
    case ballotConstants.FETCH_USERS_PICKS_SUCCESS:
    return {
      ...state,
    };

    case ballotConstants.FETCH_USERS_PICKS_FAILURE:
    return {
      ...state,
      error: action.error
    };

    default:
      return state;
  }
};
