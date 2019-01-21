import React, { Component } from 'react';
import styles from './Root.css'

class Root extends Component {
  render() {
    return (<div>
      <img src="/images/weed-is-tight.gif" alt=""/>
      <h1 className={styles.heading}>Hello, fuckin world</h1>;
    </div>)
     
  }
}

export default Root