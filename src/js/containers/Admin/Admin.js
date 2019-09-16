import React, { Component } from 'react';
import styles from './Admin.css'
import { Link } from 'react-router-dom'

import Category from '../../components/Category/Category';
import nomineesData from '../../../data/nominees';
import { connect } from 'react-redux';
import {adminActions} from '../../_store/_actions';

class Admin extends Component {

  _onSelectWinner = (category, winner) => {
  this.props.onSelectWinner(category, winner, this.props.winners)
  }

  renderCategories = () => {

    if (this.props.nomineesList) {
      return this.props.nomineesList.map((nom, index) => (
        <Category
          key={index}
          title={nom.title}
          nominees={nom.nominees}
          clicked={this._onSelectWinner}
          admin={true}
          winners={this.props.winners}
        />
      ))
    }
  }

  render() {
    return (
      <div className={styles.admin}>
          {this.renderCategories()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.authentication.token,
    nomineesList: state.ballot.nomineesList,
    winners: state.admin.winners
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectWinner: (category, winner, winners)=> dispatch(adminActions.selectWinner(category, winner, winners)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
