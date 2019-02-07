import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Category from '../../components/Category/Category';
import BallotFooter from '../../components/BallotFooter/BallotFooter'
import nomineesData from '../../../data/nominees';
import { connect } from 'react-redux';
import { usersActions, ballotActions } from '../../_store/_actions';

import styles from './Ballot.css'

class Ballot extends Component {

  componentDidMount(){
    if (this.props.user) {
      console.log('[BALLOT IS MOUNTING AND PICKS ARE BEING FETCHED]');
      this._onFetchUserPicks()
    } else {
      console.log('[BALLOT IS MOUNTING BUT USER IS NOT AUTHENTICATED]');
    }
  }

  componentDidUpdate(prevProps){
    if (prevProps.user !== this.props.user) {
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
          winners={this.props.winners}
          clicked={this._onMakeSelection}
        />
      ))
    }
  }

  render() {
    let categoriesCompleted
    if (this.props.userSelections) {
      categoriesCompleted = Object.keys(this.props.userSelections).length
    }

    let classes = [styles.completedButton]
    let completedText = 'YOUR BALLOT IS INCOMPLETE'

    if (categoriesCompleted >= 24) {
      classes.push(styles.Complete)
      completedText = 'YOUR BALLOT IS COMPLETE'
    }



    return (
      <div className={styles.Ballot}>
        {this.renderCategories()}
        <BallotFooter userSelections={this.props.userSelections}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    nomineesList: state.ballot.nomineesList,
    userSelections: state.ballot.userSelections,
    user: state.authentication.user,
    winners: state.admin.winners
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMakeSelection: (category, selection, userSelections)=> dispatch(ballotActions.makeSelection(category, selection, userSelections)),
    onFetchUserPicks: ()=> dispatch(ballotActions.fetchUserPicks()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ballot)
