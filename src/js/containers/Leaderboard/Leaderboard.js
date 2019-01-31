import React, { Component } from 'react'
import {connect} from 'react-redux'

import User from '../../components/User/User'

import * as actions from '../../_store/_actions';
import { usersActions } from '../../_store/_actions'
import { winners, points } from '../../../data/winners'


class Leaderboard extends Component {

  componentDidMount() {
    this._onFetchAllUsers()
  }

  componentDidUpdate(prevProps) {
    // console.log('is this even updating');
    // console.log(prevProps, this.props);
  }

  _onFetchAllUsers = () => {
    this.props.onFetchAllUsers()
  }

  _onSendWinners = () => {
    this.props.onSendWinners()
  }

  _onFetchWinners = () => {
    this.props.onFetchWinners()
  }

  scoreCalculator = (scoreArray) => {
    let reducer = (total, num) => total + num
    return scoreArray.reduce(reducer, 0)
  }

  render() {

    this.props.usersList.forEach((user)=> {
      user.scores = []
      user.correct = 0
      for (var key in user.picks) {
        if (user.picks[key] === winners[key]) {
          user.scores.push(points[key])
          user.correct += 1
        }
      }
    })

    const sortedUsers = this.props.usersList.sort((a, b) => {
      return (this.scoreCalculator(b.scores) - this.scoreCalculator(a.scores))
    })

    const allUsers = sortedUsers.map((user, index) => {

      return <User
        key={index}
        user={user}
        score={this.scoreCalculator(user.scores)}/>
    })

    return (
      <table>
        <tbody>
          {allUsers}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = state => {
  return {
    usersList: state.users.usersList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchAllUsers: ()=> dispatch(usersActions.fetchAllUsers()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
