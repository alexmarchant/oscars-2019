import React, { Component } from 'react';

import Layout from './js/components/Layout/Layout';
import Header from './js/components/Header/Header';
import Ballot from './js/containers/Ballot/Ballot';
import Leaderboard from './js/containers/Leaderboard/Leaderboard';
import Auth from './js/containers/Auth/Auth';
import Admin from './js/containers/Admin/Admin';
import { PrivateRoute } from './js/components/PrivateRoute/PrivateRoute'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {adminActions} from './js/_store/_actions';


class App extends Component {

  componentDidMount() {
    const host = 'api.oscars.alexmarchant.com'
    const conn = new WebSocket("ws://" + host + "/ws/winners");

    conn.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.messageHandler(message.winners);
    };
  }

  messageHandler = (winners) => {
    this.props.onUpdateWinners(winners)
  }

  render() {

    return (
      <div>
        <Layout>
          <Header />
          <Auth />
          <Route path="/leaderboard" component={Leaderboard}/>
          <PrivateRoute exact path="/admin" admin={this.props.admin} component={Admin} />
          <Route path="/" exact component={Ballot} />
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    admin: state.authentication.user.admin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateWinners: (winners)=> dispatch(adminActions.loadWinners(winners)),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
