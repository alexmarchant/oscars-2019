import React, { Component } from 'react';

import Layout from './js/components/Layout/Layout';
import Header from './js/components/Header/Header';
import Ballot from './js/containers/Ballot/Ballot';
import Leaderboard from './js/containers/Leaderboard/Leaderboard';
import Auth from './js/containers/Auth/Auth';
import Admin from './js/containers/Admin/Admin';
import { Route } from 'react-router-dom'


class App extends Component {

  render() {

    return (
      <div>
        <Layout>
          <Header />
          <Auth />
          <Route path="/leaderboard" component={Leaderboard}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/" exact component={Ballot} />
        </Layout>
      </div>
    )
  }
}

export default App
