import React, { Component } from 'react'
import {connect} from 'react-redux'

import User from '../../components/User/User'

import * as actions from '../../_store/_actions';
import { usersActions } from '../../_store/_actions'
import { points } from '../../../data/winners'

import styles from './Leaderboard.css'


class Leaderboard extends Component {

  componentDidMount() {
    this._onFetchAllUsers()
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

    const winners = this.props.winners

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
        rank={index + 1}
        user={user}
        score={this.scoreCalculator(user.scores)}/>
    })

    return (
      <div>
        <table className={styles.Leaderboard}>
        <thead>
          <tr>
           <th>RANK</th>
           <th>EMAIL</th>
           <th>CORRECT</th>
           <th>SCORE</th>
           <th>PAID</th>
         </tr>

        </thead>
          <tbody>
            {allUsers}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    usersList: state.users.usersList,
    winners: state.admin.winners
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchAllUsers: ()=> dispatch(usersActions.fetchAllUsers()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
