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

//
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle, faEnvelope, faUnlockAlt} from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle)
library.add(faTimesCircle)
library.add(faEnvelope)
library.add(faUnlockAlt)
///


class App extends Component {

  componentDidMount() {
    const host = 'api.oscars.alexmarchant.com'
    const conn = new WebSocket("wss://" + host + "/ws/winners");

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
      <Layout>
        <Header />
        <Auth />
        <Route path="/leaderboard" component={Leaderboard}/>
        <PrivateRoute exact path="/admin" user={this.props.user} component={Admin} />
        <Route path="/" exact component={Ballot} />
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.authentication.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateWinners: (winners)=> dispatch(adminActions.loadWinners(winners)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
