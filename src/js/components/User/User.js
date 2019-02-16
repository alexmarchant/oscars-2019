import React from 'react';
import styles from './User.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const user = (props) => {
  function ballotComplete(picks) {

    return Object.keys(picks).length >= 24 ? true : false
  }

  return (
    <tr>
      <td className={styles.rank}>{props.rank}</td>
      <td className={styles.userEmailColumn}>
       { props.user.email}
       <span>
       { props.user && ballotComplete(props.user.picks) ?
         <FontAwesomeIcon className={styles.userIcon} icon="check-circle" /> :
         null
       }
       { props.user.paid ?
         <FontAwesomeIcon className={styles.userIcon} icon="dollar-sign" color="#c4b22e" /> :
         null
       }
       </span>
      </td>
      <td className={styles.desktopOnly}>{props.user.correct}/24</td>
      <td>{props.score}</td>
    </tr>
  )
}

export default user;
