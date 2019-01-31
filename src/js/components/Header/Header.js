import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.css'

const header = () => {
  return(
    <div>
      <h1>Oscar Ballot 2019</h1>
      <ul>
        <li><Link to="/">Ballot</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/Admin">Admin</Link></li>
      </ul>
    </div>
  )
}

export default header;
