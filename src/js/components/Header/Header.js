import React from 'react'
import { Link } from 'react-router-dom'
import Aux from '../hoc/Aux'
import Slider from '../../containers/Slider/Slider'
import styles from './Header.css'

const header = (props) => {

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <ul className={styles.headerUL}>
          <li><Link to="/">BALLOT</Link></li>
          <li><Link to="/leaderboard">LEADERBOARD</Link></li>
          { props.user && props.user.admin ? <li><Link to="/admin">ADMIN</Link></li> : null }
        </ul>
        <h1 className={styles.appTitle}>OSCAR BALLOT 2019</h1>
      </div>
      <Slider />
      <div className={styles.dueDate}>ALL ENTRIES ARE DUE SUN, FEB 24 • 7:00 PM EST</div>
    </div>
  )
}

export default header;
