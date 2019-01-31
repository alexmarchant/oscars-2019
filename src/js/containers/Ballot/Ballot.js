import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Category from '../../components/Category/Category';
import nomineesData from '../../../data/nominees';
import { connect } from 'react-redux';
import { usersActions, ballotActions } from '../../_store/_actions';



class Ballot extends Component {

  componentDidMount(){
    if (this.props.token) {
      console.log('[BALLOT IS MOUNTING AND PICKS ARE BEING FETCHED]');

      this._onFetchUserPicks()
    } else {
      console.log('[BALLOT IS MOUNTING BUT USER IS NOT AUTHENTICATED]');
    }
  }

  componentDidUpdate(prevProps){
    if (prevProps.token !== this.props.token) {
      console.log('[BALLOT JUST UPDATED AND THERE IS A NEW TOKEN]');

      this._onFetchUserPicks()
    } else {
      console.log('[BALLOT JUST UPDATED BUT THE TOKEN DIDN\'T CHANGE]');
    }
  }

  _onMakeSelection = (category, selection) => {
    this.props.onMakeSelection(category, selection, this.props.userSelections)
  }

  _onFetchUserPicks = () => {
    this.props.onFetchUserPicks()
  }

  renderCategories = () => {

    if (this.props.nomineesList) {
      return this.props.nomineesList.map((nom, index) => (
        <Category
          key={index}
          title={nom.title}
          nominees={nom.nominees}
          clicked={this._onMakeSelection}
        />
      ))
    }
  }

  render() {
    return (
      <div className={"ballot"}>
          {this.renderCategories()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    nomineesList: state.ballot.nomineesList,
    userSelections: state.ballot.userSelections,
    token: state.authentication.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMakeSelection: (category, selection, userSelections)=> dispatch(ballotActions.makeSelection(category, selection, userSelections)),
    onFetchUserPicks: ()=> dispatch(ballotActions.fetchUserPicks()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ballot)
