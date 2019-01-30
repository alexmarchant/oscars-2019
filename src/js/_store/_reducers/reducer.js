import { constants } from '../_constants';
import nomineesData from '../../../data/nominees'

const initialState = {
  nomineesList: nomineesData,
  userSelections: {},
  authenticated: false
}

export const reducer = (state = initialState, action ) => {
  console.log('[reducer] action', action.type );

  const nomineesList = JSON.parse(JSON.stringify(state.nomineesList))
  const userSelections = JSON.parse(JSON.stringify(state.userSelections))

  switch(action.type) {

    case constants.UPDATE_SELECTION_STATE:

    userSelections[action.category] = action.selection
      return {
        ...state,
        userSelections: userSelections
      };

    case constants.HIGHLIGHT_SELECTION:
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

    case constants.LOAD_USER_PICKS:

    return {
      ...state,
      userSelections: {...action.userSelections},
      nomineesList: nomineesList
    };

    default:
      return state;
  }
};
