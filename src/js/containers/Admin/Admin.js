import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Category from '../../components/Category/Category';
import nomineesData from '../../../data/nominees';
import { connect } from 'react-redux';
import {adminActions} from '../../_store/_actions';

class Admin extends Component {
  // componentDidMount() {
  //   const host = 'api.oscars.alexmarchant.com'
  //   const conn = new WebSocket("ws://" + host + "/ws/winners");
  //   const that = this;
  //
  //   conn.onmessage = (event) => {
  //     const message = JSON.parse(event.data);
  //     that.messageHandler(message.winners);
  //   };
  // }
  //
  // messageHandler = (winners) => {
  //   this.props.onUpdateWinners(winners)
  // }

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
        />
      ))
    }
  }

  render() {
    return (
      <div>
      <div id="winners"></div>
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
    // onUpdateWinners: (winners)=> dispatch(adminActions.updateWinners(winners)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
