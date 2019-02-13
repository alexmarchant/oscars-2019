import React from 'react'
import { Link } from 'react-router-dom'
import Aux from '../hoc/Aux'
import styles from './Header.css'

const header = () => {
  return (
    <Aux>
      <ul>
        <li><Link to="/">Ballot</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/admin">Past Winners</Link></li>
      </ul>
      <div className={styles.Header}>
        <h1>Oscar Ballot 2019</h1>
      </div>
    </Aux>
  )
}

export default header;
