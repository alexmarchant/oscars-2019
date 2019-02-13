import React from 'react'
import { Link } from 'react-router-dom'
import Aux from '../hoc/Aux'
import styles from './Header.css'

const header = (props) => {
  console.log(props)

  return (
    <Aux>
      <ul>
        <li><Link to="/">Ballot</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        { props.user && props.user.admin ? <li><Link to="/admin">Admin</Link></li> : null }
      </ul>
      <div className={styles.Header}>
        <h1>Oscar Ballot 2019</h1>
      </div>
    </Aux>
  )
}

export default header;
