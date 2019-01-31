import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Category from '../../components/Category/Category';
import nomineesData from '../../../data/nominees';
import { connect } from 'react-redux';
import {adminActions} from '../../_store/_actions';
import { webSocket} from '../../_helpers/webSocket'


class Admin extends Component {

  componentDidMount(){
    if (this.props.token) {
      console.log('token');
    }

    // console.log(webSocket);

    // webSocket.setupListeners(webSocket.conn)
  }

  _onSelectWinner = (category, winner, event) => {
    console.log(event.target);
    console.log(`${winner} is the winner for ${category}`);
    this.props.onSelectWinner(category, winner)
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
    nomineesList: state.ballot.nomineesList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectWinner: (category, winner)=> dispatch(adminActions.selectWinner(category, winner)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
